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
