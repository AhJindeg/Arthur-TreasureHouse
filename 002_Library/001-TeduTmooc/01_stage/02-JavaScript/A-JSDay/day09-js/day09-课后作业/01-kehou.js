function getCheng(n){
	if(n === 1){
		return 1;
	};
	return n * getCheng(n-1)
};
console.log( getCheng(5) );