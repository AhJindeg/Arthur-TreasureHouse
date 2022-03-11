// 链接sql
const mysql = require('mysql');
const pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'',
	database:'xz',
	connectionLimit:15
});

// 导出连接池对象
module.exports = pool;