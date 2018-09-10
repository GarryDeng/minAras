import { config } from "../../../utils/config";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textUrls: [{id: "6", name: "全部"}],
    displayMultipleItems: 4.5,
    // autoplay: false,
    // interval: 5000,
    // duration: 1000,
    // currentLength: 0,
    circular: true,
    page: 0, //页数
    catId: 6,
    builtContent: [],
    // // 当前页面
    // navItem: {
    //   url: 'index',
    // },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    that.getBanner(config.apiList.builtListNav,function(data) {
      var dataNav = that.data.textUrls;
      data.data.forEach(res=>{
        dataNav.push(res);
      });
      that.setData({
        textUrls: dataNav
      });
    });
    that.getContent(config.apiList.builtList, function(data) {
      wx.hideLoading()
      that.setData({
        builtContent: data.data
      })
    })
  },
  getBanner: function (url, callback) {
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
  getContent: function (url, callback) {
    const that = this;
    var pageNumber = that.data.page+1;
    console.log(pageNumber)
    that.setData({
      page: pageNumber
    })
    app.getApiData(url, { catid: that.data.catId , page: that.data.page}, function (data) {
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
  getNavId: function (event) {
    const that = this;
    this.setData({
      catId: event.target.dataset.ids,
      page: 0,
    });
    that.getContent(config.apiList.builtList, function (data) {
      that.setData({
        builtContent: data.data
      })
    });
  },
  goToContent: function (event) {
    wx.navigateTo({
      url: '../details/details?id=' + event.target.dataset.ids
    })
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
    const that = this;
    var conrentList = that.data.builtContent;
    that.getContent(config.apiList.builtList, function (data) {
      data.data.forEach(res=>{
        conrentList.push(res);
      })
      that.setData({
        builtContent: conrentList
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})