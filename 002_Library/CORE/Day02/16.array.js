// 扩展Array的第三方框架:

//扩展一个方法: 计算数组中元素的总和
Array.prototype.sum = function () {
  // this 代表当前对象, 即数组本身
  var total = 0;
  // let: 块级作用域, 没有变量提升 -- 比var安全, 代替var
  for (let i = 0; i < this.length; i++) {
    const value = this[i]; //const: 常量--声明后不能修改, 安全,高效!
    total += value; //累加
  }
  return total;
};
