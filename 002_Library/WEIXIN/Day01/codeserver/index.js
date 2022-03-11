// index.js
const express = require('express')
const app = express()
const captcha = require('svg-captcha')

// 引入express-jwt模块   由express-jwt模块来解析请求中的token
const expressJwt = require('express-jwt')
const key = 'mykey'
//   app.use(expressJwt({
//     secret: key  // 签名的密钥 或 PublicKey
//   })
// )

// 安装jsonwebtoken  由 jsonwebtoken来生成token字符串
let jwt = require('jsonwebtoken')

app.get('/register', (req, res)=>{
  let code = req.query.code
  console.log('register: 用户输入的参数:'+code)
  res.send('ok')
})

// 声明一个路由接口  /getcode  接收请求 返回验证码图片
app.get('/getcode', (req, res)=>{
  let cap = captcha.create()
  console.log('正确答案:'+cap.text)
  // 将cap.text 打入token字符串, 生成一个token字符串
  let token = jwt.sign({
      'answer': cap.text
    }, key, {
      expiresIn: 3600 * 24 * 3
    }
  )
  console.log(token)

  // 返回svg图片
  res.type('svg')  // 响应类型
  res.send(cap.data)
})



app.listen(3000, ()=>{
  console.log('server is running...')
})


