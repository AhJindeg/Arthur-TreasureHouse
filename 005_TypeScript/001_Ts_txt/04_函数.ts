// 丰富的提示
// Ts指定 参数类型 内部使用时 有代码提示
//
// function 函数名(参数:参数类型)：返回值类型{}
function show(name: string): string {
  return name.toUpperCase()
}

let res = show("mike")
