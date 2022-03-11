// 首字母大写 其余字母小写
var str = 'hOw aRE yoU';

// 字符转数组
var arr = str.split(' ');

//遍历数组，分词
for(var i= 0; i<arr.length; i++){
	// 截取首个字母
	var f = arr[i].substr(0,1).toUpperCase();

	// 截取剩余字母
	var o = arr[i].substr(1).toLowerCase();

	// 转换 拼接
	arr[i] = f + o;
};

console.log(arr.join(' '));