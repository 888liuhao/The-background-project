const res = require('express/lib/response');
const path = require('path');
const incontrller = {}

// 导入数据库模型
const query = require('../model/query.js')

// const viewsF = path.join(path.dirname(__dirname), 'views')
incontrller.index = (req, res) => {
    res.render('index.html')
}

incontrller.login = (req, res) => {
    res.render(`login.html`)
}

incontrller.test = (req, res) => {
    res.render(`test.html`)
}

incontrller.sugg = async (req,res)=>{
   let {name} = req.body
    let sql = `UPDATE settings SET val = '${name}' WHERE  id = 2`;
    let result = await query(sql);
    const resch = {
        code:100,
        msg:'success'
    }
    if(result.affectedRows < 1 ) {
        resch.code=101,
        resch.msg='fail'
    }
    res.json(resch);
}

incontrller.ttyues = async (req,res)=>{
    const sql = `select * from settings`;
    let resprice = await query(sql);
    res.json(resprice);
}

module.exports = incontrller