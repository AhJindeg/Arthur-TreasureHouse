const express = require('express');
// 创建web服务器
const app = express();
// 设置端口
app.listen(12138);

// 托管静态资源到public目录
// 如果浏览器请求静态资源会自动到public目录寻找
app.use(express.static('../public'));
