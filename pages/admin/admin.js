// pages/indexUser/user.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    arr :[],
    motto: '500',
    hasUserInfo: false,
    nickName:'',
    avatarUrl:'',
    originalNumber:[
      {detailumber:"当前就餐人数",detailNumber:180},{detailumber:"食堂剩余位置",detailNumber:252},{detailumber:"今日就餐人数",detailNumber:1256}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:options.detail//获取传递过来的值
    });
    let strToObj = JSON.parse(this.data.userInfo)
    let type = typeof(strToObj)
    console.log(strToObj)
    console.log(type);
    this.setData({
      userInfo:strToObj,
      nickName:strToObj.nickName,
      avatarUrl:strToObj.avatarUrl
    })
    console.log(this.data.userInfo); 
    console.log(this.data.userInfo.gender)
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

  },
  bindButtonTap:function(){
    wx.switchTab({
      url: '/pages/main/main',
    })
  },
  bindButtonTapBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  bindButtonTapManager:function(){
    wx.navigateTo({
      url: '/pages/adminManager/adminManager',
    })
  }
})