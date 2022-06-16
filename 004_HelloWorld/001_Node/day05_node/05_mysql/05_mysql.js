// 引入mysql模块
const mysql = require('mysql');
// 创建连接对象
const c = mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'tedu'
});

// 测试链接
c.connect();


