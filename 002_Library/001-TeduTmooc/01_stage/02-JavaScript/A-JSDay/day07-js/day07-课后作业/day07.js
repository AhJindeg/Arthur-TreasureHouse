var i, str, j;
for(j = 1; j <= 9; j++){
	for(i = 1, str = ' '; i <= j; i++){
		str += i + ' * ' + j + ' = ' + i * j + '  ';
	};
	console.log(str);
};

var x = 111;
var z;
for(z = 2; z < x; z++){
	if(x % z === 0){
		console.log('该数不是一个素数：',x);
		break;
	};
	if(x === z + 1){
		console.log('该数是一个素数：',x);
	};
};

var x = 49;
var y = 0;
for(var z = 1; z <= x; z++){
	if(x % z === 0){
		y++;
	};
};
if(y === 2){
	console.log('该数是一个素数');
}else{
	console.log('该数不是一个素数');
};


