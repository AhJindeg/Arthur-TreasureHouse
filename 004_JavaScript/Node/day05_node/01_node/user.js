//引入express
const express=require('express');
//创建路由器
const r=express.Router();
//添加用户
r.get('/list',(req,res)=>{
 res.send('这是用户列表');
})
//导出路由器对象
module.exports=r;