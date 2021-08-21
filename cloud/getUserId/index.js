// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const DB = cloud.database()


// 云函数入口函数
exports.main =  async (event, context) => {
  return await DB.collection('adminId').get()
}