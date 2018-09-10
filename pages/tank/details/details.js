import { config } from "../../../utils/config";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: [],
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentLength: 0,
    circular: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.getPageDetails(options.id);
  },
  swiperChange: function (e) {
    this.setData({
      currentLength: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  getPageDetails: function (opid) {
    const that = this;
    app.getApiData(config.apiList.thinkTankExpertInfo, { id:opid }, function (data) {
      if (data.ret == 100) {
        console.log(data)
        that.setData({
          pageData: data.data
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