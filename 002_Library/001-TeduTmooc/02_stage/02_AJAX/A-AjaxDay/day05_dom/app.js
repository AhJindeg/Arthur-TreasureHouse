//在当前目录下的终端中输入 npm install express
//1.引入express
var express = require('express');
var poke = require('./data.js');
// console.log(poke[32]);
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

// jh 测试用户测试的数据能否传输到后台
app.get('/jh',(req,res)=>{
  var moni = {names:'tom',pwd:'123'};
  var names = req.query.names;
  console.log(names);
  if(names == moni.names){
    res.send('成功');
  }else{
    res.send('失败');
  };
});

// poker接口，查询小精灵数据
app.get('/poker',(req,res)=>{
  // console.log(req.query);
  // 收到的前台数据是一个字符串格式，需要变成数字类型才能往数组里插入
  var idnumber = Number(req.query.id);
  // 拿到的数值是id值，把id值变成索引值后需要-1处理才能拿到用户要的那个id小精灵
  console.log(poke[idnumber-1]);
  var datajson = poke[idnumber-1];
  res.send(datajson);
});

// 该接口返回一个小精灵数据
app.get('/pokeshow',(req,res)=>{
  // 将前台传来的id转为数字类型
  var id = Number(req.query.id);
  // 将转好的数字的id放在poke数组中当索引使用但要-1
  // 此时的datajson是一组小精灵的数据，对象形式的
  var datajson = poke[id-1];
  // 把找好的数据传回给前台
  res.send(datajson);
});

// 所有小精灵都给到前台
app.get('/pokelist',(req,res)=>{
  res.send(poke);
});
