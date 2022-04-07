const express = require('express');
const path = require('path');

//导入路由中间件模块
const router = require('./router/router.js')
const app = express();

app.use(router)

//托管静态资源文件
app.use('/assets',express.static(path.join(__dirname, 'assets')))

app.listen(3696,()=>{
    console.log('已连接');
})