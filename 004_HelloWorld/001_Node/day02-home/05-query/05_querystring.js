// 引入查询字符串模块
const querystring=require('querystring');
// // console.log(querystring);
// // 查询字符串
// var str = 'kw=华硕&price=5000';
// // 解析为对象
// var obj = querystring.parse(str);
// console.log(obj);


var str = 'user=admin&password=123456';
var obj = querystring.parse(str);

console.log(`登录成功，欢迎：${obj.user} 当前密码：${obj.password}`);
