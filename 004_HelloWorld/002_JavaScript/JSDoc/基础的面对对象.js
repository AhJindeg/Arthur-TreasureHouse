/**
 * JS的数据类型有8种 -基础类型 -对象类型
 * 基础类型: number string boolean null undefined + bigint symbol
 * 对象类型: 1类 -例如: {} [] Date Math...
 * 对象是引用类型, 基础类型是数值类型
 * 所有的变量都是存储在内存中
 */

// 普通对象: 所有属性名都需要自己分配
var eric = {
  name: 'Eric',
  desc: function () {
    console.log('我是Eric!')
  },
}
console.log(eric.name)
eric.desc()

/**
 * 数组对象: 一个特殊的对象
 * 特点: 自动为每个 元素分配属性名, 从0开始
 * 数组中都是数字下标的: 称为 索引数组
 * 关联数组: 属性名可以不叫1 2 3 4... 自己起名字
 */
// 要先声明是 [] or {}
let skills = []
skills['teacher'] = '亮亮'
console.log(skills)
console.log(skills['teacher'], skills.teacher)

/**
 * 对象类型太大了, 只能放在 专门的 堆内存 中存储
 * let a=[1,2,3]; b = a; a.push(3)
 * 例如：a的是地址 0x123123
 * 把数组a在堆内存中的地址, 赋值给b
 * a和b 保存的是 对象的地址, 是同一块内存
 * 此时改变a b也会同时改变
 */

/**
 * 克隆/复制 一个新的对象 给变量, 则需要克隆操作
 *  - 创建一个新的 空白对象
 *  - 把旧对象的内容 挨个复制到新对象里
 */
function clone(old_obj) {
  var new_obj = {} //制作一个空白的
  // 遍历旧对象 for...in...
  for (var name in old_obj) {
    //通过属性名读值
    var value = old_obj[name]
    // console.log(name, value);
    console.log(`old_obj["${name}"]:`, value)
    // 读取了旧数组的属性名和值, 存放到新数组中
    new_obj[name] = value
  }
  return new_obj //返回新对象
}
let xx = clone(aa)

/**
 * 配置对象属性 defineProperty
 * 对象的每个属性, 额外有几个选项: 可写, 可配置, 可遍历
 * 参数1: 要修改的对象
 * 参数2: 要修改的属性名, 必须是字符串格式
 * 参数3: 要修改的具体配置
 */
let objectA = {
  id: 1024,
  name: 大猛,
  age: 18,
}
Object.defineProperty(objectA, 'id', {
  writable: false, // 是否可写
  configurable: false, //是否可重新配置
  enumerable: false, //是否可遍历
})

/**
 * 添加对象属性
 * 新增id属性, 默认值 1001, 不可写 不可重新配置 不可遍历
 * 默认值：value
 */
var objectB = {
  name: '亮亮',
  age: 33,
}
Object.defineProperty(objectB, 'id', {
  value: 1001, //默认值
  writable: false,
  configurable: false,
  enumerable: false,
})
console.log(objectB)

/**
 * 配置多个对象属性
 * id不可修改, 配置不可改
 * 新增 name属性, 默认值:大猛, 不可修改,配置不可改
 * 薪资 salary属性 默认值9999, 不能改 不能配置 不能遍历
 */
let objectC = {
  id: 100,
}
Object.defineProperties(objectC, {
  id: { writable: false, configurable: false },
  // 用 此方式添加新的属性, 所有的默认值都是false
  name: {
    value: '大猛',
    // 默认值是false, 所以下方两行可以不写, 效果也一样!
    writable: false,
    configurable: false,
    // 如果不主动声明 可以遍历, 则默认是不可遍历
    enumerable: true,
  },
  salary: {
    value: 9999,
    writable: false,
    configurable: false,
    enumerable: false,
  },
})
console.log(objectC)
for (var name in objectC) {
  console.log(name) //salary 不可遍历, 不可见
}
objectC.id = 2222

/**
 * getter: 计算属性
 * 计算属性get  跟 value/writable 配置项是互斥的
 * get: 获取,  当读取一个属性时, 会自动触发 get属性的函数, 把此函数的返回值 作为属性的值
 * 语法糖写法, 固定格式,  计算属性
 * 使用时: 对象.area 与函数方法少写()
 */
// 矩形:
let Wha = {
  width: 100,
  height: 40,
  get sum() {
    return (this.width + this.height) * 2
  },
}
Object.defineProperty(Wha, 'area', {
  get: function () {
    console.log('有人要读取面积!')
    return this.width * this.height
  },
})
console.log(Wha.area)
console.log(Wha.sum)

/**
 * 赋值监听 setter
 * set: 用来监听属性的赋值
 * 修改属性的 set, 在此方法中接受赋值, 然后对值进行检测, 如果正确才赋值-- 此处不能给当前属性赋值, 会无限循环 -- 此处必须额外声明一个变量, 来存储值
 * 读取时, 再通过 get 方法, 来返回那个存值的变量
 */
let meng = {
  name: '大猛',
  age: 18,
}
// 生成一个额外的变量, 来保存age的值, 防止下方的无限循环
//__没有特殊作用, 习惯上把这种专门负责保存 set 方法设定的属性值的额外属性, 加__前缀, 以示特殊!
let __age
// 要求：大猛年龄范围是1-100 超过就报错
Object.defineProperty(meng, 'age', {
  // 赋值,设置值: set
  set: function (value) {
    if (value >= 1 && value <= 100) {
      __age = value //赋值, 会触发 age 的set方法
    } else {
      throw Error('年龄范围错误: ' + value)
    }
  },
  // 读取时 返回 __age 的值, 这个变量的值是 set 设置的
  get: function () {
    return __age
  },
})
meng.age = 50 //应该报错!
console.log(meng.age) //触发get
// 匿名函数自调用, 就可以形成一个 闭包作用域
// set 和 get 方法都存储在 meng, meng 在window里
;(function () {
  let __salary
  Object.defineProperty(meng, 'salary', {
    get: function () {
      return __salary
    },
    set: function (value) {
      if (value >= 1000 && value <= 100000) {
        __salary = value
      } else {
        throw Error('薪资范围错误' + value)
      }
    },
  })
})()
meng.salary = 11250 //正常
console.log(meng.salary)

/**
 * setter 语法糖
 * __age: 应该是一个不可遍历的属性, 藏起来, 是搭配age使用的附庸产物
 * 默认 使用此方式新增的属性, 所有配置项都是false, 即 不可写, 不可遍历, 不可重新配置.   此处的__age 应该是可写的才能存储值
 */
let daMeng = {
  name: '大猛',
  set age(value) {
    if (value >= 1 && value <= 100) {
      // var a = {}; a.__age = 3;
      // 就会在当前对象中自动创建__age属性
      this.__age = value
    } else {
      throw Error('年龄范围错误!')
    }
  },
  get age() {
    return this.__age
  },
}
Object.defineProperty(daMeng, '__age', { writable: true })
daMeng.age = 50
console.log(daMeng)
