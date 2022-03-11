const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//console.log(pool);
//创建路由器对象
const r=express.Router();
//1.用户注册(post /reg)
//接口地址：http://127.0.0.1:8080/v1/users/reg
//请求方法：post
r.post('/reg',(req,res,next)=>{
  //1.1获取post传递的数据
  var obj=req.body;
  console.log(obj);
  //1.2验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname不能为空'});
	//阻止往后执行
	return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd不能为空'});
	return;
  }
  if(!obj.email){
    res.send({code:403,msg:'email不能为空'});
	return;
  }
  if(!obj.phone){
    res.send({code:404,msg:'phone不能为空'});
	return;
  }
  //验证手机号码格式
  //如果不正确
  if( !/^1[3-9]\d{9}$/.test(obj.phone) ){
    res.send({code:405,msg:'手机号码格式错误'});
	return;
  }
  //执行SQL命令
  pool.query('insert into xz_user set ?',[obj],(err,result)=>{
    if(err){
	  //把错误抛给下一个中间件处理
	  next(err);
      //阻止往后执行
	  return;
	}
	console.log(result);
    res.send({code:200,msg:'注册成功'});
  });
});
//2.用户登录(post /login)
//接口地址：http://127.0.0.1:8080/v1/users/login
//请求方法：post
r.post('/login',(req,res,next)=>{
  //2.1获取post传递的数据
  var obj=req.body;
  console.log(obj);
  //2.2验证各项是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname不能为空'});
	return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd不能为空'});
	return;
  }
  //2.3执行SQL命令
  pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err){
	  //如果有错误，抛给下一个错误处理中间件
	  next(err);
	  return;
	}
	console.log(result);
	//结果是数组，如果为空数组说明登录失败
	if(result.length===0){
	  res.send({code:201,msg:'登录失败'});
	}else{
	  res.send({code:200,msg:'登录成功'});
	}    
  });
});
//3.查找用户(get /编号)
//接口地址：http://127.0.0.1:8080/v1/users/3
//请求方法：get
r.get('/:uid',(req,res,next)=>{
  //3.1获取路由传参的数据
  var obj=req.params;
  console.log(obj);
  //3.2执行SQL命令
  pool.query('select * from xz_user where uid=?',[obj.uid],(err,result)=>{
    if(err){
	  next(err);
	  return;
	}
	console.log(result);
	//结果是数组，如果是空数组说明该用户不存在
	if(result.length===0){
	  res.send({code:201,msg:'该用户不存在'});
	}else{//否则存在
	  res.send({code:200,msg:'查找成功',data:result});
	}
  }); 
});
//4.修改用户(put /)
//接口地址：http://127.0.0.1:8080/v1/users/
//请求方法：put
r.put('/',(req,res,next)=>{
  //4.1获取post请求的数据
  var obj=req.body;
  console.log(obj);
  //4.2验证数据是否为空
  //遍历对象属性
  var i=400;//初始化变量用于保存状态码
  for(var k in obj){
	i++;//每次遍历加1
	//k属性名   obj[k]属性值
    //console.log(k,obj[k]);
	//判断属性值是否为空
	if(!obj[k]){
	  res.send({code:i,msg:k+'不能为空'});
	  return;
	}
  }
  //4.3执行SQL命令
  pool.query('update xz_user set ? where uid=?',[obj,obj.uid],(err,result)=>{
    if(err){
	  next(err);
	  return;
	}
	console.log(result);
	//结果是对象，如果对象下的affectedRows为0说明修改失败
	if(result.affectedRows===0){
	  res.send({code:201,msg:'修改失败'});
	}else{
	  res.send({code:200,msg:'修改成功'});
	}
  }); 
});


//导出路由器对象
module.exports=r;