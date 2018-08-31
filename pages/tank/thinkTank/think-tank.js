import { config } from "../../../utils/config";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //头部轮播
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentLength: 0,
    circular: true,
    //智库简介
    description: [],
    //专家团队轮播
    teamImgUrls: [],
    teamPlay: false,
    teamInterval: 5000,
    teamDuration: 1000,
    teamCurrentLength: 0,
    teamCircular: true,
    //专家团队轮播
    viewpointImgUrls: [],
    viewpointPlay: true,
    viewpointInterval: 5000,
    viewpointDuration: 1000,
    viewpointCurrentLength: 0,
    viewpointCircular: true,
  },
  swiperChange: function (e) {
    this.setData({
      currentLength: e.detail.current
    })
  },
  //专家团队轮播
  teamChange: function (e) {
    this.setData({
      teamCurrentLength: e.detail.current
    })
  },
  //观点轮播
  viewpointChange: function (e) {
    this.setData({
      viewpointCurrentLength: e.detail.current
    })
  },
  getDataWay: function (url, callback) {
    app.getApiData(url, {}, function (data) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getDataWay(config.apiList.thinkTankBanner,function(data){//轮播图
      that.setData({
        imgUrls: data.data
      })
    });
    that.getDataWay(config.apiList.thinkTankDescription, function (data) {//智库简介
      that.setData({
        description: data.data
      })
    });
    that.getDataWay(config.apiList.thinkTankExperts, function (data) {//专家团队
      that.setData({
        teamImgUrls: data.data
      })
    });
    that.getDataWay(config.apiList.thinkTankViewpoint, function (data) {//专家观点
      that.setData({
        viewpointImgUrls: data.data
      })
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