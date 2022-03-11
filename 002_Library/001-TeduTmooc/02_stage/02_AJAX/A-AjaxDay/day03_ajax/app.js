//在当前目录下的终端中输入 npm install express
//1.引入express
var express = require('express');
//2.创建web服务器,实例化
var app = express();
//3.设置监听端口
app.listen(12138);
//4.静态资源托管express.static()将静态资源的目录放入到参数中,不是必须静态资源就叫public，也不是必须只有这一个文件目录可以托管
app.use(express.static('./public'));
//5.在终端启动服务器 node app.js
//6.在地址栏中找到响应的html页面，打出地址查看是否运行成功http://localhost:12138/01_obj.html

//7.给前台一个接口地址,因为前台发请求用的get，后台交互数据，也用get方法
//地址的路径（字符串格式）
app.get('/ajaxget',(req,res)=>{
  console.log('前台有请求了');
  //8.返回给前台数据
  res.send('给你数据绿线通了');
})