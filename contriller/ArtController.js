const path = require('path')
const ArtController = {}

ArtController.index=(req,res)=>{
    res.render('articlelist.html')
}



module.exports = ArtController