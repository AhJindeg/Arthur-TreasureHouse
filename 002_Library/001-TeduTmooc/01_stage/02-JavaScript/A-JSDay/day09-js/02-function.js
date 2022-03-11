// 全局污染：全局变量的出现带来的影响
// 解决全局污染：全都转为局部变量

// 轮播图1
(function(){
	// 函数作用域下，变量是局部变量
	var num = 1;
	console.log(num);
})();

// 轮播图2
(function(){
	var num = 3;
	console.log(num);
})();

// 轮播图3
(function(){
	var num = 5;
	console.log(num);
})();