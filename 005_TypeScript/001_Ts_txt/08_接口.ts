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
    console.log("82年的QQ")
  }
  maiFang() {
    console.log("天被地床")
  }
  money = 500
}
