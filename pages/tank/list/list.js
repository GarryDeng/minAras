import { config } from "../../../utils/config";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    pageNumber: 0,//页数
    classList: [],//分类
    classId: '',//分类ID
    sid: '',//专业id
    classShow: false,
    sIdShow: false,
    sidList: [],//专业
    // fsrtName: [],//一级名称
    // listName: [],//二级名称
  },
  clickClass: function() {
    this.setData({
      classShow: true
    })
  },
  clickSId: function () {
    this.setData({
      sIdShow: true
    })
  },
  closeSId: function () {
    this.setData({
      sIdShow: false
    })
  },
  closeClass: function () {
    this.setData({
      classShow: false
    })
  },
  affirmClass: function () {
    var that = this;
    if(this.data.classId == '') {
      this.setData({
        classId: that.data.classList[0].id
      })
    }
    this.setData({
      classShow: false,
      pageNumber: 0,
    });
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  affirmSId: function () {
    var that = this;
    if (this.data.sid == '') {
      this.setData({
        sid: that.data.sidList[0].id
      })
    }
    this.setData({
      sIdShow: false,
      pageNumber: 0,
    });
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      that.setData({
        listData: data.data
      })
    });
    that.getDataWay(config.apiList.thinkTankCategory, function (data) {//分类
      that.setData({
        classList: data.data,
      });
    })
    that.getDataWay(config.apiList.thinkTankSkilled, function (data) {//专业
      that.setData({
        sidList: data.data,
      });
    })
  },
  getPageList: function (url,callback) {
    var that = this;
    that.setData({
      pageNumber: Number(that.data.pageNumber) + 1
    })
    app.getApiData(url, { page: that.data.pageNumber, cid: that.data.classId, sid: that.data.sid}, function (data) {
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
  bindChangeClass: function (e) {
    var classListId = e.detail.value;
    this.setData({
      classId: this.data.classList[classListId].id
    });
    console.log(this.data.classList[classListId].id)
    // console.log(classListId)
  },
  bindChangeSlid: function (e) {
    var classListId = e.detail.value;
    this.setData({
      sid: this.data.sidList[classListId].id
    });
    console.log(this.data.sid)
    // console.log(classListId)
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      var listData = that.data.listData;
      console.log(listData)
      data.data.forEach(res=>{
        listData.push(res);
      });
      that.setData({
        listData: listData
      })
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})