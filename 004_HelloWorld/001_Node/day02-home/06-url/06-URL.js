// 引入查询字符串模块
const querystring=require('querystring');
// URL
var str='http://www.codeboy.com:9999/prodcts.html?kw=戴尔';
// 解析为对象
var obj=new URL(str);
// console.log(obj.search);
// 获取传递的数据
// 截取查询字符串部分，解析为对象
var str2=obj.search.slice(1);
console.log(str2);
// 将查询字符串解析为对象
var obj2=querystring.parse(str2);
console.log(obj2);
