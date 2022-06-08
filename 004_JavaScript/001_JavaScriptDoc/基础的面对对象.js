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
