// 路由器是express下的一个功能，需要先引入express
const express = require('express');

// 引入商品路由(自定义模块)
const productRouer = require('./app.js');

//创建服务器
const app=express();

// 设置端口
app.listen(12138);

// 使用路由器，将路由器中所有的路由挂载到web服务器
//参数1：添加前缀
//参数2：使用的路由器
app.use('/product',productRouter);


// 向路由器下添加路由
// 商品列表(get / list)
r.get('/list',(req.res) => {
	res.send('这是用户列表');
});



// 添加商品(get / add)

// 删除商品(get / delete)

// 导出路由器对象
module.exports = r;


// 引入express插件
const express = require('express');
// 引入querystring插件
const querystring = require('querystring');
//引入商品路由器
const productRouter = require('./product.js')

// 引入购物车路由器
const shoppingRouter = require('./shopping.js');
// 将express挂载到app
const app = express();
// 启动web服务器
app.listen(8080, () => {
 console.log('服务器创建成功');
 // 使用路由器，将路由器中所有的路由挂载到web服务器中,参数1：添加的前缀,参数2：使用的路由器
 // 所有的路由都添加了前缀：/product
 // 挂载prideuctRouter

});