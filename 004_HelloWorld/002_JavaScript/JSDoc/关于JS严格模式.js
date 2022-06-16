/**
 * 严格模式
 * ES: ECMAScript
 * ECMA: 欧洲计算机组织--负责制定规则,所有计算机厂商都需要遵循这个规则, 才能互相合作
 * 标准会逐年更新, 弃用旧特性, 规避风险, 保持语言的先进性
 * ES3.1 -> ES5 : 没有 ES4修改过于极端,被抛弃了
 * 严格模式: 从ES5(ES 2009)开始推出的新特性, 用来解决旧版本代码中存在的各种风险
 * 所有框架默认都开 严格模式
 */
'use strict' //此代码以下的, 都会进入严格模式

/**
 * 意外的全局变量创建
 * 写错变量名的错误 过于常见
 * 作者想: 不写声明, 也能自动创建变量, 让程序员少写几个字母
 * servrname is not defined:
 * 在严格模式下, 就会禁用这种写法, 直接报错
 */

/**
 * 函数中的this指向
 * 严格模式下, 全局区的函数中的this 是 undefined
 * 防止直接调用函数 向window中注入属性, 导致的全局污染
 */
function DemoA(name) {
  // 函数中的this 代表其当前所在的对象
  // 直接调用 DemoA() 则, this是window
  console.log('this:', this)
  this.aname = name
  // 这里就相当于 window.aname = name
  // 此时就会意外创建 aname, 造成了全局变量污染
}
//构造函数使用时, 应该 new 触发, 返回对象
// var obj = new Demo("亮亮");
// 常见问题: 构造函数忘记写new
var xx = DemoA('王大猛')

/**
 * 静默失败
 * freeze: 冻结, 把对象冻结之后, 就不能修改了
 * 冻结objectB后 就不能修改了 所以操作会报错
 * 但是默认静默失败时不会有任何报错
 * 严格模式报错: Cannot assign to read only property 'age' of object
 */
let objectB = {
  name: '大猛',
  age: 19,
}
Object.freeze(objectB)
objectB.age = 88

/**
 * 严格模式: 淘汰了 callee
 * callee: 是 arguments 中的一个属性, 保存了当前执行的函数
 */
// 回调函数: 函数的内部调用自身, 形成一个循环的效果
function factorial(n) {
  if (n > 1) {
    return n * factorial(n - 1)
  }
  return 1
}
//计算 5! = 1 * 2 * 3 * 4 * 5
console.log(factorial(5)) //120
// 匿名函数自调用
// 在早期的JS中, 不支持命名函数的自调用, 只能是匿名函数自调用
var result = (function (n) {
  if (n > 1) {
    // callee: 代表当前正在执行的函数, 适合匿名函数的取用
    // 递归函数多次调用, 会多次创建 arguments 对象, 浪费内存!
    return n * arguments.callee(n - 1)
  }
  return 1
})(5)
console.log(result)
// 命名函数自调用, 古老的JS版本中不支持, 所以只能用 消耗极大的 callee 实现
// 自从有了 命名函数自调用写法, callee 就被淘汰了!
var result = (function a(n) {
  if (n > 1) {
    // callee: 代表当前正在执行的函数, 适合匿名函数的取用
    return n * a(n - 1)
  }
  return 1
})(5)
