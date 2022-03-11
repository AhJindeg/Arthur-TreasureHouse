// 引入http模块
const http=require('http');

// 引入fs模块
const fs = require('fs');

// 创建web服务器
const app=http.createServer();

// 设置端口
app.listen(8080,()=>{
	console.log('服务器创建成功');
});

// 接受请求
app.on('request',(req,res)=>{
	// 判断请求的url
	if(req.url==='/index'){
		res.writeHead(200,{
			'Content-Type':'text/html;charset=utf-8'
		});
		res.write('这是首页');
		// res.end();
	}else if(req.url==='/study'){
		res.writeHead(302,{
			Location:'https://www.baidu.com/?tn=18029102_2_dg',
		});
		// res.end();
	}else if(req.url==='/list'){
		var date = fs.readFileSync('./index.html');
		res.write(date);
	}else{
		res.writeHead(404);
		res.write('not found');
		// res.end();
	};
	
	
	// 无论响应什么内容，最后发送
	res.end();
});