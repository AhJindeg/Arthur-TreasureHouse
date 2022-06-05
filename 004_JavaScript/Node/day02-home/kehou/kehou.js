// 练习：使用周期性定时器每隔2秒打印'hello'，打印3次后清除定时器
var count = 0;
var time = setInterval(()=>{
	console.log('hello');
	count++;
	// 判断是否为3次
	if(count == 3){
		clearInterval(time);
	};
},2000);

