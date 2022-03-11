/*

// 创建对象
var d1 = new Date('2021/8/17 11:24:30');
console.log(d1);


var d3 = new Date(121894181181424518);
console.log(d4);




var d = new Date('2021/8/17 11:50:30');
console.log(d.getFullYear());
console.log(d.getMonth()+1);
console.log(d.getDate());
console.log(d.getHours());
console.log(d.getTime()); // 计算距离计算机元年毫秒数
console.log(d.getDay()); // 0-6 对应 日-六





// 获取时间
var d = new Date();

// 将时间分别存储变量
var year = d.getFullYear();
var month = d.getMonth()+1;
var date = d.getDate();
var day = d.getDay();

// 判断是否小于10，拼接0
if(month < 10){
	month = '0' + month;
}
if(date < 10){
	date = '0' + date;
}

// 创建数组，对应星期
var arr = ['日','一','二','三','四','五','六'];

console.log('今天是' + year + '年' + month + '月' + date + '日 星期' + arr[day]);



*/
// 2021年9月1日

// 创建两个对象存储
var d1 = new Date();
var d2 = new Date('2021/9/1');

// 计算差值
var d = d2.getTime()-d1.getTime();

// 将单位转为秒
d = Math.floor(d/1000);

// 取余求时

var minute = Math.floor(d % 60 /60);
var hour = d % (24*3600);
hour = Math.floor(hour / 3600);
var day = Math.floor(d / (24*3600));



var second = d % 60;
var second2 = (d - second) % 3600 / 60;
var second3 = (d - second - second2 * 60) % 86400 / 3600;
var second4 = (d - second - second2 * 60 - second3 * 3600) % 2073600 / 86400;



console.log('距离2021年9月1日还有：' + second4 + '天' + second3 + '小时' + second2 + '分钟' + second + '秒');
console.log(day,hour,minute);































