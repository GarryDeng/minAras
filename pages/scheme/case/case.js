import { config } from "../../../utils/config";
const app =getApp();
const WxParse = require("../../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentDatails: [],
    caseId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      caseId: options.id
    });
    var replyArr = [];
    that.getContentDetails(config.apiList.schemeBannerId,{id:options.id},function(data){
      data.data.funtions.forEach((res)=>{
        
        replyArr.push(res.content.replace(/[\\]/g,''));
        
      });
      // WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
      for (let i = 0; i < replyArr.length; i++) {
        WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
        if (i === replyArr.length - 1) {
          WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
        }
      }
      // console.log(JSON.parse(that.data.nodes))
      that.setData({
        contentDatails: data.data
      })
    })
  },
  getContentDetails: function (url, getData, callback) {
    app.getApiData(url, getData, function (data) {
      if (data.ret == 100) {
        callback(data);
        console.log(data.data)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})