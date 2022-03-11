/*

var count = 0; // 记录次数
function fn(){
	console.log('从前有座山');
	// 递归,计算递归次数
	ciunt++;
	// 每一次记录，判断是否为3
	if(count === 3){
		return;
	};
	fn();
};
fn();

var count = 0;
function fun(){
	count++;
	// 边界条件
	if(count === 4){
		return 1;
	};
	// 递归
	// 拿到返回的值以后，会不断往上一层传递
	return fun() + 1; // 拿到值以后，加一往上传
};
console.log( fun() );

*/


function getSum(n){
	// 边界条件
	if(n === 1){
		return 1;
	};
	// 递归：返回n + 前n-1个数的和
	return n + getSum(n - 1);
};
console.log( getSum(5) );

function fib(n){
	// 边界条件
	if(n === 1 || n === 2){
		return 1;
	};
	// 递归
	return fib(n-1) + fib(n-2);
};
console.log( fib(7) );






