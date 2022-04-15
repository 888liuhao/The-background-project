const md5 = require('md5')
const path = require('path');
const fs = require('fs')
const PersonalDetails = {}

// 导入数据库模型
const query = require('../model/query.js')

//引入解构加密
let encipherment = require('../config/encryption.js')

//头像上传
PersonalDetails.avatar = async (req, res) => {
    const { id } = req.session.userInfo; //获取session的id
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

        //上传成功后更新到数据库
        const sql = `update users set avatar = '${pic}' where id = ${id}`
        await query(sql);
        const sql1 = `select * from users where id = ${id}`;
        const result = await query(sql1)
        // 更新session
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "upload success"
        })
    } else {
        res.json({
            code: -4,
            message: "upload fail",

        })
    }

}

//更新个人信息
PersonalDetails.upSave = async (req, res) => {
    const { id, intro } = req.body;
    // console.log(id,intro);
    const sql = `update users set intro = '${intro}' where id=${id}`
    const { affectedRows } = await query(sql);
    const success = { code: 0, message: "提交成功" };
    const faiD = { code: -3, message: "提交失败" };
    if (affectedRows > 0) {
        const sql = `select * from users where id=${id}`; //获取数据库更新的信息同步到session和cookie中
        const result = await query(sql);
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json(success)
    } else {
        res.json(faiD)
    }

}

//修改密码
PersonalDetails.caPass = async (req, res) => {
    let { paw1, paw3 } = req.body;
    paw1 = md5(`${paw1}${encipherment}`)
    paw3 = md5(`${paw3}${encipherment}`)
    let { id } = req.session.userInfo
    if (paw1 === req.session.userInfo.password) {
        let sql = `update users set password = '${paw3}' where id=${id}`
        let result = await query(sql)
        let { affectedRows } = result;
        if (affectedRows > 0) {
            req.session.destroy(err => {
                if (err) {
                    throw err;
                }
            })
            let ppaa = {
                paw1,
                code: 0,
                message: '修改成功'
            }
            res.json(ppaa)
        }
    } else {
        let ppaa = {
            paw1,
            code: -5,
            message: '旧密码错误'
        }
        res.json(ppaa)
    }

}
module.exports = PersonalDetails