/**
 * JS 一共两种作用域：
 * 1. 共享的window全局作用域
 * 2. 私有的函数作用域
 */

/**
 * 作用域：scope
 * 闭包：closure <闭包是JS独有的>
 * JS函数的特殊设计 -函数在声明时会保存其所在的此法环境
 * 在公共区域声明的 变量/函数 都会自动存储在 window 中
 */

// 声明了函数 -> 然后调用了一次, 单纯为了触发内部的 aaShow 的赋值
function xxx() {
  var name = '222'
  function bbb() {
    var age = 33
    window.aaShow = function () {
      console.log(name, age)
    }
  }
  bbb()
}
xxx() //调用才能触发函数体内容的执行，实现aaShow的赋值操作
aaShow() // 相当于 window.aaShow()

/**
 * 闭包的 非简化写法:
 * 闭包: 封闭的包围  本质就是 函数的 {}
 * 匿名函数自调用:  (匿名函数)()
 * 匿名函数自调用: 可以少声明一个函数 ashow, 节省空间
 * 闭包的本质: 提供了一个独立的函数作用域
 */

var name = '全局范围'
// 1.声明闭包  2.闭包内声明变量  3.闭包返回一个函数,函数中使用变量 4.用变量存储这个返回的函数
var aShow = (function () {
  var name = '闭包内的name'
  return function () {
    console.log(name)
  }
})() //自调用是为了完成 aShow的赋值过程
aShow()
