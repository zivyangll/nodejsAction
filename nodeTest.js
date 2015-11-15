// Node.js基于V8 JavaScript引擎，具有一次做多件事的能力（并发），用于简单构建快速的、可扩展的网络应用程序。
// Node.js使用事件驱动的、非阻塞的I/0模型，这让其既轻量又高效，是运行于不同发布设备上的数据密集型实时应用程序的完美平台。
// Node的事件化的I/O模型无需担心互锁和并发，这在多线程异步I/O常见。
// Node适用于当应用程序需要在**网络**上发送和接受数据时。


/*// I/O的不可预测性
// 每次之下以下代码，响应时间都会不不同，而且响应的顺序也会发生变化。
//Web服务器响应时间的影响因素：解析DNS请求的时间、服务器繁忙程度、网络的繁忙程度、要应答数据大小、带宽、输出数据、为响应而服务的软件的效率
var http = require('http'),
    urls = ['taobao.com','baidu.com','douban.com'];
function fetchPage(url){
    var start = new Date();
    http.get({host:url},function(res){
        console.log("got response: "+url);
        console.log("request tock ",new Date()-start,'ms');
    })
}
for(var i = 0; i < urls.length; i++) {
    fetchPage(urls[i]);
}*/

/*// 回调实例：函数可以作为参数传递到另一个函数中，然后被调用。
function haveBreakfast(food,drink,callback){
    console.log("Having breakfast of " + food + ", " + drink);
    if(callback && typeof(callback) === "function"){
        callback();
    }
}
haveBreakfast("toast","coffee",function(){
    console.log("finished breakfast!")
});*/

/*// Node在读写文件使用回调
//err保存在读取文件时返回的错误，data保存读取文件返回的数据，一旦文件被读取，回调就会被调用
var fs = require("fs");
fs.readFile("data/a.txt","utf8",function(err,data){
    if(err) throw err;
    console.log(data);
});*/

/*// 返回网页源代码
// 回调函数的调用发生在远程服务器发回响应之后，而不是之前
// http.get()方法可以用来请求Web服务器获得响应数据以便使用
var http = require("http");
http.get({host:"music.douban.com"}, function (res) {
    console.log("Got response: " + res.statusCode);//状态码
    console.log("Headers: " + res.headers);//头信息
    res.on('data',function(d){//返回网页源代码
        process.stdout.write(d); // 指向标准输出
        console.log( process.pid); //当前进程号
    })
}).on("error",function(e){
    console.log("Got error: " + e.message);
});*/

// 以下代码在浏览器中执行，用函数和不用函数，效率相差5倍，解释：
// function foo(){
for(var i = 1; i <= 10; i++){
    console.time(i);
    for(var j = 0; j < 256*256*256; j++){
    }
    console.timeEnd(i);
}
// }
// foo();






