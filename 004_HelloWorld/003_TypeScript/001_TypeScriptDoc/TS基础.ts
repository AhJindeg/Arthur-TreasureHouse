// Js 为弱类型语言：变量忽略类型，可以存储任意类型的值
// Ts 为强类型语言：一个变量一种类型，只能存储指定类型的值
// Ts需要编译为Js之后才可以执行 -在Ts文件夹下 cmd 执行 tsc 名字

/**
  字符串：string
  数字：number
  布尔：boolean
  任意类型：any
  多选类型: |
  数组类型：Array<类型名> | 类型名[]
  指定数据的元素个数及类型：[类型名，类型名，类型名]
 */

// 类型
let a: string = '33' // 字符串
let b: number = 44 // 数字
let c: boolean = true // 布尔类型
// any: 任意类型
let d: any
// 可选的符合类型 类型|类型
let e: number | string
// Array<类型名>:代表数组中都是指定类型的值
let f: Array<number> = [1, 2, 3]
// 简化：类型[]等价于Array<类型>
let g: number[] = [2, 3, 4]
// 指定数据的元素个数以及类型
let h: [number, string, boolean] = [18, 'king', true]
// 对象类型：
interface Boss {
  name: string
  age: number
  married: boolean
}
let mayun: Boss = {
  name: '马云',
  age: 56,
  married: true,
}
// function 函数名(参数:参数类型)：返回值类型{}
function showDisplay(name: string): string {
  return name.toUpperCase()
}
let res = showDisplay('mike')

// 函数的重载：根据参数数量不同/类型不同 执行不同的任务
// Ts可以规定 重载函数的具体参数信息
function pay(): void // void: 代表方法体没有返回值
function pay(moey: number): void
function pay(code: string, pwd: string): void
// 默认：pay() 刷脸支付
// pay(1000) 数字：代表现金支付
// pay(扫码，密码)：扫码支付
function pay(...args) {
  // ...: 新写法 剩余参数
  switch (args.length) {
    case 0:
      console.log('刷脸支付')
    case 1:
      console.log('现金支付')
    case 2:
      console.log('扫码支付')
  }
}
pay()
pay(1000) // 数字类型 --- 代表钱数
// pay(true) // 此写法参数明显错误
pay('扫码', '13134')
// pay(12, 123, 54, 233) // 重载没有针对4参数的代码

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

// 私有属性
// 在Ts语言中为属性提供了3种权限
// public：公开的
// protected：保护的
// private：私有的
class Father {
  public name = '亮亮' // 公开的名字
  protected money = '亮亮的钱' // 保护的钱
  private avi = '亮亮珍藏多年的小电影' // 私有的小电影
}
let fA = new Father()
fA.name
// f.money // 公共区域无法访问 类的保护属性
// f.avi // 公共区域无法访问 类的私有属性
class Son extends Father {
  show() {
    console.log(this.name)
    console.log(this.money) // 子类可以访问父类的保护属性
    // console.log(this.avi) // 子类无法访问父类私有的属性
  }
}

// 接口：interface
// 用途1：定制对象类型的结构 --- 03的例子
// 用途2：规定 类必须实现哪些方法
interface NvXu {
  maiFang(): void // 方法
  maiChe(): void // 方法
  money: number // 属性
}
// implements 实现
class Boy implements NvXu {
  maiChe() {
    console.log('82年的QQ')
  }
  maiFang() {
    console.log('天被地床')
  }
  money = 500
}

// 模块导出
// 方法1：一次性
// export default{}
// 对应的导入 import 自定义名称 from 文件
// 方式2：分别导出
// export xxx
// export xxx
// 使用时：import {xx,aa,bb} from 文件

// 模块导入
// import { mapGetters, mapMutaions, mapState } from ''
// mapGetters()
// mapMutaions()
// mapState()
