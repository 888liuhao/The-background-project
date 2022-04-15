const md5 = require('md5')
const loginckce = {};


//导入数据库
const query = require('../model/query.js');

loginckce.login = (req, res) => {
    res.render('login.html')
}

//引入解构加密
let encipherment = require('../config/encryption.js')

//验证登录
loginckce.users = async (req, res) => {
    let { username, password } = req.body;
    // console.log(username, password);
    password = md5(`${password}${encipherment}`)
    let sql = `select * from users where username='${username}' and password='${password}'`;
    const result = await query(sql);
    if (result.length > 0) {
        req.session.userInfo = result[0];
        res.cookie('userInfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 0,
            message: "success"
        })
    } else {
        res.json({
            code: -1,
            message: "no"
        })
    }

}

//退出
loginckce.loginquit = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        }
    })
    res.json({
        code: 0,
        message: 'loginquit'
    })
}

module.exports = loginckce