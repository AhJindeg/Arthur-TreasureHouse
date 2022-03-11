/*



// 满30减20

// 总价
var total = 32;

// 判断是否满30
if(total >= 30){
	// 在原来基础上减20
	total -=20;
};
console.log(total);



// 练习：判断一个年份是否为闰年
var year = 2020;
if(year%4 ===0 && year%100 !=0 || year%400 === 0){
	console.log('run');
}else{
	console.log('ping');
};



// 练习：声明一个变量保存个人的签名内容，如果有签名内容为空，设置默认签名'这家伙很懒什么也没留下'，最后打印签名
var ming = '爱意随风起，风止意难平。';
var kong = '这家伙很懒什么也没留下';
if(ming == ''){
	console.log(kong);
}else{
	console.log(ming);
};


*/


var n1 = 2 || 3;
var n2 = 1 && 2;
var n3 = 'a' && 'b';
console.log(n1,n2,n3);




