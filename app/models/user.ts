const mongoose = require('mongoose')
// 创建的这个文件相当于一个数据库表，下面的对象就是表中的字段定义，会自动增加随机ID字段
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now()
    }
})
module.exports = mongoose.model('user', userSchema)