
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
    client.query("insert into \"testTable\"(name, phone) values($1,$2)",['郭华东',13754978535]); //参数会被转义，防止工具

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
	//var query = client.query("select * from \"testTable\" where age > $1",[40]);
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

// ------------------------------使用MongoDB保存数据------------------------------
// 安装“mongodb-win32-i386-3.0.6”
// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('open mongoDB')
});

// 终止连接
//mongoose.disconnect();

// 注册schema，可以定义数据结构，默认值，添加校验
var Schema = mongoose.Schema;
var Tasks = new Schema({
	project: String,
	description: String
});
mongoose.model('Task',Tasks);

//// 添加任务
var Task  = mongoose.model('Task');
var myTask = new Task();
myTask.project = 'yll';
myTask.description = 'go to bed';
myTask.save(function(err){
	if(err) throw err;
	console.log('Task saved.');
});

// 更新任务
Task.update(
	{_id: '565502b9ccc683c002c4e84b'},
	{description: 'get up'},
	{multi: false}, // 只更新一个文档
	function (err, rows_updated) {
		if (err) throw err;
		console.log('Updated');
	}
);

// 删除文档
Task.findById('565491157e8859c013c7f04b', function(err, task){
	if(task) {
		task.remove();
	} else {
		console.log(task);
	}
});

// 搜索任务
Task.find({'project': 'yll'}, function(err, tasks) {
	for ( var i = 0; i < tasks.length; i++) {
		console.log('ID: ' + tasks[i]._id);
		console.log(tasks[i].description);
	}
});



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

 client.set('color', 'red', redis.print);
client.get('color', function(err,value){
	if(err) throw err;
	console.log('Got: ' + value);
});

// 使用哈希表存储和获取数据
client.hset('hash key', 'hashtest 1', 'some value', redis.print); // print函数输出操作的结果
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client.hkeys('hash key', function (err, replies) { // 列出哈希表中所有元素的键
	console.log(replies.length + ' replies:');
	replies.forEach(function (reply, i) {
		console.log('    ' + i + ': ' + reply);
	});
	// client.quit();
});

// 用哈希表存储和获取数据：键值对
// 通过hmset设置哈希表中的元素，用键标识值；用hkeys 列出哈希表中所有元素的键
client.hmset('camping',{'shelter': '2-person tent','cooking':'campstove'},redis.print);
client.hget('camping','cooking',function(err,value){ // 获取cooking的值
	if(err) throw err;
	console.log('Will be cooking with ' + value);
});
client.hkeys('camping',function(err,keys){
	if(err) throw err;
	keys.forEach(function(key,i){
		console.log('   ' + key);
	});
});

// 用链表存储和获取数据
// 若内存足够大，redis理论上可以存储40亿条元素
// lpush向链表中添加值，lrange获取参数start和end范围内的链表元素，end=-1为链表最后一个元素
client.lpush('tasks', 'paint the bikeshed red.', redis.print);
client.lpush('tasks', 'paint the bikeshed green',redis.print);
client.lrange('tasks',0,-1,function(err,items){
	if(err) throw err;
	items.forEach(function(item,i){
		console.log('   ' + item);
	});
});

// 用集合存储和获取数据
// redis集合是一组无序的字符串组，获取数据的性能比链表要好，集合中的元素必须唯一，相同值保存到集合，第二次会被忽略
client.sadd('ip_addresses','192.168.2.113',redis.print); // Reply:1
client.sadd('ip_addresses','192.168.2.113',redis.print); // Reply:0
client.sadd('ip_addresses','192.168.2.114',redis.print); // Reply:1
client.smembers('ip_addresses',function(err,members){
	if(err) throw err;
	console.log(members);
});*/

/* // redis提供信道进行传递数据，它提供了发布/预定功能，用于聊天和游戏
// 例如利用Redis的发布/预定功能实现的TCP/IP聊天服务器
var net = require('net');
var redis = require('redis');

var server = net.createServer(function(socket){
	var subscriber;
	var publisher;

	socket.on('connect',function(){
		subscriber = redis.createClient(); // 为用户创建预定客户端
		subscriber.subscribe('main_chat_room'); // 预定信道
		subscriber.on('message',function(channel, message){
			socket.write('Channel ' + channel + ':' + message); // 信道收到消息后把他发送给用户
		});
		publisher = redis.createClient(); // 为用户创建发布客户端
	});
	socket.on('data',function(data){
		publisher.publish('main_chat_room',data); // 用户输入消息后发布它
	});
	socket.on('end',function(){
		subscriber.unsubscribe('main_chat_room'); // 如果用户断开连接，终止客户端连接
		subscriber.end();
		publisher.end();
	});
});
server.listen(4000); // 启动聊天服务器

// node_redis性能最大化：
// 下载hiredis模块，利用官方hiredis的C语言库，redis-API会自动使用hiredis替代它的javascript的实现
// 安装：npm instal hiredis   重新编译hiredis：npm rebuild hiredis
*/