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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // var options = {id: 3};
    const that = this;
    wx.getStorage({
      key: 'userMessage',
      success: (res) => {
        that.setData({
          authCode: res.data[1]
        })
      },
      complete: () =>{
        that.getContentDetails(config.apiList.builtDetails, { id: options.id, auth_code: that.data.authCode }, function (data) {
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
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
    that.getContentDetails(config.apiList.isLike, { id: that.data.id, auth_code: that.data.authCode }, function (data) {
      console.log(data)
      if (data.ret == 100) {
        that.data.pageData.is_like = 1;     
        that.setData({
          pageData: that.data.pageData
        })
        wx.showToast({
          title: "点赞成功",
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
    
  }
})