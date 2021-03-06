const path = require('path');
const CateController = {}

// 导入
const query = require('../model/query.js')

CateController.index = (req, res) => {
    res.render(`catelist.html`)
}

CateController.system = (req, res) => {
    res.render(`system.html`)
}

//查询
CateController.testDate = async (req, res) => {
    const sql = 'select * from category';
    const data = await query(sql)
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

//编辑
CateController.updData = async (req, res) => {
    const { cate_id, cate_name, orderBy } = req.body;
    //编写执行sql语句
    const sql = `update category set cate_name = '${cate_name}',orderBy = ${orderBy} where cate_id = ${cate_id}`;
    const { affectedRows } = await query(sql)
    const success = { code: 0, message: "success" }
    const faiD = { code: 1, message: "no" }
    if (affectedRows > 0) {
        res.json(success)
    } else {
        res.json(faiD)
    }

}

//删除
CateController.delcatelist = async (req, res) => {
    const { cate_id } = req.query
    // console.log();
    const sql = `delete from category where cate_id=${cate_id}`;
    const data = await query(sql)
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

//添加
CateController.addke = async (req, res) => {
    const { cate_name, orderBy } = req.body;
    let sql = `insert into category(cate_name,orderBy) values('${cate_name}',${orderBy})`
    const { affectedRows } = await query(sql)
    const success = { code: 0, message: "success" }
    const faiD = { code: 1, message: "no" }
    if (affectedRows > 0) {
        res.json(success)
    } else {
        res.json(faiD)
    }
}

//首页数据显示
CateController.disPlays = async (req, res) => {
    const sql = `SELECT count(t1.id) total,t2.cate_name from article t1 LEFT JOIN category t2 ON t1.cate_id= t2.cate_id group by t1.cate_id`
    let result = await query(sql);
    result = result.map(item => {
        if (!item.cate_name) {
            item.cate_name = '未分类'
        }
        return item;
    })
    res.json(result)
}
module.exports = CateController;