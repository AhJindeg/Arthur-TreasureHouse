/*

var d = new Date('2021/8/17 15:21:40');
// 转为本地字符串
console.log( d.toLocaleString() );
console.log( d.toLocaleDateString() );
console.log( d.toLocaleTimeString() );

// 设置
d.setFullYear(2024);
d.setMonth(0);
d.setDate(20);
//d.setDay(); // 没有此方法
d.setTime(1572364198120);

d.setMonth( d.getMonth()+3 );

console.log( d.toLocaleString() );

*/

var d = new Date('2021/8/17');

var b = new Date(d);
console.log( '入职时间：' + b.toLocaleDateString() );

var x = new Date(d);
x.setFullYear( x.getFullYear()+3 );
console.log( '到期时间：' + x.toLocaleDateString() );

var y = new Date(x);
y.setMonth( y.getMonth()-1 );
console.log( '续签时间：' + y.toLocaleDateString());







