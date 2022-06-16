// 创建web服务器
const express = require('express');
// 添加路由，响应
const r = express.Router();
//创建服务器
const app=express();
// 设置端口
app.listen(8080);


function fn(req,res,next){
	// console.log('拦截到了对/list的请求');
	// 获取传递的用户名
	// 获取get传递的数据
	console.log(req.query);
	// 判断用户是否为管理员
	// 不是root就响应’提供管理员用户‘
	if(req.query.user!=='root'){
		res.send('请提供管理员用户');
	}else{
		// 否则是管理员，往后继续执行，可能是下一个中间件或者是路由
		next();
	};
};

// 添加中间件，拦截对/list的请求
app.use('/list',fn);

// 添加路由(get /list)，响应‘这是后台数据’
app.get('/list',(req,res)=>{
	res.send('这是后台商品数据');
});

// 添加中间件，拦截对/delete的请求
app.use('/delete',fn);
// 添加路由(get /delete)，用于删除用户
app.get('/delete',(req,res)=>{
	res.send('用户删除成功');
});




function fn2(req,res,next){
	console.log(req.query);
	// 打折
	req.query.price*=0.9;
	// 往后继续执行
	next();
}

// 添加中间件，拦截对/shopping的请求
app.use('/shopping',fn2);
// 路由(get /shopping)
app.get('/shopping',(req,res)=>{
	// 获取get传递的数据
	console.log(req.query);
	res.send('商品的价格：' + req.query.price);
});




