import { config } from '../../../utils/config';
const app = getApp();
const WxParse = require("../../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: [],
    authCode: '',
    id: '',
    typeId: '',
    height: 700,
    getContentUrl: config.apiList.builtDetails
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var options = {id: 13};
    const that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          height: res.windowHeight / res.windowWidth * 750
        })
      }
    })
    if(options.type){
      wx.setNavigationBarTitle({
        title: 'ARAS-专家观点详情',
      })
      that.setData({
        typeId: options.type,
        getContentUrl: config.apiList.thinkTankViewpointInfo
      })
    }
    wx.getStorage({
      key: 'userMessage',
      success: (res) => {
        that.setData({
          authCode: res.data[1]
        })
      },
      complete: () =>{
        if (!options.type)
        that.getContentDetails( that.data.getContentUrl, { id: options.id, auth_code: that.data.authCode }, function (data) {
          const contentDetails = data.data.content;
          WxParse.wxParse("builtDetails", 'html', contentDetails, that)
          that.setData({
            pageData: data.data,
            id: options.id
          })
        })
        else
        app.getApiData(that.data.getContentUrl, { id: options.id }, function (data) {
          const contentDetails = data.data.content;
          WxParse.wxParse("builtDetails", 'html', contentDetails, that)
          that.setData({
            pageData: data.data,
            id: options.id
          })
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getContentDetails: function (url, getData, callback) {
    app.postApiData(url, getData, function (data) {
      if (data.ret == 100) {
        console.log(1)
        callback(data);
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  pverPage(){
    const that =this;
    if (that.data.pageData.pre_id == 0) return wx.showToast({
      title: '没有上一篇啦~',
      icon: 'none'
    })
    wx.redirectTo({
      url: `../details/details?id=${that.data.pageData.pre_id}`,
    })
  },
  nextPage() {
    const that = this;
    if (that.data.pageData.next_id == 0) return wx.showToast({
      title: '没有下一篇啦~',
      icon: 'none'
    })
    wx.redirectTo({
      url: `../details/details?id=${that.data.pageData.next_id}`,
    })
  },
  clickLike: function () {
    const that = this;
    if(!that.data.authCode)
    return wx.showModal({
      title: '温馨提示',
      content: '是否前往登陆',
      success: (res) => {
        if(res.confirm){
          wx.reLaunch({
            url: '../../me/bindPhone/bind-phone',
            fail: (err) => {
              console.log(err)
            }
          })
        }
      }
    });
    var isLike = that.data.pageData.is_like == 0 ? 1 : 0;
    that.getContentDetails(config.apiList.isLike, { id: that.data.id, auth_code: that.data.authCode, type: isLike }, function (data) {
      console.log(data)
      if (data.ret == 100) {
        that.data.pageData.is_like = isLike;     
        that.setData({
          pageData: that.data.pageData
        })
        var message = isLike == 1 ? '点赞成功' : '已取消';
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        });
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.pageData.title,
    }
  }
})