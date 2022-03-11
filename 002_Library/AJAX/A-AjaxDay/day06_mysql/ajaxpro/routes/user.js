// 1. 引入express模块
const express = require('express');
// 2. 引入连接池
const pool = require('../pool.js');
// 3. 因为要打包暴露出去所以要创建一个路由对象
let router = express.Router();

// ------ 接口逻辑 ------


// ------ ------ ------

// 4. 暴露路由(user)对象
module.exports = router;