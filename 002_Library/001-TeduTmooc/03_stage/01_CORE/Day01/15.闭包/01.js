// 亮亮书写的代码:
// JS一共就两个作用域:
// 共享的window全局作用域 和 私有的函数作用域
// 考虑把变量放在函数中声明, 就可以避免全局声明的尴尬--覆盖
// 此函数没有特殊作用, 就是为了要一个作用域: 所以他连起名的资格都没有
// 用匿名函数:  函数必须调用 才能执行内部代码, 下方是 匿名还是的自调用
// (匿名函数)()
var name = "3333333333";
(function () {
  // JS引擎非常现实:  只有有用的东西 才会保存下来, 否则会统统删除
  var name = "亮亮";

  function show() {
    console.log(name);
  }
  // window一直存活, 把show保存给window, show就能活下来
  // show函数中 使用了name 变量,  name有用, 就会活下来
  window.lalala = show;
  // 不保存到window 就无法调用show
  // 因为只能调用 window 中的内容
})();

// show();
