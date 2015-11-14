//HTTP定义了服务器和客户端在通信的时候,如何发送和接受数据.
//Node.js可以创建HTTP服务器和HTTP客户端
//HTTP头发送的是附加的信息,包括内容类型,服务器发送响应的日期以及HTTP状态码
//默认发送了:
//HTTP/1.1 200 ok   HTTP版本是1.1,状态码200表示成功响应
//Connection: keep-alive    连接是持久的,是HTTP1.1开始具备的,让很多实时功能成为可能

/*// 创建web服务器，方式一
 var http = require('http');
 http.createServer(function(require,response){
 response.writeHead(200,{'Content-Type': 'text/plain'});
 response.write('kaitou');
 response.end('Hello World\n');
 }).listen(3000); // or listen(3000,'127.0.0.1');
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

// 使用URL模块响应不同的请求

/*// 路由：应用程序要响应的请求
var url = require("url");
var requestURL = "http://daily.zhihu.com/story/4688312";
console.log(url.parse(requestURL).hostname);//获取主机名称
console.log(url.parse(requestURL).port);//获取端口
console.log(url.parse(requestURL).pathname);//获取路径名称*/

/*// 通过URL创建对于许多不同请求进行响应的服务器，复杂情况使用Express
var http = require("http");
var url = require("url");
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname =='/'){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("home page\n")
    }
    if(pathname == '/about'){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("about")
    }
    if(pathname == '/yll'){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("my name is yll.")
    }
    if(pathname == "/redirect"){
        res.writeHead(301,{"Location":"/"});
        res.end();
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end("page not found!");
    }
}).listen(3000,"127.0.0.1");
console.log("server running at http://127.0.0.1:3000");*/

// 使用Node.js创建HTTP客户端
// HTTP客户端可以对任何服务请求响应的东西：Web浏览器、搜索引擎机器人、电子邮件客户端、Web Scraper
// 用途：监控服务器的正常工作时间、爬取不能通过API获取的Web内容、创建将来自Web的两个或者更多信息来源组合在一起的mashup，调用其他Web Service的API
// 通过使用http.get()方法实现对服务器的GET请求，需要提供options对象（主机、端口、路径）

/*// 创建一个HTTP客户端，并获取一个页面的HTTP状态码并检查响应代码
var http = require("http");
var options = {
    host:"movie.douban.com",
    port:80,
    path:"/"
};
http.get(options,function(res) {
    if (res.statusCode === 200) {
        console.log("The site is up!");
    }
    else {
        console.log("The Site is down!");
    }
}).on("error",function(e){
    console.log("error");
});*/

/* // nodejs发布为web服务，提供客户端接口，类似于java中的servlet
// .cmd文件让程序自动执行: "%~dp0node.exe" "%~dp0app.js"
var HTTP  = require('http');
var queryServer = HTTP.createServer(queryConnectionHandler);
queryServer.listen(1333, function (err) {
    console.log('call service interface: http://127.0.0.1:1333/?a=3&b=8');
    if (err) throw err;
});
function queryConnectionHandler(req, res) {
    var args   = require('url').parse(req.url.toLowerCase(), true);
    var a = args.query.a;//获得参数a
    var b = args.query.b;//获得参数b
    var states = {
        error: function () {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            });
            res.end('false');
        },
        ok: function () {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            });
            res.end('ok');
        },
        message: function (obj) {
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(obj));
        }
    };
    // 这里写具体实现
    states.message( /!* 这里返回值 *!/ addTwoInt(a,b) );
}
function addTwoInt(a,b){
    a = parseInt(a);
    b = parseInt(b);
    var c = a + b;
    return c;
}*/


