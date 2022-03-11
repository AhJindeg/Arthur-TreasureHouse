/*

var str = '涛哥is playing 单杠';
console.log(str.length); // 字符串长度
console.log( str.charAt(0),str[0] ); // 通过下标找字符





var str = 'javascript';
for(var i=0,count=0; i<str.length; i++){
//	console.log(str.charAt(i));
	if(str[i] === 'a'){
		count++;
	}
}
console.log(count);
console.log();






var email = 'taosang#tedu.cn';
if(email.indexOf('@') !== -1){
	console.log('111');
}else{
	console.log('222');
}





var str = 'JavaScript';

console.log(str.toUpperCase());

console.log(str.toLowerCase());





var str = 'javascript';
// 截取字符串
console.log( str.slice(4) );
console.log( str.slice(4,7) );







var em = 'tao@tedu.cn';
var emm = 'dong@sina.com';
var emBiao = em.indexOf('@');
var emJie = em.slice(0,emBiao);
var emYu = em.slice(emBiao+1);

console.log(emJie);
console.log(emYu);






var shen = '41237920020110001X';
var y = shen.substr(6,4);
var m = shen.substr(10,2);
var d = shen.substr(12,2);
var n = shen.substr(-2,1);
var dab;
 
if(n%2===0){
	dab = '女';
}else{
	dab= '男';
}
console.log(y+'年'+m+'月'+d+'日'+' 性别'+dab);





*/


var HouZhui = 'web.js.2017.0120.jpg';
var a = HouZhui.split('.');
console.log(a);



