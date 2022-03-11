function tao(madai){
	console.log('涛哥开始跑第一棒');
	console.log('涛哥到达第一棒终点');
	// 实参会赋值给形参
	// madai = dong
	// 通过参数madai来调用传递的函数
	madai(); // dong()
};
function dong(){
	console.log('东哥开始跑第二棒');
	console.log('东哥到达终点');
};
// 函数dong作为参数传递，叫做回调函数
tao( dong );

tao( function(){
	console.log('陌生人开始跑...');
});



