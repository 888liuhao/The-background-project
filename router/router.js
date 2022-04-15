const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

//上传目录文件夹
const upload = multer({
    dest:'./upload/'
})

//导入控制器模块
const incontrller = require('../contriller/incontriller.js');
const CateController = require('../contriller/CateController.js');
const ArtController = require('../contriller/ArtController.js');
const loginckce = require('../contriller/loginckce.js');
const PersonalDetails = require('../contriller/PersonalDetails.js');

//后台首页
router.get('/',incontrller.index)
//首页数据柱状图
router.get('/disPlays',CateController.disPlays)
//登录界面
router.get('/login',loginckce.login)
router.post('/users',loginckce.users)

//分类管理页面
router.get('/catelist',CateController.index)
router.get('/articlelist',ArtController.index)

//文章数据页面
router.get('/aData',ArtController.aData)
//文章删除
router.post('/delArt',ArtController.delArt)
//文章添加页面
router.get('/addArti',ArtController.addArti)
//文章添加
router.post('/addArtss',upload.single('pic'),ArtController.addArtss)
//文章编辑页面
router.get('/upArti',ArtController.upArti)
//文章编辑
router.post('/upArt',upload.single('pic'),ArtController.upArt)

//系统页面
router.get('/system',CateController.system)

//系统退出
router.post('/loginquit',loginckce.loginquit)

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

//个人信息修改
router.post('/upSave',PersonalDetails.upSave)

//修改密码
router.post('/caPass',PersonalDetails.caPass)

//头像上传
router.post('/avatar',upload.single('file'),PersonalDetails.avatar)



module.exports = router