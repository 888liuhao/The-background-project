// const res = require('express/lib/response');
const path = require('path');
const fs = require('fs')
const incontrller = {}

const res = require('express/lib/response')
// 导入数据库模型
const query = require('../model/query.js')

// const viewsF = path.join(path.dirname(__dirname), 'views')
incontrller.index = (req, res) => {
    res.render('index.html')
}

//头像上传
incontrller.logo = (req, res) => {
    //上传
    let pic = '';
    if (req.file) {
        let {
            originalname,
            filename
        } = req.file;
        let extName = originalname.substring(originalname.lastIndexOf('.'))
        let uploadDir = './upload'
        let oldName = path.join(uploadDir, filename);
        let newName = path.join(uploadDir, filename) + extName;
        try {
            fs.renameSync(oldName, newName)
            pic = `upload/${filename}${extName}`
            //删除原图
            let oldAva = req.session.userInfo.avatar;
            oldAva = path.join(path.dirname(__dirname), oldAva);
            fs.unlink(oldAva, (err) => { })
        } catch (err) {
            console.log('文件上传失败');
        }
    }
}


//设置后台名称
incontrller.sugg = async (req, res) => {
    let { name } = req.body
    let {
        originalname,
        filename
    } = req.file;
    let pic;
    let extName = path.extname(originalname)
    let id = req.session.userInfo.id
    let uploadDir = './upload'
    let oldName = path.join(uploadDir, filename);
    let newName = path.join(uploadDir, filename) + extName;
    fs.renameSync(oldName, newName)
    pic = `upload/${filename}${extName}`
    //删除原图
    // let oldAva = req.session.userInfo.avatar;
    // oldAva = path.join(path.dirname(__dirname), oldName);
    // fs.unlink(oldAva, (err) => { })
    pic = 'upload/' + filename + extName;
    let sql = `UPDATE settings SET blog_name = '${name}',pic='${pic}' WHERE  id = ${id}`;
    let result = await query(sql);
    const resch = {
        pic,
        code: 100,
        msg: 'success'
    }
    if (result.affectedRows < 1) {
        resch.code = 101,
            resch.msg = 'fail'
    }
    res.json(resch);
}

incontrller.ttyues = async (req, res) => {
    const sql = `select * from settings`;
    let resprice = await query(sql);
    res.cookie('resprice', JSON.stringify(resprice), {
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.json(resprice);
}

module.exports = incontrller