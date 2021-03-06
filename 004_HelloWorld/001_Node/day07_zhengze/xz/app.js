const express = require('express');
// 创建web服务器
const app = express();
// 引入用户路由
const userRouter = require('./routes/user.js');
app.listen(12138,()=>{
	console.log('okk');
});

// 使用中间件将所有post请求的数据解析为对象
app.use(express.urlencoded({
	extended:false
}));

// 使用路由器，添加前缀/v1/users
app.use('/v1/users',userRouter);

// 使用错误处理中间件，拦截所有路由中抛出的错误
app.use((err,req,res,next)=>{
	// err 得到的中间件传递过来的错误
	console.log(err);
	// 设置http协议响应的状态码
	res.status(500).send({code:500,msg:'服务器错误'});
});