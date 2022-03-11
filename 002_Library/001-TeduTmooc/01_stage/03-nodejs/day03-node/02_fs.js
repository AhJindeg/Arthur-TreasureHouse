// 引入文件系统模块
const fs = require('fs');

// // 1.查看文件的状态
// var s = fs.statSync('./01_homework.js');
// console.log(s);

// // 查看文件形式
// console.log(s.isFile());

// // 查看目录形式	
// console.log(s.isDirectory());

// // 异步
// fs.stat('../day03-node',(err,s)=>{
// 	// console.log('秘书的工作结果');
// 	if(err){
// 		// err:可能产生的错误结果
// 		throw err;
// 	}
// 	// s:成功的结果
// 	console.log(s);
// });

// 2.创建目录

// // 同步
// fs.mkdirSync('./mydir');

// // 异步
// fs.mkdir('./mydir2',(err)=>{
// 	if(err){
// 		throw err;
// 	};
// 	console.log('创建成功');
// });

// // 移除目录

// // 同步
// fs.rmdirSync('./mydir');

// // 异步
// fs.rmdir('./mydir2',(err)=>{
// 	if(err){
// 		throw err;
// 	}
// });


// 4.读取目录

// // 同步
// var arr = fs.readdirSync('../day03-node');
// console.log(arr);

// 异步
// fs.readdir('../day03-node',(err,arr)=>{
// 	if(err){
// 		throw err;
// 	};
// 	console.log(arr);
// });


// 5.写入文件
// fs.writeFileSync('./1.txt','涛哥\n');
// fs.writeFile('./2.html','WEB2107',(err)=>{
// 	if(err) throw err;
// 	console.log('写入成功');
// });


// 6.追加
// fs.appendFileSync('./1.txt','6789');

// var srt = ['qw','qe','qr','qt'];
// for(var i = 0; i<srt.length; i++){
// 	console.log(srt[i]);
// 	fs.appendFile('./stu.txt',srt[i]+'\n',(err)=>{
// 		if(err) throw err;
// 	});
// }

// 7.读取文件
// var date = fs.readFileSync('./1.txt');
// // 格式为buffer
// console.log(date.toString());

// var datt = fs.readFile('./1.txt',(err,datt)=>{
// 	if(err) throw err;
// 	console.log(datt.toString());
// });


// 8.删除文件
// fs.unlinkSync('./1.txt');
// fs.unlink('./2.html',(err)=>{
// 	if(err) throw err;
// });

// 9.检测文件是否存在
// console.log(fs.existsSync('../day02'));

// if(fs.existsSync('./stu.txt')){
// 	fs.unlinkSync('./stu.txt');
// }

// if(fs.existsSync('./mydir')){
// 	fs.unlinkSync('./mydir');
// }else{
// 	fs.mkdirSync('./mydir');
// }

// if(!fs.existsSync('./mydir')){
// 	fs.mkdirSync('./mydir');
// }

// 10.拷贝文件
fs.copyFileSync('./02_fs.js','./mydir/66.js');


console.log('结束');