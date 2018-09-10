import { config } from "../../../utils/config";
const app = getApp();
const WxParse = require("../../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseData: [],
    arrTitle: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // var options = {id:11}
    var transArr = [];
    app.getApiData(config.apiList.schemewindowDetailsId, { id: options.id }, function (data) {
      if (data.ret == 100) {
        data.data.funtions.forEach((res) => {
          that.data.arrTitle.push({ name: res.name, id: res.id })
          console.log(res)
          transArr.push(res.content.replace(/[\\]/g, ''));
        });
        for (let i = 0; i < transArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', transArr[i], that);
          if (i === transArr.length - 1) {
            WxParse.wxParseTemArray("transArrArray", 'reply', transArr.length, that)
          }
        }
        that.setData({
          contentDatails: data.data,
          arrTitle: that.data.arrTitle
        })
        console.log(data)
        that.setData({
          caseData: data.data
        })
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