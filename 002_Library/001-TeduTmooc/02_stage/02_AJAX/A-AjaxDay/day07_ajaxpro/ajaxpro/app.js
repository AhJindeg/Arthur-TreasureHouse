// 1. 引入express模块
const express = require("express")

// 2. 其他(如：路由)模块
// 为了保持代码的整洁性，所有引入模块都放在文件的顶端部分

// 路由模块引入
// 管理员模块
const adminRouter = require("./routes/admin.js")
// 用户模块
const userRouter = require("./routes/user.js")

// 3. 创建web服务器
const app = express()

// 4. 设置端口号
app.listen(12138, () => {
  console.log("okk")
})

// 5. 托管静态文件夹
app.use(express.static("./views"))

// 6. 解析格式,url-encode格式
app.use(
  express.urlencoded({
    extended: false,
  })
)

// 7. 挂载路由
app.use("/admin", adminRouter)
app.use("/user", userRouter)

// 8. 错误处理中间件
app.use(function (err, req, res, next) {
  // 查看错误信息
  console.log(err)
  // 响应500,返回信息
  res.send({
    code: 500,
    msg: "服务器挂了,过两天再看吧",
  })
})
