/*

// 循环1-10之间的所有的整数
var i = 1;
while(true){
	console.log(i);
	if(i === 10){
		break;
	};
	i++;
};

*/

var i = 11;
var s = 1;
while(true){
	s *= i;
	if(i === 20){
		break;
	};
	i++;
};
console.log(s);
