import { config } from "../../../utils/config";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],//首页轮播图
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentLength:0,
    circular: true,
    // 专家轮播图参数
    listImgUrls: [],
    dotsList: [],
    autoplayList: false,
    currentList: 0,
    // 产品轮播图参数
    productUrls: [],
    autoplayProduct: false,
    currentProduct: 0,
    //筑享慧万家
    indexHomeBig: [],
    indexHomeList:[],
  },
  gotoZuDetails: function (e) {
    wx.navigateTo({
      url: `../../built/details/details?id=${e.currentTarget.dataset.ids}`,
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentLength: e.detail.current
    })
  },
  swiperChangeList: function (e) {
    this.setData({
      currentList: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getBanner(config.apiList.indexBanner, function (data) {//banner轮播
      that.setData({
        imgUrls: data.data
      })
    });
    that.getBanner(config.apiList.indexExpert,function(data){//专家轮播
      that.setData({
        listImgUrls: data.data,
        dotsList: data.data.slice(0, data.data.length-2)
      })
    });
    that.getBanner(config.apiList.indexProgramme, function (data) {//产品轮播
      that.setData({
        productUrls: data.data
      })
    });
    that.getBanner(config.apiList.indexHome, function (data) {//筑享汇
      var indexHomeBig = data.data[0], indexHomeList=[],beTime;
      for (var i = 1; i < data.data.length; i++) {//排序去最大listorder值
        // console.log(indexHomeBig, indexHomeList)
        if (indexHomeBig.listorder < data.data[i].listorder){
          beTime = indexHomeBig,
          indexHomeBig = data.data[i];
          indexHomeList.push(beTime);
        }else{
          indexHomeList.push(data.data[i]);
        }
      }
      // console.log(indexHomeBig, indexHomeList)
      console.log(indexHomeList)
      that.setData({
        indexHomeBig: indexHomeBig,
        indexHomeList: indexHomeList
      })
    });
  },
  getBanner: function (url,callback) {
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