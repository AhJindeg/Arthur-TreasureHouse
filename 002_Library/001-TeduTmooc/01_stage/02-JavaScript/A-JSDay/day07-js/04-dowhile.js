/*

var i = 1;
do{
	console.log(i);
	i++;
}while(i<=10);

// 练习：打印40-30之间所有的整数

var i=40;
do{
	console.log(i);
	i--;
}while(i>=30);

var i = 1;
do{
	if(i % 2 === 0){
		console.log(i);
	};
	i++;
}while(i <= 10);

var i = 1;
var sum = 0;
var x = 0;
do{
	if(i % 3 === 0){
		sum += i;
		x++;
	};
	i++;
}while(i <= 100);
console.log(sum);
console.log(x);


*/


var i = 0.0001;
var x = 0;
do{
	i *= 2;
	x++;
}while(i <= 8848);
console.log(x);

