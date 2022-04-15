// //防翻墙
module.exports =(req,res,next)=>{
    let reqPath = req.path.toLowerCase();
    //需放行的页面
    const notAuth = ['/login','/users'];
    if(notAuth.includes(reqPath)){
        next();
    }else{
        if(req.session.userInfo){
            next();
        }else{
            res.redirect('/login')
            return
        }
    }
}