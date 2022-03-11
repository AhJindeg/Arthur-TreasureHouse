/*

var arr=['WEB2107','WEB2106','WEB2105','WEB2104'];

for(var k in arr){
	console.log(k,arr[k]);
};

for(var n=0;n<arr.length;n++){
	console.log(n,arr[n]);
};


var emp=[89,98,65,79,52];
for(var n=0,sum=0;n<emp.length;n++){
	sum+=emp[n];
};
var esum=sum/emp.length;
console.log(sum);
console.log(esum);

*/

var emp=[89,98,65,79,52];
for(var n=0,max=emp[0];n<emp.length;n++){
	if(max < emp[n]){
		max = emp[n];
	};
};
console.log(max);







