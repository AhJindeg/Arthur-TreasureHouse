// 1. 引入express模块
const express = require('express');
// 2. 引入连接池
const pool = require('../pool.js');
// 3. 因为要打包暴露出去所以要创建一个路由对象
let router = express.Router();

// ------ 接口逻辑 ------

// 接口1：用户新注册
// 请求方法：post
// 后台模块中的接口地址：/add
// 前台访问的接口地址：/user/add
// 获取请求：req.query
// 对数据库进行'插入'
// 约定unames,uphone,umember
// insert into userinfo set ?;
// 因为这个插入的sql过于长，并且需要指定字段，因此使用注入的方式更加简单
// 响应结果：
// {code:1,msg:'注册成功'} {code:0,msg:'注册失败'}
router.post('/add',(req,res,next)=>{
  var obj = req.body;
  // console.log(obj);
  var sql = 'insert into userinfo set ?';
  pool.query(sql,[obj],(err,data)=>{
    if(err){
      next(err);
      return;
    };
    // console.log(data);
    // 因为新增数据不会有数据返回值，只能看被修改的条数
    if(data.affectedRows == 1){
      res.send({code:1,msg:'注册成功'});
    }else{
      res.send({code:0,msg:'注册失败'});
    };
  });
});


// 接口2：修改用户
// 请求方法：put
// 后台模块中的接口地址：/edit
// 前台访问的接口地址：/user/edit
// post和put一样接受参数使用req.body

// 获取请求：req.query
// 对数据库进行'插入'
// 约定unames,uphone,umember
// insert into userinfo set ?;
// 因为这个插入的sql过于长，并且需要指定字段，因此使用注入的方式更加简单
// 响应结果：
// {code:1,msg:'注册成功'} {code:0,msg:'注册失败'}
router.put('/edit',(req,res,next)=>{
  // 获取post请求数据
  var obj = req.body;
  // console.log(obj);
  var sql = `update userinfo set u_names="${obj.uname}",u_phone="${obj.uphone}",u_member=${obj.umember} where u_phone="${obj.oldphone}";`;
  // 执行sql命令
  pool.query(sql,(err,data)=>{
    if(err){
      next(err);
      return;
    };
    console.log(data);
    // 结果是对象，判断对象下的affectedRows，如果是0说明修改失败，否则修改成功
    if(data.affectedRows === 1){
      // 修改成功
      res.send({code:1,msg:'修改成功'});
    }else{
      // 修改失败
      res.send({code:0,msg:'修改失败'});
    };
  });
});
// ------ ------ ------

// 4. 暴露路由(user)对象
module.exports = router;
