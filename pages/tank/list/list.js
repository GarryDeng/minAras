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
    vSid: [0],
    tSid: '专业',
    tCid: '全部',
    hCid: '',
    vCid: [0],
    keyword:'',
    isKeyword: "",
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
    // console.log(this.data.vCid, this.data.vSid)
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
      isKeyword: "",
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
      isKeyword: "",
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
    that.setData({
      isKeyword: that.data.keyword,
      pageNumber: 0,
    })
    that.getPageList(config.apiList.thinkTankExpertList, (data) => {//专家列表
      that.setData({
        listData: data.data
      })
    });
  },
  getPageList: function (url,callback) {
    var that = this;
    that.setData({
      pageNumber: Number(that.data.pageNumber) + 1
    })
    app.getApiData(url, { page: that.data.pageNumber, cid: that.data.classId, sid: that.data.sid, keyword: that.data.isKeyword}, (data) => {
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
      sIdShow: false,
      classId: that.data.hCid,
      tCid: that.data.tCid,
      vCid: that.data.vCid,
      pageNumber: 0,
      isKeyword: "",
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
      classShow: false,
      sid: that.data.hSid,
      tSid: that.data.tSid,
      vSid: that.data.vSid,
      pageNumber: 0,
      isKeyword: "",
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
    this.data.tCid = classListId == 0 ? "全部" : this.data.classList[classListId - 1].name;
    this.data.vCid = classListId
    this.setData({
      hCid: a,
      vCid : classListId
    })
    console.log(classListId, this.data.vCid)
  },
  bindChangeSlid: function (e) {
    var classListId = e.detail.value;
    var a = classListId == 0 ? "" : this.data.sidList[classListId - 1].id;
    this.data.tSid = classListId == 0 ? "专业" : this.data.sidList[classListId - 1].name;
    this.data.vSid = classListId
    this.setData({
      hSid: a,
      vSid: classListId,
    })
    console.log(classListId, this.data.vSid)
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
      title: '智库·专家列表'
    }
  }
})