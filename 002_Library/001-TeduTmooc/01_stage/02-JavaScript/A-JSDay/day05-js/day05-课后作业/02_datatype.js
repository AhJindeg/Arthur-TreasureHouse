//// 数值型
//var n1=10;
//
//// 8进制
//var n2=010;
//
////16进制
//var n3=0xf;
//
//
//var b,c,d;
//b = 1 + 'ab';
//c = 2 + true;
//d = '3' + true;
//console.log(b,c,d);
//

//var a1 = parseFloat('3a');   // 3
//var a2 = parseFloat('3.14');   // 3.14
//var a3 = parseFloat('a3.14');   // NaN
//console.log(a1,a2,a3);

//var num = true;
//var str=num.toString();
//console.log(str,typeof str);

//console.log(2 == '2');
////console.log(2 === '2');
//
//console.log(3 > '10a');
//console.log(3 < '10a');
//console.log(3 == '10a');


//var salary = 7000;
//console.log(salary>=5000 && salary<=8000);

//var x = 'root ';
//var y = '123abc';
//console.log(x === 'root' && y === '123abc');


//var x = 'tao@tedu.cn';
//console.log(x === 'tao@tedu.cn' || x === 'dong'  || x === '18320353034');
//
//var year = 2021;
//var Ren = year % 4 === 0 && year % 100 != 0 || year % 4 === 0;

var year = 2020;
var Run = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
//var Pin = (year % 4 != 0 || year % 100 == 0) && year % 400 != 0;
Run && console.log(year + '年是闰年');
//Pin && console.log(year + '年是平年');


console.log(3 & 6 , 5 & 9 , 4 | 7 , 6 ^ 10);


