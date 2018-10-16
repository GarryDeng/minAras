import { config } from '../../../utils/config';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    height: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          height: res.windowHeight/res.windowWidth*750
        })
      }
    })
    app.getApiData(config.apiList.schemewindowId, {id:options.id}, function (data) {
      if (data.ret == 100) {
        that.setData({
          listData: data.data          
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
  gotoDetails: function (e) {
    const that = this;
    wx.navigateTo({
      url: `../caseDetails/case-details?id=${e.currentTarget.dataset.ids}`,
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
    wx.stopPullDownRefresh();
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
    return {
      title: '智慧配套'
    }
  }
})