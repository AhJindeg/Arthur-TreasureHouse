const fs = require('fs');
// 创建可读取的流，内部会分段读取文件
var rs = fs.createReadStream('./1.zip');

// 创建可写入的流
var ws=fs.createWriteStream('./2.zip')

// 把读取的流通过管道添加到写入的流
rs.pipe(ws);







// 获取读取每一段数据，通过事件的方式
// on(事件名称，回调函数) 添加事件
// 事件名称是字符串形式，固定的写法
// data 一旦有数据流入到内存，把数据放入到回调函数中
var count = 0;
rs.on('data',(chunk)=>{
	// chunk 就是获取的分段数据
	// console.log(chunk);
	count++; // 每获取一段数量加一
});
console.log(count);
// 添加事件，监听是否读取结束
// 一旦读取结束，自动调用回调函数
rs.on('end',()=>{
	
});


