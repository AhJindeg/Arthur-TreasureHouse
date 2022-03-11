// 面向对象 OOP
// 三大特征：封装 继承 多态
class Student {
  // 在Js中 this.xx = ?? 如果xx不存在 会自动声明
  // Ts为了安全考虑 只能对已有的属性进行赋值
  sname: string
  sage: number

  // 构造方法, new 时触发 生成对象
  constructor(sname: string, sage: number) {
    this.sname = sname
    this.sage = sage
  }
}
