/*

function fn(){

};
// 匿名函数创建函数
// 变量名称就是函数名称
var fun = function(){
	console.log(1);
};
// 调用函数
fun();
console.log(fun);
console.log(fn);

*/

/*

// 函数最先提升，然后变量提升
// 如果函数名称和变量名称相同，变量就不再提升了
// var c = function(){}; 
var c = 2; // 重新给c赋值

function c(){
	console.log(3);
};
c(); // 报错，c不是一个函数


*/


var HanSu = function (a,b){
	for(var sum = 0; a <= b; a++){
		sum += a;
	};
	return sum;
};
console.log( HanSu(2,5) );





