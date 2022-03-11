// 引入http模块
const http=require('http');

// 创建WEB服务器
const app=http.createServer();

// 设置端口
app.listen(12138,()=>{
	console.log('WEB服务器启动成功');
});

// 请求WEB服务器
// http://127.0.0.1:12138
// http://localhost:12138

// 添加事件，监听浏览器的请求，一旦请求自动调用回调函数
app.on('request',(req,res)=>{
	// req 请求的对象，获取请求的内容
	
	// res 响应的对象，用于做出响应

	// // 设置响应的头信息
	// res.writeHead(200,{
	// 	'Content-Type':'text/html;charset=utf-8'
	// });
	
	// // 设置响应到浏览器的内容
	// res.write('这是你的煎饼');
	
	// // 结束并发送
	// res.end();
	
	// // 设置响应的状态码为302和头信息
	// res.writeHead(302,{
	// 	Location:'https://www.bilibili.com/video/BV1FU4y1W74Y?p=153'
	// });
	// // 结束并发送
	// res.end();
	
	// 设置响应的状态码404
	res.writeHead(404);
	// 设置响应的内容
	res.write('Not Found');
	// 结束并发送
	res.end();
	
});



