//app.js
import { config } from "utils/config";
App({
  getApiData: function (url, data, callback) {
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: config.baseHref + url,
      data: data,
      method: 'GET',
      success: function (res) {
        callback(res.data);
      }
    });
  },
  postApiData: function (url, data, callback) {
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url: config.baseHref + url,
      data: data,
      method: 'POST',
      success: function (res) {
        callback(res.data);
      }
    });
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },
  globalData: {
    userInfo: null
  }
})