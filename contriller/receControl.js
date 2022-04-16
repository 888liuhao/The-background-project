const receControl = {}
const res = require('express/lib/response');
const query = require('../model/query')

receControl.cateData = async (req, res) => {
    let sql = `select * from category`;
    let result = await query(sql)
    res.json(result)
}

receControl.articData = async (req, res) => {
    let { page = 1, pagesize = 10 } = req.query;
    let newpage = (page - 1) * pagesize
    let sql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category 
    t2 on t1.cate_id = t2.cate_id LEFT JOIN users t3 on t1.author = t3.id where 
    t1.status = 1 limit ${newpage},${pagesize}`;
    let result = await query(sql);
    res.json(result)
}


receControl.oneArticle = async (req,res)=>{
    console.log(req.query);
    const { id }= req.query
    let sql = `SELECT t1.*,t2.cate_name FROM article t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id WHERE id = ${id}`;
    let result = await query(sql);
    res.json(result[0] || {});
}

receControl.cateDate = async (req,res) =>{
    const {id,page,pagesize} = req.query;
    let sql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category 
    t2 on t1.cate_id = t2.cate_id LEFT JOIN users t3 on t1.author = t3.id where 
    t1.status = 1 and t2.cate_id = ${id} limit ${page},${pagesize}`;
    let result = await query(sql);
    res.json(result)
}



module.exports = receControl;