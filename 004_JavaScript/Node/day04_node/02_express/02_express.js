// 引入express第三方模块
const express = require('express');

// 创建web服务器
const app = express();

// 设置端口
app.listen(8080,()=>{
	console.log('okk');
});

// 添加路由，用来处理对首页的请求
// 请求的方法：get   请求的URL：/index
app.get('/index',(req,res)=>{
	// req 请求的对象
	// res 响应的对象
	// 设置响应的内容并发送
	res.send('这是index');
});

// 响应”这是商品的详情“
app.get('/aee',(req,res)=>{
	res.send('详情');
});

// 添加路由，处理对学习的请求
// 跳转
app.get('/study',(req,res)=>{
	// 设置跳转的url并发送
	res.redirect('https://www.bilibili.com');
});

// 添加路由：处理对首页的请求
// 方法：get   url：/
// /index
app.get('/',(req,res)=>{
	res.redirect('/index');
});

// 添加路由：处理对商品的请求
// 请求的方法：get  请求url：/list
// 响应文件

app.get('/list',(req,res)=>{
	// 响应文件
	res.sendFile(__dirname+'/index.html');
});

// 获取绝对路径
