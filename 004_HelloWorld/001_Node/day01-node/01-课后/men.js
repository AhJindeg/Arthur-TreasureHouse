// 引入同一级目录下01-kehou.js模块
var mm = require('./men.js');
console.log(mm);

// 调用导出的函数
console.log(mm.len(5).toFixed(2));
console.log(mm.area(5).toFixed(2));