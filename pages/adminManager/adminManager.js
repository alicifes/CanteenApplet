// pages/adminManager/adminManager.js
const DB = wx.cloud.database().collection("menu")
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  // 页面初始数据
  data:{
    openid: '',
    checked: true,
    show: false,
    showEdit:false,
    value: '',
    queryResult: '',
    originalNumber:[],
    vegName:'',
    price:'',
    picrout:'',
    show:false,
    used:true,
    radio: '1',
    radio1:true,
    onRead:'',
    deletPicrout:'',
    error1:'',
    error2:'',
    error11:'',
    error22:'',
    editNumberOriginal:'',
    editVegName:'',
    editVegPrice:'',
    editVegProperty:'',
    editRadio:'1',
    fileList: [
      {
        url:'',
        name:''
      }
    ],
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
      console.log(res)
    }).catch(err=>{
      console.error(err)
    })
  },

  //点击添加菜品,弹出添加菜品弹窗
   addMenu() {
    this.setData({ show: true });
   },
  // 点击关闭添加菜品弹窗
   onCloseAddMenu() {
    this.setData({ show: false });
  },
  //点击关闭修改菜品弹窗
  onCloseEditMenu() {
    this.setData({ showEdit: false });
    this.setData({
      vegName:'',
      price:'',
      picrout:'',
      show:false,
      used:true,
      radio: '1',
    })
  },


//   // 输入表单判断
//   // 验证菜品是否为空
//   judege1(){
//     if(this.data.vegName== ''){
//       this.setData({
//         error1:'请输入菜品名'
//       })
//     }else{
//       this.setData({
//         error1:''
//       })
//     }
//   },
// //验证价格是否为空是否为数字,用的方法是正则表达式
//   judege2(){
//     let str = /[1-9]\d*/
//     if(this.data.price== ''){
//       this.setData({
//         error2:'请输入价格'
//       })
//     }else if(str.test(this.data.price) == false ){
//       this.setData({
//         error2:'请输入数字'
//       })
//     }else{
//       this.setData({
//         error2:''
//       })
//     }
//   },

  // 通过滑块进行操作
  onEdit(event) {
    const { position, instance } = event.detail;
    switch (position) {
      // 左侧编辑按钮
      case 'left':{
        console.log(event.target.dataset.index)
        var editNumber = event.target.dataset.index
        this.setData({
          editNumberOriginal:editNumber
        })
        let editOrigianlVegProperty = '1'
         DB.doc(editNumber).get().then(res=>{
          // 返回一个对象
          console.log(res.data)
          if(res.data.vegProperty== true){
            editOrigianlVegProperty='1'
          }else{
            editOrigianlVegProperty='2'
          }
          this.setData({
            editVegName:res.data.vegName,
            editVegPrice:res.data.price,
            editVegProperty:res.data.vegProperty,
            editRadio:editOrigianlVegProperty,
            deletPicrout:res.data.picrout
          })
          // console.log(this.data.deletPicrout)
        })
        Dialog.confirm({
          message: '确定编辑吗？',
        }).then(() => {
          console.log('吃奥利给哦')
          this.setData({
            showEdit:true
          })
          instance.close();
        }).catch(()=>{
          console.log('我爱吃奥利给')
          instance.close();
        })
        break;
      }
      // 从右侧的按钮内部删除数据
      case 'right':{
        // console.log(event.target.dataset.index)
        // 获得当前按钮
         var editNumber1 = event.target.dataset.index
         DB.doc(editNumber1).get().then(res=>{
          // 返回一个对象
          // console.log(res.data)
          // console.log(res.data.picrout)
          this.setData({
            deletPicrout:res.data.picrout
          })
          // console.log(this.data.deletPicrout)
        })
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          // console.log('aoligei')
          DB.doc(editNumber1).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              this.deletePic()
            },fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              })
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })
          // 调用异步函数,重新载入页面
          this.onLoad()
          instance.close();
        }).catch(()=>{
          // console.log('我爱吃奥利给啦啦啦啦')
          instance.close();
        })
        break;
      }
    }
  },
// 删除图片
  deletePic(){
    wx.cloud.deleteFile({
      fileList: [this.data.deletPicrout],
        success: res => {
          // handle success         
          console.log(res.fileList)
        },
        fail: console.error
      })
  },

  //返回首页
  exit() {
    Dialog.confirm({
      message: '是否退出系统',
      show:true,
    }) 
      .then(() => {
        wx.reLaunch({
         url: '/pages/index/index',
       })
      })  
    .catch(() => {
      Dialog.close()
       })
  },


  //滑动按钮设置菜单是否展示
  onChangeButton(event) {
    this.setData({
      radio1: event.detail,
    });
    var editNumber1 = event.target.dataset.index
    this.setData({
      editNumber1:editNumber1
    })
    console.log(this.data.editNumber1)
    DB.doc(editNumber1).update({
      //只修改是否展示为当前菜单
        data: {
          used: this.data.radio1
        },
        success:res=>{    
          console.log('修改成功')
        },
        fail: res=>{  
          console.log('修改失败')  
        }
    })
    this.onLoad()
  },

  //添加弹窗单选框
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
    console.log(this.data.radio)
  },

  //修改弹窗单选框
  onEditClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      editRadio: name,
    });
    console.log(this.data.editRadio)
  },



  // 绑定菜单名
  onVegName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      vegName : event.detail
    })
  },

  // 上传图片
  upload_picture: function(name) {
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,	
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        //将照片上传至云端需要刚才存储的临时地址
        const name = Math.random() * 1000000;
        const cloudPathRadom = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath: 'picOriginal/'+cloudPathRadom, //上传至云端路径
          filePath,//临时存贮的位置
          success(res) {
          //上传成功后会返回永久地址
             console.log(res.fileID)
             that.setData({
                picrout:res.fileID,
                onRead:res.fileID,
             })
          }
        })
      }
    })
  },


  // 添加数据到云端
  addMenuList() {
    let str = /[1-9]\d*/
    let priceend = str.test(this.data.price)
    let property = true
    if(this.data.vegName== ''){
      this.setData({
        error1:'请输入菜品名'
      })
      return false
    }else{
      this.setData({
        error1:''
      })
    }
    if(this.data.price== ''){
      this.setData({
        error2:'请输入价格'
      })
      return false
    }else if(str.test(this.data.price) == false ){
      this.setData({
        error2:'请输入数字'
      })
      return false
    }else{
      this.setData({
        error2:''
      })
    }
    if(this.data.vegName!=''&&priceend&&this.data.picrout!=''&&this.data.radio!=''){
      if(this.data.radio == 1){
        property = true
      }else{
        property = false 
      }
    DB.add({
      data:{
        vegName:this.data.vegName,
        price:this.data.price,
        picrout:this.data.picrout,
        vegProperty:property,
        show:false,
        used:true,
      },
      success: res => {
        wx.showToast({
          title: '添加成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '添加失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    this.setData({
      onRead:'',
      tempFilePaths:'',
      fileList:''
    })
    this.addCancel();
    this.onLoad();
  }else{
    wx.showToast({
      icon: 'none',
      title: '添加失败,未上传图片'
    })
  }
  },

  // 关闭弹窗按钮
  addCancel() {
    this.setData({ show: false});
    this.setData({
      vegName:'',
      price:'',
      picrout:'',
      show:false,
      used:true,
      radio: '1',
    })
  },

  // 修改数据库的数据
  editMenuList(){
    console.log(this.data.editNumberOriginal)
    let str = /[1-9]\d*/
    if(this.data.editVegName == ''){
      this.setData({
        error11:'请输入菜品名'
      })
      return false
    }else{
      this.setData({
        error11:''
      })
    }
    if(this.data.editVegPrice== ''){
      this.setData({
        error22:'请输入价格'
      })
      return false
    }else if(str.test(this.data.editVegPrice) == false ){
      this.setData({
        error22:'请输入数字'
      })
      return false
    }else{
      this.setData({
        error22:''
      })
    }
    let editOriginalRadio = true
    if(this.data.editRadio=='1'){
      editOriginalRadio = true
    }else{
      editOriginalRadio = false
    }
    let editOriginalNumber = this.data.editNumberOriginal
    DB.doc(editOriginalNumber).update({
      //只修改是否展示为当前菜单
        data: {
          vegName:this.data.editVegName,
          price:this.data.editVegPrice,
          vegProperty: editOriginalRadio
        },
        success:res=>{    
          wx.showToast({
            title: '修改成功',
          })
        },
        fail: res=>{  
          wx.showToast({
            icon: 'none',
            title: '修改失败'
          }) 
        }
    })
    this.onCloseEditMenu();
    this.onLoad();
  },
  lookMenu(){
    wx.reLaunch({
      url: '/pages/adminForesee/adminForesee',
    });
  }
  })