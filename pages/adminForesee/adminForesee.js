// pages/main/main.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
const DB = wx.cloud.database().collection("menu")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    Index:{},
    originalNumber:[{vegName:''}],
    vegNameArray:[],
    statusBarHeight: app.globalData.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.cloud.callFunction({
      name:"getMenu",
    }).then(res=>{
      this.setData({
        originalNumber:res.result.data
      })
      var toolArray=[]
      for(let i in this.data.originalNumber){
        toolArray.push(this.data.originalNumber[i].vegName)
      }
      console.log(toolArray)
      this.setData({
        vegNameArray:toolArray
      })
      console.log(this.data.originalNumber)
    }).catch(err=>{
      console.error(err)
    })
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
  showpic(event){
    // console.log("1")
     console.log(event)
    console.log(event.target.id)
    
    var Index = event.target.id;
    this.setData({
      Index:Index
    })
    var showdetail = this.data.originalNumber;
    // console.log(showdetail)
    for (let i = 0;i<=showdetail.length;i++) {   
      if (this.data.vegNameArray[i]== Index) {
        //根据下标找到目标,改变状态  
        let thisarry = showdetail[i];
        thisarry.show = true
        let toolarry = showdetail;
        toolarry[i] = thisarry;
        console.log("ok")
        this.setData({
              originalNumber :toolarry
            //  show:true
            })
        }
      }
  } ,
  onClose:function(){
    var Index = this.data.Index;
    console.log(Index);
    var showdetail = this.data.originalNumber;
    // console.log(showdetail)
    for (let i = 0;i<=showdetail.length;i++) {   
      if (this.data.vegNameArray[i] == Index) {
        //根据下标找到目标,改变状态  
        let thisarry = showdetail[i];
        thisarry.show = false
        let toolarry = showdetail;
        toolarry[i] = thisarry;
        // console.log("ok")
        this.setData({
              originalNumber :toolarry
            //  show:true
            })
        }
      }
  },
  
  bindButtonTapMain:function(){
    Dialog.confirm({
      message: '是否退出系统',
      show:true,
    }) 
    .catch(() => {
       })
    .then(() => {
        })
  },
  nav:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    });
    Dialog.close()
  },
  backAdmin(){
    wx.reLaunch({
      url: '/pages/adminManager/adminManager',
    });
  }

})