/**
 * 构造函数: 创建一类固定结构的对象
 * 系统的构造函数: new Number(); new Date(); new String()...
 * 构造函数的名字需要 大驼峰命名法 与 普通函数区分
 * 构造函数使用时, 必须使用new前缀, 系统才会按照构造函数进行处理
 *  - new: 称为 实例化 操作
 */

// 矩形对象:
let r1 = {
  width: 50,
  height: 10,
  area: function () {
    return this.width * this.height //面积
  },
  zc: function () {
    return (this.width + this.height) * 2 //周长
  },
}
console.log(r1.area())
console.log(r1.zc())
// 转换为一个通用的构造函数
function Rectangle(width, height) {
  // this: 当前对象, 在构造函数中就代表 即将创建出来的对象
  // this: 代表是对象中的
  // 不加this: 普通 var 出来的
  this.width = width
  this.height = height

  this.area = function () {
    return this.width * this.height
  }

  this.zc = function () {
    return (this.width + this.height) * 2
  }
}
// 最终效果:
let r2 = new Rectangle(20, 100)
console.log(r2.area())
console.log(r2.zc())

/**
 * 对象的原型: __proto__
 * 不同的浏览器 打印的变量名不同
 *  -google: [[Prototype]]
 *  -firefox: <prototype>
 *  -360 : __proto__
 * JS引擎处理方式: 如果对象调用一个方法/属性, 对象本身没有, 就会自动到 对象.__proto__ 中查找!
 * 任何一个对象 都应该具有很多默认的功能, 这些默认的功能都存储在__proto__中
 * 当对象调用一个功能时, 先检查自身有没有, 如果没有就会到 __proto__ 中查找!
 * 在 JAVA中, 原型就相当于 父类, 称为 继承效果
 * 原型类似于 遗传:  构造出来之后 要携带一些 默认的功能, 都存储在原型中
 */
let obj = new Object() //等价于 {} --字面量
console.log(obj.__proto__)
console.log(obj.toString == obj.__proto__.toString) //true
// 如果对象中有 toString 会怎么样??
obj.toString = function () {
  return '我是空对象!'
}
console.log(obj.toString()) // 我是空对象!

/**
 * 构造函数的原型
 * 构造函数在制造对象的时候, 默认会把一个原型注入到 对象中
 * 构造函数自带原型对象, 默认是Object
 * 为了区分原型所在位置: 构造函数中叫prototype, 对象中叫 __proto__
 */
function Teacher(name) {
  this.name = name
}
console.log(Teacher.prototype)
var t1 = new Teacher('王大猛')
console.log(t1.__proto__)
console.log(t1.__proto__ == Teacher.prototype) //true

/**
 * 操作原型
 * this.__proto__.phone = "10086"
 * 构造函数隐式会声明一个 __proto__ 变量:  是对象类型
 * 其中会存放当前的构造函数本身  constructor :构造
 * 原型的作用: 构造函数中不变化的内容(函数基本都不变), 推荐放在原型中存储,  每次new的时候 就不会创建新的函数, 节省内存空间!
 */
function JuXing(kuan, gao) {
  this.kuan = kuan
  this.gao = gao
}
// 通常在构造函数的外部操纵原型
let t3 = new JuXing(20, 30)
console.log(t3)
JuXing.prototype.mianJi = function () {
  return this.kuan * this.gao
}
let t4 = new JuXing(50, 60)
console.log(t4.zhouChang)

/**
 * 原型链: prototype chain
 * 对象在使用一个属性时, 会依次查找所有的 __proto__ 直到找到为止!
 * 与 作用域链是同样的道理 都是就近原则!
 * 原始对象 是系统书写的, 就是最根, 原生对象就没有__proto__ 了
 */
function Demo(name) {
  this.name = name
}
let d = new Demo('我是王大猛')
console.log(d)
console.log(d.toString())
console.log(d.__proto__) //自定义对象的原型
console.log(d.__proto__.__proto__) // 原型的原型就是Object 是最基础的对象类型
console.log(d.__proto__.__proto__.__proto__) //系统提供的Object 的原型 是null

/**
 * 原型的用途:  可以扩展 系统的构造函数
 */
let nums = [123, 134, 435, 56] //字面量
Array.prototype.sum = function () {
  // this 代表当前对象, 即数组本身
  let total = 0
  for (let i = 0; i < this.length; i++) {
    const value = this[i] //const: 常量--声明后不能修改, 安全,高效!
    total += value //累加
  }
  return total
}
console.log(nums.sum())
