var mysql = require('mysql');

//数据库配置参数
const dbConfig = require('../config/dbconfig.js');
var connection = mysql.createConnection(dbConfig);

//连接
connection.connect(function (err){
    if(err) {
        throw err;
    }
});

function query(sql) {
    return new Promise((resolve,reject) => {
        connection.query(sql,(err,result) =>{
            if(err) reject(err);
            resolve(result);
        })
    })
}

module.exports = query