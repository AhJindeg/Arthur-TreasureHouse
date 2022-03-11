/*

// 原始类型
var a=1;
var b=a;
a=2;
console.log(b);

// 引用类型
var tao={
	size:'XXL',
	color:'绿色'
}
var dong=tao;
dong.size='XXXL';
dong.color='red';

console.log(tao.size);


// 销毁引用类型：数据不被任何的地址引用就会销毁
// null是空地址，不指向任何堆内存的数据
// 只需要赋值为null就不再指向之前引用类型的数据
fn = null;

*/

var obj={
	num:1
}

function fun(o){
	// 把obj的地址赋给o，两者都会指向相同的对象
	// o=obj
	o.num=2;
}
// 调用函数，传递的obj对象的地址
fun(obj);
console.log(obj);


var n1='tao';
var n2='dong';
















