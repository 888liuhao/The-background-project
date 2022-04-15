const express = require('express');
const path = require('path');
const session = require('express-session');
const turnover = require('./middleware/turnover.js');


//导入路由中间件模块
const router = require('./router/router.js')


//引入模板引擎模块
// const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

const app = express();

//托管静态资源文件
app.use('/assets',express.static(path.join(__dirname, 'assets')))
app.use('/upload',express.static(path.join(__dirname, 'upload')))

//post请求中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

//配置express框架的模板引擎为art-template
app.set('views',path.join(__dirname,'/views/'));
app.engine('html',express_template);
app.set('view engine','html');

//session初始化设置
app.use(session({
    name:'sessionID',
    secret:"&*$%&%^&#$@",
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:60000 * 30
    }
}))
//引入防翻墙
app.use(turnover)

//dotenv是将环境变量从.evn文件加载至process.evn模块
//引入.env
require('dotenv').config({path:'.env'});

app.use(router)

console.log(process.env.PORT);
app.listen(process.env.PORT,()=>{
    console.log('已连接');
})