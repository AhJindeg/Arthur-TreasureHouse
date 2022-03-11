/*

// 判断一个人是否为成年人
var age = 19;
if(age >= 18){
	console.log('成年人');
}else{
	console.log('未成年人');
};


// 练习：声明变量分别保存用户输入用户名和密码，如果用户名和root，并且密码是123456，打印‘登陆成功’，否则打印‘登陆失败’
// 使用if-else和三目运算符两种方法
var x = 'root';
var y = '123456';
if(x === 'root' && y === '123456'){
	console.log('登陆成功');
}else{
	console.log('登陆失败');
};

x === 'root' && y ==='123456' ? console.log('登陆成功') : console.log('登陆失败');


*/

var sex = 1;
if(sex === 1){
	console.log('男');
}else{
	console.log('女');
};

sex === 1 || sex === 0 ? console.log('男') : console.log('女');
