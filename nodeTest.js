/*// 读文件
 var fs = require('fs');
 fs.readFile('./data/a.txt',function(error,data){
 console.log(data.toString());
 });*/

/*// 创建web服务器，方式一
 var http = require('http');
 http.createServer(function(require,response){
 response.writeHead(200,{'Content-Type': 'text/plain'});
 response.write('kaitou');
 response.end('Hello World\n');
 }).listen(3000);
 console.log("Server running at http://localhost:3000/");*/

/*// 创建web服务器，方式二
 var http = require('http');
 var server = http.createServer();
 server.on('request',function(req,res){
 res.writeHead(200,{'Content-Type': 'text/plain'});
 res.end('Hello World');
 });
 server.listen(3000);
 console.log("Server running at http://localhost:3000/");*/

/*// 流数据
 var fs = require('fs');
 var stream = fs.createReadStream('./data/a.jpg');
 stream.on('data',function(chunk){
 console.log(chunk.toString().length);
 });
 stream.on('end',function(){
 console.log('end');
 });
 console.log("执行位置");*/

/*// 可读流和可写流同时进行
 var http = require('http'),
 fs   = require('fs');
 http.createServer(function(req,res){
 res.writeHead(200,{'Content-Type': 'image/jpg'});
 fs.createReadStream('./data/a.jpg').pipe(res);
 }).listen(3000);
 console.log("Server running at http://localhost:3000/");*/

/*// 事件发射器，只有socket上有新数据，就有触发data事件
 var net = require('net');
 var server = net.createServer(function(socket){
 socket.on('data', function(data){  // 若将on改为once，则只响应一次事件
 socket.write("from yll");
 });
 });
 server.listen(8888);
 console.log('telnet 127.0.0.1 8888')*/

/*// 创建事件发射器
 var EventEmitter = require('events').EventEmitter;
 var channel = new EventEmitter();
 channel.on('join',function(){ // 发布事件
 console.log('Welcome');
 });
 channel.emit('join'); // 订阅join事件*/

/*// 并行执行流程，先输出100，然后500，最后1000
setTimeout(function () {
    console.log('1000ms');
}, 1000);
setTimeout(function () {
    console.log('500ms');
}, 500);
setTimeout(function () {
    console.log('100ms');
}, 100);*/


/*// 串行流程控制，先输出1000，然后500，最后100
 setTimeout(function(){
 console.log('1000ms');
 setTimeout(function(){
 console.log('500ms');
 setTimeout(function(){
 console.log('100ms');
 },100)
 },500)
 },1000);*/

/*// 使用Nimble流程控制工具
var nimble = require('nimble');
nimble.series([  // 给nimble一个函数数组，挨个执行
    function (callback) {
        setTimeout(function () {
            console.log('1000ms');
            callback();
        }, 1000)
    },
    function (callback) {
        setTimeout(function () {
            console.log('500ms');
            callback();
        }, 500)
    },
    function (callback) {
        setTimeout(function () {
            console.log('100ms');
            callback();
        }, 100)
    }
]);*/



