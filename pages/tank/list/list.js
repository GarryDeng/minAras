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
    hSid: '',
    hCid: '',
    keyword:'',
    isKyeword: false,
    // fsrtName: [],//一级名称
    // listName: [],//二级名称
  },
  getKyeword: function (e){
    this.setData({
      keyword: e.detail.value
    })
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
      isKyeword: false,
    });
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  gotoDetails: function (e) {
    wx.navigateTo({
      url: `../details/details?id=${e.currentTarget.dataset.ids}`,
    })
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
      isKyeword: false,
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
  getSearchValue: function () {
    const that = this;
    if(that.data.keyword == "") {
      return wx.showToast({
        title: "请输入关键字",
        icon: 'none',
        duration: 2000
      });
    }
    app.getApiData(config.apiList.thinkTankExpertList, { kyeword:that.data.keyword}, function (data) {
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
  getPageList: function (url,callback) {
    var that = this;
    that.setData({
      pageNumber: Number(that.data.pageNumber) + 1
    })
    app.getApiData(url, { page: that.data.pageNumber, cid: that.data.classId, sid: that.data.sid}, function (data) {
      if (data.ret == 100) {
        callback(data);
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
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  closeClass: function (e) {
    this.setData({
      classShow: false,
    })
  },
  affirmClass: function (e) {
    const that = this;
    that.setData({
      classShow: false,
      classId: that.data.hCid,
      pageNumber: 0
    });
    that.getPageList(config.apiList.thinkTankExpertList, function (data) {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  closeClassShow: function (e) {
    this.setData({
      sIdShow: false,
    })
  },
  affirmClassHide: function (e) {
    const that = this;
    that.setData({
      sIdShow: false,
      sid: that.data.hSid,
      pageNumber: 0
    });
    that.getPageList(config.apiList.thinkTankExpertList, (data) => {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  bindChangeClass: function (e) {
    var classListId = e.detail.value;
    var a = classListId == 0 ? "" : this.data.classList[classListId - 1].id;
    this.setData({
      hCid: a
    })
    console.log(a)
  },
  bindChangeSlid: function (e) {
    var classListId = e.detail.value;
    var a = classListId == 0 ? "" : this.data.sidList[classListId - 1].id;
    this.setData({
      hSid: a
    })
    console.log(a)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.isKyeword) {
      return false;
    }
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