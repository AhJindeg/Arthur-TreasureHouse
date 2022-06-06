// 函数: 函数就是把一大段重复的代码, 封装在{}中, 起个名字.

// 利用函数封装: 把代码放 {} 里, 然后起个名字
function getSum() {
  var sum = 0
  for (var i = 1; i <= 100; i++) {
    sum += i
  }
  return sum //返回结果给调用者
}
getSum()

// 函数中的 argument 属性
Math.max(12, 3, 4, 4, 45, 34534, 345)
// 实例：
function max() {
  // 函数内部自带一个 arguments<Array> 属性， 其中保存所有传入的参数
  let num_max = arguments
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
    // 求最大值
    if (arguments[i] > num_max) num_max = arguments[i]
  }
}

/**
 * 函数重载 overload
 * 一个函数接受不同数量/类型的参数, 则执行不同的操作
 * 在JS中官方不提供专业的函数重载写法, 需要我们自己来实现
 */
function getSum() {
  switch (arguments.length) {
    // 输出 ‘’
    case 0:
      console.log('')
      break
    // 求平方
    case 1:
      console.log(arguments[0] ** 1)
      break
    // 求和
    case 0:
      console.log(arguments[0] * arguments[1])
      break
  }
}
getSum()
getSum(5)
getSum(5, 8)

/**
 * 变量作用域: 共有两个位置
 * 1.全局区域: -- window内部, 公共的
 * 2.函数区域: -- 函数内部, 私有的
 */
// 直接在 script 范围中声明的都在公共区域
let a = 10
function show() {
  // 函数内部具有自身的作用域
  // 当一个变量, 在全局区域存在, 函数内部也存在, 则优先使用函数内部的 --- 就近原则
  let a = 5
  console.log(a)
}
show()

// 作用域链: 就近原则 一层层向上找
function show2() {
  let a = 'show2'
  function show3() {
    // let a = "show3";
    function show4() {
      // let a = "show4";
      function show5() {
        // let a = "show5";
        console.log(a)
      }
      show5()
    }
    show4()
  }
  show3()
}
show2()
