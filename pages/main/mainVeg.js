// pages/main/main.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
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
    originalNumber:[
      {show:false,vegProperty:'1',vegName:'雪花鸡淖',picrout:'https://bkimg.cdn.bcebos.com/pic/060828381f30e9247b60e76246086e061c95f799?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'1',vegName:'火爆腰花',picrout:'https://bkimg.cdn.bcebos.com/pic/72f082025aafa40fa950f48fab64034f79f019c9?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'1',vegName:'酸辣臊子蹄筋',picrout:'https://bkimg.cdn.bcebos.com/pic/5366d0160924ab182735f5883bfae6cd7b890b69?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxNTA=,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'2',vegName:'炝黄瓜',picrout:'https://bkimg.cdn.bcebos.com/pic/dc54564e9258d109addd1820d258ccbf6c814d61?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'1',vegName:'麻酱凤尾',picrout:'https://bkimg.cdn.bcebos.com/pic/91529822720e0cf3838997890a46f21fbe09aa42?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'2',vegName:'鲜花豆腐',picrout:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3101821730,3422975819&fm=26&gp=0.jpg'},
      {show:false,vegProperty:'1',vegName:'鱼香牛肉丝',picrout:'https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901bcc66bab77ec54e737d1965b?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'1',vegName:'参麦团鱼',picrout:'https://bkimg.cdn.bcebos.com/pic/b151f8198618367afa72957820738bd4b21ce598?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5'},
      {show:false,vegProperty:'1',vegName:'芹黄鱼丝',picrout:'https://i2.chuimg.com/bd914f02e2264aaeb007db812897748e_1188w_865h.jpg?imageView2/2/w/660/interlace/1/q/90'},
      {show:false,vegProperty:'1',vegName:'芪烧活鱼',picrout:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2803536070,483608998&fm=26&gp=0.jpg'},
      {show:false,vegProperty:'1',vegName:'鱼香肉片',picrout:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604241817398&di=cb0afc5fcd99384796b276a2bf8fc3c1&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn10%2F314%2Fw600h514%2F20180510%2F38a6-haichqz4555956.jpg'},
      {show:false,vegProperty:'1',vegName:'清汤燕',picrout:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604242055239&di=715ed72d20fe848171e19222646fbad0&imgtype=0&src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2F94cad1c8a786c917207ae5ad42c43fc83ac7572d.jpeg%3Ftoken%3D3e2afa343e816bd9bccb3ae9f0f2809e%26amp%3Bs%3D992BE71753416F4D14A6C9750300F033'},
      {show:false,vegProperty:'2',vegName:'复元汤',picrout:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1691944570,432185037&fm=26&gp=0.jpg'},
      {show:false,vegProperty:'2',vegName:'乌发汤',picrout:'https://g-search1.alicdn.com/img/bao/uploaded/i4/3576922750/O1CN01tVtzkr1WBXiyxWNzi_!!3576922750.jpg_300x300.jpg'}
    ],
    statusBarHeight: app.globalData.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
  showpic:function(event){
    console.log("1")
    console.log(event)
    console.log(event.target.id)
    var Index = event.target.id;
    this.setData({
      Index:Index
    })
    var showdetail = this.data.originalNumber;
    console.log(showdetail)
    for (let i = 0;i<=showdetail.length;i++) {   
      if ( showdetail[i] .vegName== Index) {
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
    console.log(showdetail)
    for (let i = 0;i<=showdetail.length;i++) {   
      if ( showdetail[i] .vegName== Index) {
        //根据下标找到目标,改变状态  
        let thisarry = showdetail[i];
        thisarry.show = false
        let toolarry = showdetail;
        toolarry[i] = thisarry;
        console.log("ok")
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
  }
})