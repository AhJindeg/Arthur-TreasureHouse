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
});

// 接受前台?方式传递的参数
app.get('/getpar1',(req,res)=>{
  // 使用req.query可以拿到传递的参数并且是对象像是
  console.log(req.query);
});

// 接受前台/方式传递的参数，接收参数的方式是在接口地址后加/:字段名字
app.get('/getpar2/:names',(req,res)=>{
  console.log(req.params);
});

// 接收post方法的接口地址
// 接收之前，需要单独解析通过urlencoded传递的格式
app.use(express.urlencoded({extended:false}));

app.post('/ajaxpost',(req,res)=>{
  console.log(req.body);
  res.send('post方式返回值');
});

// put的请求方式
app.put('/ajaxput',(req,res)=>{
  console.log(req.body);
  res.send('put方式返回值');
});

// delete的请求方式
app.delete('/ajaxdel/:names',(req,res)=>{
  console.log(req.params);
  res.send('delete方式返回值');
});
