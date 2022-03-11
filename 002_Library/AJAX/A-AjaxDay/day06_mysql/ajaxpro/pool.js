// 数据库相关的连接方法
// 1. 引入mysql模块
const mysql = require('mysql');
// 2. 创建连接池对象
const pool = mysql.createPool({
  // (1) 主机地址【域名或者ip地址】
  host:'127.0.0.1', 
  // localhost
  // (2) 端口号
  port:'3306',
  // (3) 用户名
  user:'root',
  // (4) 密码
  password:'',
  // (5) 数据库的名字【使用的数据库】
  database:'mydb',
  // (6) 连接池最大可连接数量
  connectionLimit:15
});

// 暴露模块
module.exports = pool;