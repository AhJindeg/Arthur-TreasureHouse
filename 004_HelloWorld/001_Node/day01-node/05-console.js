// console.log(1); // 打印/输出日志
// console.info(2); // 打印消息
// console.warn(3); // 打印警告
// console.error(4); // 打印错误

// 开始计时
console.time('tao');
for(var i=1; i<=100000; i++){
}
// 结束计时
console.timeEnd('tao');


console.time('i');
var i = 0;
while(i<100000 ){
    i++;
}
console.timeEnd('i');


console.time('a');
var a = 0;
do{
    a++;
}while(a<100000);
console.timeEnd('a');





