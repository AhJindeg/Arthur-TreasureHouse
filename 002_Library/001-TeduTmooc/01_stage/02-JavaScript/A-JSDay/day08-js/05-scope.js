/*

// 全局作用域
// 全局变量
var a = '北京市城管';

function shi(){
	// 函数作用域
	// 局部变量
	var b = '石景山城管';

	// 在函数中访问全局变量

};

function hai(){
	// 函数作用域
	// 局部变量
	var c = '海淀城管';
};


var n1 = 2;
function fn(){
	n1 = 3;
	var n2 = 5;
};
fn();
console.log(n2);


function fun(){
	var n1 = n2 = n3 = 2;
};
fun();
console.log(n3);
console.log(n2);
console.log(n1);

*/


function fn(){
	console.log(b);
	var b = 2;
};
fn();

var c = 3;
function foo(){
	console.log(c);
	var c = 5;
};
foo();

function boo(n){
	// 形参n属于是局部变量，只能在当前函数作用域下访问到
};
boo(5);

var m = 7;
function bar(m){
	m = m + 3;
};
bar(1);
console.log(m);




