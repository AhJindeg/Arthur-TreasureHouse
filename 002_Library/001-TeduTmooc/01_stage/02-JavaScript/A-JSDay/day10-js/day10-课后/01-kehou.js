// 冒泡排序
var arr = [258,168,1204,784,26,519];

function MaoPaopaixu(arr){
	var temp = [];
	for(var i = 0; i < arr.length-1; i++){
		for(var j = 0; j < arr.length-1-i; j++){
			if(arr[j] > arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}

		}
	}
	return arr;
}

console.log( MaoPaopaixu(arr) );




















// 倒序输出
var array=[125,541,15,845];

function DaoXu(){
	var temp = [];
	for(var i = 0; i < array.length/2; i++){
		temp = array[i];
		array[i] = array[array.length-1-i];
		array[array.length-1-i] = temp;
	}
	return array;
}

console.log( DaoXu(array) );

// 翻转
var arrb = [12,84,61,85];

// 声明变量空数组
var arrba = [];
for(var i=0; i<arrb.length; i++){
	// 倒序元素下标 = 数组长度-i-1
	// 把倒着的元素放入新数组
	arrba[i] = arrb[arrb.lenth-i-1];
}
console.log( arrba )
