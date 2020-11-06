//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '2000',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    originalNumber:[
      {detailumber:"当前就餐人数",detailNumber:80},{detailumber:"今日就餐人数",detailNumber:252},{detailumber:"累积就餐人数",detailNumber:1256}
    ],
    statusBarHeight: app.globalData.statusBarHeight
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if(e.detail.errMsg=='getUserInfo:ok'){
      console.log('登录成功')
      let userMessage = e.detail.rawData
      wx.reLaunch({
        url: `/pages/indexUser/user?detail=${userMessage}`
      })
    }else{
      console.log('登录失败')
    }
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
