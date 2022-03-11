/*

function laba(){
	console.log('好家伙');
	console.log('我直呼好家伙');
};
laba();


function getSum(){
	for(var i = 1, sum = 0; i <= 100; i++){
		sum += i;
	};
	console.log(sum);
};
getSum();

function add(a,b){
	console.log(a+b);
};
add(1,2);

function getSum(a){
	for(var i = 1, sum = 0; i <= a; i++){
		sum += i;
	};
	console.log(sum);
};

getSum(3);
getSum(6);

function getRun(a,b){
	var a,b;
	var sum = 0;
	for(; a <= b; a++){
		if(a % 4 === 0 && a % 100 != 0 || a % 400 === 0){
			sum++;
		};
	};
	console.log(sum);
};
getRun(2000,2100);


function getMax1(a,b){
	
	var a, b, n;
	if(a < b){
		n = b;
	}else{
		n = a;
	};
	return n;
	
//	return a > b ? a : b;
};
var c = getMax1(3,5);
console.log(c);


function getMax2(a,b,c){
	var a,b,c;
	if(a > b && a > c){
		return a
	}else if(b > c){
		return b;
	}else{
		return c;
	};

	return a > b && a > c ? a : b (b > c ? b : c);

	var max = a > b ? a : b;
	return max > c ? max : c;
};
var d = getMax2(1, 2, 3);
console.log(d);


function getStatus(a){
	switch(a){
		case 1:
			return '等待付款';
			break;
		case 2:
			return '等待发货';
			break;
		case 3:
			return '运输中';
			break;
		case 4:
			return '已签收';
			break;
		case 5:
			return '已取消';
			break;
		default:
			return '无法追踪';
	};
};
var b = getStatus(1);
console.log(b);


function isPrime(i){
	for(var a = 2,i; a < i; a++){
		if(i % a === 0){
			return false;
		};
	};
	return true;
};
var p = isPrime(111);
console.log(p);

*/



function isRun(year){
	if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){
		return true;
	};
	return false;

	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
var rens = isRun(2020);
console.log(rens);


















































