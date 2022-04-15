const res = require('express/lib/response')
const path = require('path')
const fs = require('fs')
const ArtController = {}

// 导入数据库
const query = require('../model/query.js')

ArtController.index = (req, res) => {
    res.render('articlelist.html')
}

//文章数据
ArtController.aData = async (req, res) => {
    const { page, limit } = req.query;
    //sql语句查询文章数
    const sql = `select count(id) as count from article`
    const result = await query(sql);
    const count = result[0].count;
    const forMula = (page - 1) * limit;
    const sql1 = `select t1.*,t2.cate_name,t3.username from article t1 left join category t2 on t1.cate_id = t2.cate_id left join users t3 on t1.author = t3.id
    limit ${forMula},${limit}`
    let result1 = await query(sql1)
    result1 = result1.map((item) => {
        const { cate_name, status } = item;
        item.statusText = status == 1 ? '上架' : '下架'
        item.cate_name = cate_name || '未分类'
        return item;
    })
    res.json({
        count,
        code: 0,
        data: result1
    })
}

//文章删除
ArtController.delArt = async (req, res) => {
    const { id } = req.body;
    const sql = `delete from article where id=${id}`;
    const { affectedRows } = await query(sql)
    if (affectedRows > 0) {
        res.json({
            code: 0,
            message: '删除成功'
        })
    } else {
        res.json({
            code: -7,
            message: '删除失败'
        })
    }
}

//文章添加页面
ArtController.addArti = (req, res) => {
    res.render('addArti.html')
}

//添加文章
ArtController.addArtss = async (req, res) => {
    const { title, cate_id, status, content } = req.body;
    const author = req.session.userInfo.id;
    let pic = '';
    //拿到文件的路径
    if (req.file) {
        let { originalname, filename } = req.file;
        let extName = originalname.substring(originalname.lastIndexOf('.'))
        let uploadDir = './upload'
        let oldName = path.join(uploadDir, filename);
        let newName = path.join(uploadDir, filename) + extName;
        try {
            fs.renameSync(oldName, newName)
            pic = `upload/${filename}${extName}`
            //删除原路径
            let oldAva = req.session.userInfo.avatar;
            oldAva = path.join(path.dirname(__dirname), oldAva);
            fs.unlink(oldAva, (err) => { });
        } catch (err) {
            console.log('文件上传失败');
        }
    }
    //更新到数据库
    const sql = `insert into article
    (title,cate_id,status,content,author,pic) 
    values('${title}','${cate_id}','${status}',
    '${content}','${author}','${pic}')`;
    const { affectedRows } = await query(sql);
    if (affectedRows > 0) {
        res.json({
            code:0,
            message:'添加成功'
        })
    }else{
        res.json({
            code:-8,
            message:'添加失败'
        })
    }
}




module.exports = ArtController