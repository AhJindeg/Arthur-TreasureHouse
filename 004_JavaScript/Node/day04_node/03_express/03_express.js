const express = require('express');
const querystring = require('querystring');
const app = express();
app.listen(12138);

app.get('/search',(req,res)=>{
	res.sendFile(__dirname + '/index.html');
});

app.get('/mysearch',(req,res)=>{
	// 获取get传递的数据(格式为查询字符串)
	console.log(req.query);
	// 获取请求的url，获取请求的方法
	// console.log(req.url,req.method);
	res.send('搜索成功');
});

app.get('/login',(req,res)=>{
	res.sendFile(__dirname + '/login.html');
})
app.post('/mylogin',(req,res)=>{
	req.on('data',(chunk)=>{
		// chunk就是获取的分段数据
		console.log(chunk);
		// 转为字符串，格式为查询字符串
		var str=chunk.toString();
		console.log(str);
		// 借助查询字符串模块解析为对象
		var obj=querystring.parse(str);
		console.log(obj);
		
	});
	res.send('登陆成功');
});


// 路由传参
app.get('/package/:pname',(req,res)=>{
	console.log(req.params);
	res.send('这是包的详情');
});


app.get('/shopping/:lid&:num',(req,res)=>{
	res.send(`
		商品的编号： ${req.params.lid} <br>
		购买的数量： ${req.params.num}
	`);
});




