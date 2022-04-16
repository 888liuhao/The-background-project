const express = require('express');
const router = express.Router();

//引入前台控制器
const receControl = require('../contriller/receControl.js')
//前端分类接口
router.get('/cateData',receControl.cateData)
//前端首页数据接口
router.get('/articData',receControl.articData)
//文章内容
router.get('/oneArticle',receControl.oneArticle)


router.get('/cateDate',receControl.cateDate)


module.exports = router;