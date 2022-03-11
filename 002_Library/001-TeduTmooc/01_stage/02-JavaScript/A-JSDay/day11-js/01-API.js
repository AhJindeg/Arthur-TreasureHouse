/*
var arr = ['a','b','c'];

// 转字符串
console.log(arr.toString()); // 'a,b,c'

// 区分相同名字的api是不是同一个，根据前边对象是不是相同的数据类型
var num = 5;
console.log(num.toString());



var arr = ['a','b','c'];

// 转字符串，可以指定分隔符
console.log(arr.join('/'));




var arr1=['15','14','19'];
var arr2=['56','54','58'];
var arr3=['35','39','37'];

console.log(arr1.concat(arr2,arr3));




var arr = ['15','14','19','56','54','58','35','39','37'];

// 截取数组元素
console.log( arr.slice(1,4) );
console.log( arr.slice(-3) );


console.log( arr.splice(1,1) );
console.log(arr);







var arr = ['a','b','c','d','e','f','g','h'];
arr.splice(4,2);
arr.splice(4,1,'m');
arr.splice(1,0,'z');
console.log(arr);




var arr = ['a','b','c','d','e','f','g','h'];
arr.reverse();
console.log(arr);




var arr = [15,48,3218,18554,9612];
console.log( arr.sort( function(a,b){ return a-b; }));
console.log( arr.sort( function(a,b){ return b-a; }));




//console.log( arr.shift() );

// 检测数组是否有某个元素
var arr=['a','b','c'];
console.log(arr.indexOf('d'));


*/




var arr = ['和谐','友善','敬业','民主'];
if(arr.indexOf('爱国') === -1){
	arr.push('爱国');
}
console.log(arr);










