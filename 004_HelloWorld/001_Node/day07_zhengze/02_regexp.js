// 验证用户提供的手机号
// 定义规则
var p =/^1[3-9]\d{9}$/;
// 使用规则验证字符串
console.log(p.test('13403773138'));


// 查找并替换
// g 全局查找
// i 忽略大小写
var str = '有一天，东哥去涛哥家说：“我握草你卧槽个我操握草握草握草握草握草握草握草握草握草握草握草握草握草握草”。';
console.log( str.replace(/卧槽|握草|我操/ig,'**'));





