const express = require('express');
// const querystring = require('querystring');
// 引入用户路由器
const userRouter = require('./user.js');
const app = express();
app.listen(12138);

// 前缀
app.use('/product',productRouter);
// 挂载userRouter
app.use('/user',userRouter);
// 挂载shoppingRouter
app.use('/shopping',shoppingRouter);






