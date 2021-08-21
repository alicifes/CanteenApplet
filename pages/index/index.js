//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '500',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    adminList:[],
    openId:'',
    statusBarHeight: app.globalData.statusBarHeight,
    adminNumber:'0'
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

  //点击按钮事件
  getUserInfo: function(e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    if(e.detail.errMsg=='getUserInfo:ok'){
      console.log('登录成功')
      let userMessage = e.detail.rawData
      //获得用户id写入界面
      wx.cloud.callFunction({
        name:'getOpenId',
        success(res){
          console.log('获取id成功',res)
          that.setData({
            openId:res.result.openid
          })
          // if(res.result.openid == 'o2z46449eQoZ2PLkm5I0dIfaua8E'){
          //   wx.reLaunch({
          //     url: `/pages/admin/admin?detail=${userMessage}`
          //   })
          // }else{
          //   wx.reLaunch({
          //     url: `/pages/indexUser/user?detail=${userMessage}`
          //   })
          // }
        },
        fail(res){
          console.log('获取id失败',res)
        }
      }),
      // 调用数据库id写入页面
      wx.cloud.callFunction({
          name:"getUserId",
        }).then(res=>{
          that.setData({
            adminList:res.result.data
          })
          // console.log(res)
          // console.log(that.data.adminList)
          var items = that.data.adminList
          for(var index in items){
            // console.log(that.data.openId)
            // console.log(items[index].openId)
          if(that.data.openId == items[index].openId){
            that.setData({
              adminNumber:1
            }) 
            // console.log(that.data.adminNumber)
          }
        }
        if(that.data.adminNumber == '1'){
          wx.reLaunch({
                url: `/pages/admin/admin?detail=${userMessage}`
              })
          }else{
              wx.reLaunch({
                url: `/pages/indexUser/user?detail=${userMessage}`
            })
          }
        }).catch(err=>{
          console.error(err)
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
