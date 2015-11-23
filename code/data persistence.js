
/*// ------------------------------将数据存储在内存------------------------------
// 内存储存数据：存放少量经常使用的数据，例如根据记录最近一次重启服务器后页面访问次数的计数器
var http = require('http');
var counter = 0;
var server = http.createServer(function(req,res){
	counter++;
	console.log(counter +'one time');
	res.end('I have been accessed ' + counter + ' times');
}).listen(7000);
console.log('http://localhost:7000');*/

/*// ------------------------------将数据写入文件------------------------------
// 场景：备份数据、储存时间戳、记录PID、记录日志，多个用户将记录保存在同一个文件会出现并发问题
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

/*// ------------------------------使用环境变量存储小数据------------------------------
// 例如连接字符串的细节、用户名和密码、数据库设置等
console.log(process.env.PATH) //获取了系统环境变量的PATH值*/


//------------------------------ 使用PostgreSQL保存数据------------------------------
/*
CREATE TABLE "testTable"(
    "number" serial NOT NULL,
    name text,
    phone bigint
)
*/

/*
var pg = require('pg'); // npm install pg --save
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

    // 查询数据库，方式1
    client.query("select * from \"testTable\"",function(err,result){
        for(var i=0;i<result.rowCount;i++ )
        {
            console.log(result.rows[i]);
        }
        client.end();
    });
	// 查询数据库，方式2
	//var query = client.query("select * from \"testTable\"");
	//query.on('row',function(row){ // 处理返回结果
	//	console.log(row.name)
	//});
	//query.on('end',function(){ // 查询完成后的处理
	//	client.end();
	//});


    // 删除行
    client.query("delete from \"testTable\" where phone=13754978535");
});
*/

/*// ------------------------------使用MongoDB保存数据------------------------------
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
*/


/* // --------------------------Redis----------------------------------
// 安装https://github.com/MSOpenTech/redis/releases，运行C:\Program Files\Java\redis>redis-server.exe
var redis = require("redis");
var client = require('redis').createClient();

client.on('error', function (err) {
	console.log('Error ' + err);
});
client.on('ready',function(err){ // 连接成功
	console.log('ready');
});

client.set('string key', 'string val', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client.hkeys('hash key', function (err, replies) {
	console.log(replies.length + ' replies:');
	replies.forEach(function (reply, i) {
		console.log('    ' + i + ': ' + reply);
	});
	client.quit();
}); */
