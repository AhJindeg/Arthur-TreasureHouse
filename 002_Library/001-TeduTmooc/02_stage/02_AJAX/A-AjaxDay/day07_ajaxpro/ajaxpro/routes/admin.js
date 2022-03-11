// 1. 引入express模块
const express = require('express');
const { userInfo } = require('os');
// 2. 引入连接池
const pool = require('../pool.js');
// 3. 因为要打包暴露出去所以要创建一个路由对象
let router = express.Router();

// ------ 接口逻辑 ------

// 接口1：管理员登录
// 请求方法：post
// 后台模块中的接口地址：/login
// 前台访问的接口地址：/admin/login
// 获取请求：req.body【约定前后台传递数据的key名】
// 对数据库进行'查询'【约定的管理员名字是req.body.anames，密码是req.body.apwd】：
// select * from admin where a_names=${anames} and a_pwd=${apwd};
// 响应结果：
// {code:1,msg:'登录成功'} {code:0,msg:'登录失败'}
router.post('/login',(req,res,next)=>{
  var obj = req.body;
  var sql = `select * from admin where a_names="${obj.anames}" and a_pwd="${obj.apwd}";`;
  // console.log(sql);
  // 执行sql
  pool.query(sql,(err,data)=>{
    // 假装返回模拟数据
    // res.send('前后台已通');
    // 排除错误
    if(err){
      next(err);
      return;
    };
    // 回调函数两个参数不能省略，不能颠倒顺序，data是返回的查询结果
    // 如果是查询语句，data是有返回值的，返回值是数组，正确的是数组中的一个对象，错误的是一个空数组。通过判断数组长度来验证是否通过登录
    // console.log(data);
    if(data.length === 0){
      res.send({
        code:0,
        msg:'用户名密码错误'
      });
    }else{
      res.send({
        code:1,
        msg:'登陆成功'
      });
    };
  });
});

// 接口2：用户列表显示所有用户信息，包含删除按钮
// 请求方法：get
// 后台模块中的接口地址：/search
// 前台访问的接口地址：/admin/search
// 不需要请求参数
// sql语句：select * from userinfo;
// 响应结果：
// {code:1,msg:'返回所有用户数据',data:data}
router.get('/search',(req,res,next)=>{
  pool.query('select * from userinfo;',(err,data)=>{
    if(err){
      next(err);
      return;
    };
    // 先确定查询完的语句确实有数据
    // console.log(data);
    res.send({
      code:1,
      msg:'all数据',
      data:data
    });
  });
});

// 接口3：删除用户信息
// 请求方法：delete
// 后台模块中的接口地址：/del/:xxx
// 前台访问的接口地址：/admin/del
// 获取请求：req.params【使用:/】
// 对数据库进行'删除'
// 【约定的管理员id是req.params.uid】：
// delete from userinfo where u_id=${uid};
// 响应结果：
// {code:1,msg:'删除成功'} {code:0,msg:'删除失败'}
router.delete('/del/:uid',(req,res,next)=>{
  // 先收前台来的数据
  let obj = req.params;
  // console.log(obj);
  let sql = `delete from userinfo where u_id=${obj.uid};`
  // console.log(sql);
  // 测试后台数据可以到前台来
  // res.send('测试');
  pool.query(sql,(err,data)=>{
    if(err){
      next(err);
      return;
    };
    // console.log(data);
    // affectedRows代表发生变化的条数
    console.log(data.affectedRows);
    if(data.affectedRows === 1){
      res.send({code:1,msg:'删除成功'});
    }else{
      res.send({code:0,msg:'删除失败'});
    };
  });
});

// 接口4：查找单一用户信息
// 请求方法：get
// 后台模块中的接口地址：/find
// 前台访问的接口地址：/admin/find
// 获取请求：req.query
// 对数据库进行'查找'
// 【约定的用户id是req.query.uname】：
// select * from userinfo where u_names="${uname}";
// 响应结果：
// {code:1,msg:'用户查找成功',data:data} {code:0,msg:'找不到该用户'}
router.get('/find',(req,res,next)=>{
  var obj = req.query;
  // console.log(obj);
  var sql = `select * from userinfo where u_names="${obj.uname}";`
  pool.query(sql,(err,data)=>{
    if(err){
      next(err);
      return;
    };
    if(data.length){
      res.send({code:1,msg:'用户查找成功',data:data});
    }else{
      res.send({code:0,msg:'找不到该用户'});
    };
  });
});

// ------ ------ ------

// 4. 暴露路由(admin)对象
module.exports = router;