// 引入模块
const express = require('express');
// 链接sql
const mysql = require('mysql');
const pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'',
	database:'tedu'
});
// 创建web服务器
const app = express();
// 端口
app.listen(12138,()=>{
	console.log('okk');
});

// 静态托管资源
app.use(express.static('../public'));

// 中间件，解析为对象
app.use(express.urlencoded({
	extended:false
}));



// 删除员工接口
// http://localhost:12138/v1/emps
app.delete('/v1/emps/:eid',(req,res)=>{
	// 获取路由传参的数据
	console.log(req.params);
	// 执行sql命令
	pool.query('delete from emp where eid=?',[req.params.eid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		// 结果是对象，如果对象下的affectedRows值为0说明删除失败
		if(result.affectedRows===0){
			res.json({code:201,msg:'删除失败'});
		}else{
			// json和send一样，可以响应json格式
			res.json({code:200,msg:'删除成功'});
		};
	});
});


