var express = require('express');
var app = express();
app.use(express.static('../express')); // 托管静态文件，设置文件存放根目录
app.use(express.static('../movies'));// 静态资源存放在多个目录下面
app.use('/static', express.static('../../data'));
var server = app.listen(5000);
console.log("直接访问 http://localhost:5000/route.js");
console.log("直接访问 http://localhost:5000/readPg.js");
console.log("直接访问 http://localhost:5000/static/a.txt");

