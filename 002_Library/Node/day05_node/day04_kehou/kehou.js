const express = require('express');
const querystring = require('querystring');
const app = express();
app.listen(12138);

app.get('/reg',(req,res)=>{
	res.sendFile(__dirname + '/reg.html');
});

app.post('/myreg',(req,res)=>{
	req.on('data',(chunk)=>{
		var obj = querystring.parse(chunk.toString());
		res.send(`注册成功！当前用户为：${obj.YH}`);
	});
});

