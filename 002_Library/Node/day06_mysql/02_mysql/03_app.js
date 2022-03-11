const express = require('express');

const mysql = require('mysql');
const pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'',
	database:'tedu'
});

const app = express();
app.listen(12138,()=>{
	console.log('okk');
});

// 使用中间件将所有post请求的数据解析为对象
app.use( express.urlencoded({
	extended:false
}) );

// 添加路由(post /v1/emps)
// 接口地址：http://localhost:12138/v1/emps
// 请求方法：post
app.post('/v1/emps',(req,res)=>{
	// 获取post请求的数据
	console.log(req.body);
	
	// 执行sql命令，将对象插入到数据库tedu下的emp表中
	pool.query('insert into emp set ?',[req.body],(err,result)=>{
		if(err) throw err;
		console.log(result);
	});
	
	// res.json() 和 res.send() 作用相同，都可以将对象转为json
	res.send({code:200,msg:'员工添加成功'});
});


app.get('/v1/emps/:eid',(req,res)=>{
	console.log(req.params);
	
	pool.query('select * from emp where eid=?',[req.params.eid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		// 把查询到的数据响应到客户端
		// 查询的结果是数组，如果是空数组说明该员工不存在
		if(result.length===0){
			res.send({code:201,msg:'该员工不存在'});
		}else{
			res.send({code:200,msg:'查找成功',data:result});
		};
	});
});