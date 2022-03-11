const express = require('express');
// 引入中间模块
const bodyParser = require('body-parser');
// 字符串模块
const querystring = require('querystring')
const app = express();
app.listen(12138);
app.use(express.static('../public'));

// 2.使用body-parser中间件，将所有的请求数据解析为对象
// body-parser中间件也是内置的中间件，也可以使用express
app.use(bodyParser.urlencoded({
	extended:false   //是否使用第三方的qs模块解析为对象
}));

app.post('/mylogin',(req,res)=>{
	// 3.获取post传递的数据
	console.log(req.body);
	// req.on('data',(chunk)=>{
	// 	// 转为字符串，格式查询字符串
	// 	var str = chunk.toString();
	// 	// 解析为对象
	// 	var obj = querystring.parse(str);
	// });
	// res.send('登陆成功');
	
	
	
	
	
	
});