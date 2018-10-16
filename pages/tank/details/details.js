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
    // var options = { id: 3};
    that.getPageDetails(options.id);
  },
  swiperChange: function (e) {
    this.setData({
      currentLength: e.detail.current
    })
  },
  getPageDetails: function (opid) {
    const that = this;
    app.getApiData(config.apiList.thinkTankExpertInfo, { id:opid }, function (data) {
      if (data.ret == 100) {
        // console.log(data.data.top_img)
        // var img = new Image();
        // img.src = data.data.top_img;
        // img.onLoad = () => {
        //   console.log(img.width)
        // }
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
  gotoBuiltDetails: function (e) {
    const that = this;
    wx.navigateTo({
      url: `../../built/details/details?id=${e.currentTarget.dataset.ids}&type=1`,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '智库·专家详情'
    }
  }
})