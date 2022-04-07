const express = require('express');
const path = require('path');
const router = express.Router();

//导入控制器模块
const incontrller = require('../contriller/incontriller.js');

//后台首页
router.get('/',incontrller.index)
//登录界面
router.get('/login',incontrller.login)

module.exports = router