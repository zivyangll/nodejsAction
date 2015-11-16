//Node.js运行于单一的线程中，若有长时间运行的代码，事件循环会被阻塞。
//非阻塞：Node.js是单线程的，若代码阻塞的话，其他一切都停止了。
//快速返回：操作应该快速返回，若不能快速返回，就应当将其移到另一个进程中。
//不再围绕事件出现的顺序编程，而是围绕事件发生的顺序编程

/*//下面代码为对ID为target的HTML元素设置单击侦听器，当事件发生时，事件被触发。
var target = document.getElementById("target");
target.addEventListener("click",function(){
    alert("click event fired.");
},false);*/

/*// 要使用events模块，必须先创建一个新的EventEmitter实例
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
//加入上述代码，就可以添加事件和侦听器了。
ee.on("message",function(data){//侦听器侦听事件并在事件触发时处理它。
    console.log(data);//emit的第二个参数传递给了匿名函数使用
});
ee.emit("message","This emits a message.");//第一个参数是对事件进行描述的字符串，与侦听器匹配*/

/*//  Node.js处理网络事件：包括来自Web服务器的响应，从文件读取数据，从数据库返回数据
var http = require("http");
http.get({host:"movie.douban.com"}, function (res) {
    res.on('data',function(d){//这是一个来自Events模块的事件侦听器
        process.stdout.write(d);
    })
}).on("error",function(e){
    console.log("Got error: " + e.message);
});*/

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

/*// 用事件玩乒乓：默认如果事件超过10个侦听器，就会发出警告，可以通过emitter.setMaxListeners(n)来更改这个数量
var EventEmitter = require("events").EventEmitter;
var pingPong = new EventEmitter();
setTimeout(function(){
    console.log("Send firstping");
    pingPong.emit("ping");
},2000);
pingPong.on("ping",function(){
    console.log("Got Ping");
    setTimeout(function(){
        pingPong.emit("pong");
    },2000);
});
pingPong.on("pong",function(){
    console.log("Got Pong");
    setTimeout(function(){
        pingPong.emit("ping");
    },2000);
});
// 动态编写事件侦听器程序
var logPing = function(){
    console.log("4s后增加一个事件侦听器")
};
setTimeout(function(){
    pingPong.on("ping",logPing);
},4000);

setTimeout(function(){
    pingPong.removeListener("ping",logPing);//12s后移除增加的事件
},12000);*/


/*// 事件循环
 // 事件循环使得系统可以将回调函数先保存起来，而后当事件在将来发生时再运行，因为回调函数的执行被推迟到事件发生之后，
 // 于是就无需停止执行，控制流可以返回到Node运行时环境，从而让其他事情发生.
 // 核心思想：将代码围绕着事件来架构，而不是按照期待中的输入顺序来架构。
 // Node.js不适合：处理大量数据或者长时间运行计算等，Node.js旨在网络中推送数据并瞬间完成。与之类似的为java的vertx
 var http = require("http");
 function fetchPage(){
 console.log("fetching page");
 http.get({host:"douban.com"},function(res){//要爬的网址
 console.log("data returned from page");
 res.on("data",function(d){//返回该网页的源码
 process.stdout.write(d)//将网页源码输出
 })
 }).on("error",function(e){
 console.log("There was an error " + e)
 })
 }
 function fetchapi(){
 console.log("fetching api");
 http.get({host:"movie.douban.com"},function(res){
 console.log("data returned from the api");
 }).on("error",function(e){
 console.log("There was an er ror " + e);
 })
 }
 fetchPage();
 fetchapi();*/
