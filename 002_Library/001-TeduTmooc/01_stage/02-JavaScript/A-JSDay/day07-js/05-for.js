/*

// 循环打印1-10之间所有整数
var i;
for(i = 1; i <= 10; i++){
	console.log(i);
};


var i;
for(i = 80; i <= 100; i += 5){
	console.log(i);
};

var i;
var sum = 0;
for(i = 1; i <= 100; i++){
	if(i % 7 === 0){
		sum += i;
	};
};
console.log(sum);

var i = 2000;
var x = 1;
for(i;i <= 2100; i++){
	if(i % 4 === 0 && i % 100 != 0 || i % 400 === 0){
		console.log(i);
		if(x === 10){
			break;
		};
		x++;
	};
};

*/




var i, str;
for(i = 1, str = ' '; i <=5; i++){
	str += i + '*5=' + (i * 5) + ' ';
};
console.log(str);




