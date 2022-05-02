// 函数的重载：根据参数数量不同/类型不同 执行不同的任务
// Ts可以规定 重载函数的具体参数信息
function pay(): void // void: 代表方法体没有返回值
function pay(moey: number): void
function pay(code: string, pwd: string): void

// pay: 支付函数
// 默认：pay() 刷脸支付
// pay(1000) 数字：代表现金支付
// pay(扫码，密码)：扫码支付
function pay(...args) {
  // arguments: 旧写法
  // ...: 新写法 剩余参数
  if (args.length == 0) {
    console.log("刷脸支付")
  }
  if (args.length == 1) {
    console.log("现金支付")
  }
  if (args.length == 2) {
    console.log("扫码支付")
  }
}

// 使用时：
pay()
pay(1000) // 数字类型 --- 代表钱数
// pay(true) // 此写法参数明显错误
pay("扫码", "13134")
// pay(12, 123, 54, 233) // 重载没有针对4参数的代码
