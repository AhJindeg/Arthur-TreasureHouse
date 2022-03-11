console.log(Math.PI); // 圆周率

// 绝对值 absolute
console.log(Math.abs(21-23)); // 绝对值

// 取整
console.log(parseInt(3.14));
// 向上取整
console.log(Math.ceil(3.14));
// 向下取整
console.log(Math.floor(3.94));
// 四舍五入取整
console.log(Math.round(6.49));

// 次方(次幂)
console.log(Math.pow(5,2));

// 查找一组数字的最大值
console.log(Math.max(23,45,19,34));
// 查找一组数字最小值
console.log(Math.min(23,45,19,34));


// 随机
console.log(Math.random());





var arr=['wq','ew','das','fsd','bc','hf','ytu','rt','ki','gfd'];

var n = Math.floor(Math.random()*10);

console.log(n,arr[n]);




var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var arr2 = [];
for(var j = 0; j < 4; j++){
	var i = Math.floor(Math.random()*arr.length);
	arr2.push(arr[i]);
	arr.splice(i,1);
}
console.log(arr2);
console.log(arr);






