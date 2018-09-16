import { config } from "../../../utils/config";
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBoolean: true,
    userName: 'null',
    userImg: '../../../images/default_user_head.png',
    phone: '',
    phoneHint: '',
    timeBoolean: '',
    phoneVal: '',
    codeVal: '',
    authCode: '',
    codeHintMessage:'获取验证码',
    activeClass: true,
    oldPhone: '',
    postHistoryList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      phoneHint: !that.data.phone ? "请输入绑定手机号码" : "请输入绑定新手机号码"
    });
    that.stateInit();
  },
  creatUserMessage: function () {
    const that = this;
    wx.getStorage({
      key: 'userMessage',
      success: function (res) {
        wx.showLoading({
          title: '登录中',
        });
        that.setData({
          timeBoolean: res.data[0],
          authCode: res.data[1],
          userName: res.data[2],
          userImg: res.data[3] ? res.data[3] : '../../../images/default_user_head.png',
          phone: res.data[4],
        })
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        if (!that.data.phone) {
          return that.setData({
            activeClass: false,
          })
        }
        that.getHisotyList();
      }
    });
  },
  stateInit: function () {
    const that = this;
    const getTimeOutIn = new Date().getTime();
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'] && that.data.timeBoolean <= getTimeOutIn) {
          wx.showLoading({
            title: '登录中',
          });
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Promise.all([that.getUserInfoMessage(), that.getLoginMessage()]).then((data) => {
            that.postLogin(config.apiList.loginUrl, { code: data[1], nickname: data[0].nickName }, (res) => {
              wx.hideLoading();
              //储存用户登录信息
              that.getDateUser(res.data.auth_code, res.data.expiry, res.data.userdata.nickname, res.data.userdata.headimgurl, res.data.userdata.phone);
              that.setData({
                userName: res.data.userdata.nickname,
                authCode: res.data.auth_code,
                userImg: (!!!res.data.userdata.headimgurl) ? res.data.userdata.headimgurl : '../../../images/default_user_head.png',
                phone: res.data.userdata.phone
              });
              that.getHisotyList();
            })
          });
        } else if (that.data.timeBoolean) {
          wx.hideLoading();
          that.pageStateBoolean();
          that.creatUserMessage();
        }
      }
    });
  },
  bindGetUserInfo: function(event) {
    const that = this;
    if(event.detail.userInfo){
      //用户点了允许按钮
      wx.showLoading({
        title: '登录中',
      });
      var nickName = event.detail.userInfo.nickName,
          headimgUrl = event.detail.userInfo.avatarUrl;
      that.getLoginMessage().then((data) => {
        that.postLogin(config.apiList.loginUrl, { code: data, nickname: nickName, headimgurl: headimgUrl},(res)=>{
          wx.hideLoading();
          //储存用户登录信息
          that.getDateUser(res.data.auth_code, res.data.expiry, res.data.userdata.nickname, res.data.userdata.headimgurl, res.data.userdata.phone);
          that.setData({
            userName: res.data.userdata.nickname,
            authCode: res.data.auth_code,
            userImg: res.data.userdata.headimgurl ? res.data.userdata.headimgurl : '../../../images/default_user_head.png',
            phone: res.data.userdata.phone
          });
          that.getHisotyList();
        })
      });
    }else{
      //用户点了拒绝按钮
    }
  },
  getDateUser: function (userMessage, time, userName, userHeadImg,oldPhone) {
    var timeNew = new Date().getTime();
    wx.setStorage({
      key: 'userMessage',
      data: [
        Number(timeNew) + time*1000,
        userMessage,
        userName,
        userHeadImg,
        oldPhone,
      ]
    });
  },
  pageStateBoolean: function () {
    const that = this;
    wx.setNavigationBarTitle({
      title: 'ARAS-绑定手机'
    });
    that.setData({
      loginBoolean: false
    });
  },
  getLoginMessage: function () {
    const that = this;
    return new Promise((resolve,reject) => {
      wx.login({
        success: function (res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res.errMsg)
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    });
  },
  getUserInfoMessage: function () {
    const that = this;
    return new Promise((resolve,reject) => {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      wx.getUserInfo({
        success: function (res) {
          resolve(res.userInfo);
        }
      });
    })
  },
  postLogin: function (url, getData, callback) {
    const that = this;
    app.postApiData(url, getData, function (data) {
      if (data.ret == 100) {
        callback(data);
        that.pageStateBoolean();
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
  getPhoneVal: function (e) {
    console.log(e.detail)
    this.setData({
      phoneVal: e.detail.value
    });
  },
  getCodeVal: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  },
  //获取验证码
  getCodeNumber: function () {
    const that = this;
    var phoneNumber = that.data.phoneVal;
    if(that.data.phone && that.data.phone != that.data.oldPhone) {
      return wx.showToast({
        title: '原绑定手机不一致',
        icon: 'none',
        duration: 2000
      });
    }
    if(!that.isPhone(phoneNumber)){
      return wx.showToast({
        title: '绑定手机格式错误',
        icon: 'none',
        duration: 2000
      });
    }
    var typeState = that.data.phone ? 4 : 3;
    wx.showLoading({
      title: '获取中',
    });
    that.postPhoneNumber(config.apiList.getPhoneCode, { auth_code: that.data.authCode, phone: that.data.phoneVal, type: typeState},function (data){
      wx.showToast({
        title: '发送成功',
        icon: 'none',
        duration: 2000
      });
      let i = 60;
      var getTi = setInterval(()=>{
        that.setData({
          codeHintMessage: --i + '秒重新获取'
        })
        if (i == 0) {
          that.setData({
            codeHintMessage: '重新获取'
          })
          clearInterval(getTi);
        }
      },1000);
    })
  },
  isPhone: function (tele) {
    var mob = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    return mob.test(tele);
  },
  postPhoneNumber: function (url, getData, callback) {
    const that = this;
    app.postApiData(url, getData, function (data) {
      wx.hideLoading();
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
  bindPhoneMessage: function () {
    const that = this;
    var phoneNumber = that.data.phoneVal,
        phoneCode = that.data.codeVal;
    if (that.data.phone && that.data.phone != that.data.oldPhone) {
      return wx.showToast({
        title: '原绑定手机不一致',
        icon: 'none',
        duration: 2000
      });
    }
    if (!that.isPhone(phoneNumber)) {
      return wx.showToast({
        title: '手机格式错误',
        icon: 'none',
        duration: 2000
      });
    };
    if (!phoneCode){
      return wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      });
    }
    wx.showLoading({
      title: '发送中',
    });
    var postUrl = that.data.phone ? config.apiList.editBindPhone : config.apiList.bindPhoneMessage;
    var dataJson = that.data.phone ? { auth_code: that.data.authCode, phone: phoneNumber, old_phone: that.data.phone, code: phoneCode } : { auth_code: that.data.authCode, phone: phoneNumber, code: phoneCode };
    that.postPhoneNumber(postUrl, dataJson, function (data) {
      that.setData({
        phone: that.data.phoneVal
      });
      //储存用户登录信息
      that.getDateUser(res.data.auth_code, res.data.expiry, res.data.userdata.nickname, res.data.userdata.headimgurl, res.data.userdata.phone);
      that.setData({
        activeClass: true,
      });
      that.getHisotyList();
      wx.showToast({
        title: '绑定成功',
        icon: 'none',
        duration: 2000
      });
    });
  },
  getOldPhone: function (e) {
    this.setData({
      oldPhone: e.detail.value
    });
  },
  trueClick: function () {
    const that = this;
    that.setData({
      activeClass: true
    });
    that.getHisotyList();
  },
  getHisotyList: function () {
    const that = this;
    that.postPhoneNumber(config.apiList.consultation, { auth_code: that.data.authCode }, (res) => {
      that.setData({
        postHistoryList: res.data.infos
      })
    });
  },
  falseClick: function () {
    this.setData({
      activeClass: false
    })
  },
})