// 对象类型：
// interface接口
let Boss = {
  name: "文华",
  age: 39,
  married: true,
}
// 问题：如何描述这个 对象类型的 结构？
interface Boss {
  name: string
  age: number
  married: boolean
}
// 创建一个 Boss 类型的对象
let mayun: Boss = {
  name: "马云",
  age: 56,
  married: true,
}
