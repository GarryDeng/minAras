import { config } from "../../../utils/config";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textHint: '* 选填 \n 项目概况、详细需求、问题点、专家要求',
    navNumber: 1,
    userName: '',
    phone: '',
    authCode: '',
    content: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userMessage',
      success: function (res) {
        that.setData({
          authCode: res.data[1]
        })
      }
    });
  },
  checkText: function (e) {
    if(e.detail.value == "") {
      this.setData({
        textHint: '* 选填 \n 项目概况、详细需求、问题点、专家要求'
      })
    }else{
      this.setData({
        textHint: '',
        content: e.detail.value
      })
    }
  },
  clickNav: function (e) {
    this.setData({
      navNumber: e.target.dataset.ids
    });
  },
  isPhone: function (tele) {
    var mob = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    return mob.test(tele);
  },
  contactMe: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  sendPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  feedbackVal: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  postFeedBack: function () {
    const that = this;
    console.log(that.data.phone)
    if(that.data.phone==""||!that.isPhone(that.data.phone)){
      return wx.showToast({
        title: "手机格式错误",
        icon: 'none',
        duration: 2000
      });
    }
    if(that.data.userName==''){
      return wx.showToast({
        title: "用户名不能为空",
        icon: 'none',
        duration: 2000
      });
    }
    if (that.data.content == '') {
      return wx.showToast({
        title: "内容不能为空",
        icon: 'none',
        duration: 2000
      });
    }
    app.postApiData(config.apiList.postFeedback, { auth_code: that.data.authCode, user_name: that.data.userName, phone: that.data.phone, content: that.data.content, type: that.data.navNumber}, function (data) {
      console.log(data)
      if (data.ret == 100) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000
        });
        setTimeout(()=>{
          wx.navigateBack({
          })
        },1500);
        wx.redirectTo({
          url: '../bindPhone/bind-phone'
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
})