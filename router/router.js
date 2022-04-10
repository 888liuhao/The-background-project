const express = require('express');
const path = require('path');
const router = express.Router();

//导入控制器模块
const incontrller = require('../contriller/incontriller.js');
const CateController = require('../contriller/CateController.js');
const ArtController = require('../contriller/ArtController.js');

//后台首页
router.get('/',incontrller.index)
//登录界面
router.get('/login',incontrller.login)
router.get('/test',incontrller.test)

//分类管理页面
router.get('/catelist',CateController.index)
router.get('/articlelist',ArtController.index)

//系统页面
router.get('/system',CateController.system)

//系统名修改
router.post('/sugg',incontrller.sugg)
router.get('/ttyues',incontrller.ttyues)

//分类列表数据
router.get('/testDate',CateController.testDate)
//分类数据添加
router.post('/addke',CateController.addke)
//分类列表-删除
router.delete('/delcatelist',CateController.delcatelist)

//分类列表-编辑
router.put('/updData',CateController.updData)



module.exports = router