// 引入模块
const express = require('express');
// 创建web服务器
const app = express();
// 端口
app.listen(12138);
// 静态托管资源
app.use(express.static('../public'));

// 中间件，解析为对象
app.use(express.urlencoded({
	extended:false
}));

// 添加路由
app.post('/mysql',(req,res)=>{
	console.log(req.body);
	res.send('员工添加成功');
});

