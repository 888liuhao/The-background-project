const path = require('path');
const incontrller = {}

//导入数据库模型
// const query = require('../model/query.js')

const viewsF = path.join(path.dirname(__dirname), 'views')
incontrller.index = (req,res)=>{
    res.sendFile(`${viewsF}/index.html`)
}

incontrller.login = (req,res)=>{
    res.sendFile(`${viewsF}/login.html`)
}

module.exports = incontrller