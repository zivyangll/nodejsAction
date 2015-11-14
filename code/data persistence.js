/*// 将数据写入文件
// 场景：备份数据、储存时间戳、记录PID、记录日志
// 若文件不存在，fs.writeFile将自动创建文件,若不提供编码，则会返回原始的缓冲区内容,
var fs = require("fs");
var data = "Some Data I want to write to a file";
fs.writeFile("file.txt",data,"utf8",function(err){
    if(!err){ // err包括文件不存在或没有读取文件的权限
        console.log("ok")
    }else{
        throw err;
    }
});*/

/*// 使用环境变量存储小数据
// 例如连接字符串的细节、用户名和密码、数据库设置等
console.log(process.env.PATH) //获取了系统环境变量的PATH值*/


// 使用PostgreSQL保存数据
/*
CREATE TABLE "testTable"(
    "number" serial NOT NULL,
    name text,
    phone bigint
)
*/

/*
var pg = require('pg');
var conString = "tcp://postgres:admin@localhost:5432/testDB"; // 连接字符串="tcp:// 用户名 : 密码 @localhost:5432/ 库名";
var client = new pg.Client(conString);

// 连接数据库
client.connect(function(error, results) {
    if(error){
        console.log('ClientConnectionReady Error: ' + error.message);
        client.end();
        return;
    }
    console.log('Connecting to postgres success...');

    // 插入行
    client.query("insert into \"testTable\"(name, phone) values('郭华东',13754978535)");
    client.query("insert into \"testTable\"(name, phone) values($1,$2)",['郭华东',13754978535]);

    // 更新行
    client.query("update \"testTable\" set name='华东' where phone=13754978535")

    // 查询数据库
    client.query("select * from \"testTable\"",function(err,result){
        for(var i=0;i<result.rowCount;i++ )
        {
            console.log(result.rows[i]);
        }
        client.end();
    });

    // 删除行
    client.query("delete from \"testTable\" where phone=13754978535");
});
*/

// 使用MongoDB保存数据
// 安装“mongodb-win32-i386-3.0.6”
// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('open mongoDB')
});

// 读取数据库

// 更新数据库

// 写入数据库

// 删除数据库