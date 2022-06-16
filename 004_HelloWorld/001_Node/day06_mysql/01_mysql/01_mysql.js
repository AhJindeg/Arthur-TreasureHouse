// 引入MySQL模块
const mysql = require('mysql');
// 创建链接池对象
const pool = mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'tedu',
	connectionLimit:15 // 连接池的大小，默认15个
});

// 执行sql命令，自动建立连接
// 方法是异步的，需要使用回调函数
pool.query('select * from emp',(err,result)=>{
	// err:可能产生的错误结果
	if(err) throw err;
	// result:成功的结果
	console.log(result);
});


var user = 'tao" or "1';
pool.query('select * from emp where ename=?',[user],(err,result)=>{
	if(err) throw err;
	console.log(result);
});


// 假设获取了前端请求的数据，格式为对象
var user = {
	ename:'tao',
	sex:1,
	birthday:'1973-7-11',
	salary:58000,
	deptId:30
}
// 插入员工表EmptyPacket
// insert into emp values(null,...);
pool.query('insert into emp values(null,?,?,?,?,?)',[user.ename,user.sex,user.birthday,user.salary,user.deptId],(err,result)=>{
	if(err) throw err;
	console.log(result);
});


pool.query('insert into emp set ?',[user],(err,result)=>{
	if(err) throw err;
	console.log(result);
});













