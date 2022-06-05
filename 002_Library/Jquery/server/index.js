// 引入模块
const express = require("express")
// 创建服务器
var app = express()

// 配置静态文件所在目录
app.use(express.static("public"))

// 运行CORS 让所有请求都可以被任意来源进行访问
// all: 代表所有请求方式 例如：get post head put ...
// * 通配符 代表所有请求的接口地址
app.all("*", function (req, res, next) {
  // Access-Control-Allow-Origin
  // 接受 - 控制 - 允许 - 来源
  // 代表服务器允许来自参数2的访问
  // * 代表所有来源
  res.header("Access-Control-Allow-Origin", "*")
  // 特殊指定：只允许来自 localhost:5500 访问
  // 修改为127.0.0.1
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500")

  // 回传中文 防止中文乱码
  // 返回值是json格式 javascript/json
  res.header("content-type", "javascript/json;charset=utf-8")

  next() // next() 代表可以继续执行后续代码
})

// 在端口3000下 开启服务器
app.listen(3000, () => {
  console.log("3000已准备完毕！")
})

// 启动服务器：在server文件夹下执行开启命令
// nodemon index.js 每次改动自动重启服务器

app.get("/hello", (req, res) => {
  res.send("Hello Express!")
})

app.get("/names", (req, res) => {
  let names = ["lily", "lucy", "john", "marry", "亮亮"]
  res.send(names)
})
