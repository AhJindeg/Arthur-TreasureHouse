/*

// 全局作用域下
// 全局函数
function fn(){
	
};

function fun1(){
	// 局部函数
	function fun2(){
		console.log('a');
	};
	fun2();
};
fun1();
// 全局作用域下调用局部函数
fun2(); // 报错

*/

foo();
function foo(){
	console.log();
};
