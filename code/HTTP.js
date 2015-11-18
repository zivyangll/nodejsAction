//HTTP定义了服务器和客户端在通信的时候,如何发送和接受数据.
//Node.js可以创建HTTP服务器和HTTP客户端
//HTTP头发送的是附加的信息,包括内容类型,服务器发送响应的日期以及HTTP状态码
//默认发送了:
//HTTP/1.1 200 ok   HTTP版本是1.1,状态码200表示成功响应
//Connection: keep-alive    连接是持久的,是HTTP1.1开始具备的,让很多实时功能成为可能

/*// ------------------------创建http服务器，方式一---------------------------------
// http模块继承自net模块，tcp会话以connection为单位进行服务，http以request为单位进行服务
var http = require('http');
http.createServer(function (require, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('kaitou');
	response.end('Hello World\n');
}).listen(3000); // or listen(3000,'127.0.0.1');
console.log("Server running at http://localhost:3000/");*/

/*//--------------------------------- 创建web服务器，方式二---------------------------------
var http = require('http');
var server = http.createServer();
server.on('request', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World');
});
server.listen(3000);
console.log("Server running at http://localhost:3000/");*/

// 使用URL模块响应不同的请求

/*// ---------------------------------路由：应用程序要响应的请求---------------------------------
var url = require("url");
var requestURL = "http://daily.zhihu.com/story/4688312";
console.log(url.parse(requestURL).hostname);//获取主机名称
console.log(url.parse(requestURL).port);//获取端口
console.log(url.parse(requestURL).pathname);//获取路径名称*/

/*// ---------------------------------通过URL创建对于许多不同请求进行响应的服务器，复杂情况使用Express---------------------------------
var http = require("http");
var url = require("url");
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	if (pathname == '/') {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("home page\n")
	}
	if (pathname == '/about') {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("about")
	}
	if (pathname == '/yll') {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("my name is yll.")
	}
	if (pathname == "/redirect") {
		res.writeHead(301, {"Location": "/"});
		res.end();
	}
	else {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("page not found!");
	}
}).listen(3000, "127.0.0.1");
console.log("server running at http://127.0.0.1:3000");*/

//--------------------------------- 使用Node.js创建HTTP客户端---------------------------------
// HTTP客户端可以对任何服务请求响应的东西：Web浏览器、搜索引擎机器人、电子邮件客户端、Web Scraper
// 用途：监控服务器的正常工作时间、爬取不能通过API获取的Web内容、创建将来自Web的两个或者更多信息来源组合在一起的mashup，调用其他Web Service的API
// 通过使用http.get()方法实现对服务器的GET请求，需要提供options对象（主机、端口、路径）

/*// ---------------------------------创建一个HTTP客户端，并获取一个页面的HTTP状态码并检查响应代码---------------------------------
var http = require("http");
var options = {
	host: "movie.douban.com",
	port: 80,
	path: "/",
	method:'GET'
};
http.get(options, function (res) {
	if (res.statusCode === 200) {
		console.log("The site is up!");
	}
	else {
		console.log("The Site is down!");
	}
}).on("error", function (e) {
	console.log("error");
});*/

/*// 默认通过ClientRequest对象对同一个服务端发起HTTP请求最大创建5个连接，实质为5个连接池
// 通过客户端agent选项传递代理
var agent = new http.Agent({
	maxSocket: 10
});
var options = {
	host: "movie.douban.com",
	port: 80,
	path: "/",
	method:'GET',
	agent:agent
};*/

/*//--------------------------------- nodejs发布为web服务，提供客户端接口，类似于java中的servlet---------------------------------
// .cmd文件让程序自动执行: "%~dp0node.exe" "%~dp0app.js"
var HTTP = require('http');
var queryServer = HTTP.createServer(queryConnectionHandler);
queryServer.listen(1333, function (err) {
	console.log('call service interface: http://127.0.0.1:1333/?a=3&b=8');
	if (err) throw err;
});
function queryConnectionHandler(req, res) {
	var args = require('url').parse(req.url.toLowerCase(), true);
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
	states.message(/!* 这里返回值 *!/ addTwoInt(a, b));
}
function addTwoInt(a, b) {
	a = parseInt(a);
	b = parseInt(b);
	var c = a + b;
	return c;
}*/

/*//--------------------------------- 创建TCP服务端，传输之前需要3次握手形成会话---------------------------------
var net = require('net');
var server = net.createServer(function (socket){
	socket.on('data',function(data){ // 新的连接
		socket.write('hello, new connection');
	});
	socket.on('end',function (){ // 连接中的任意一端发送了FIN数据触发
		console.log('break connect');
	});
	socket.write('welcom');// 一端的write会调用另一端的data事件
});
server.listen(1113,function (){
	console.log('server bound input: telnet 127.0.0.1 1113');
});*/

/*//--------------------------------- TCP套接字是Stream对象，可以利用pipe()进行管道操作---------------------------------
var net = require('net');
var server = net.createServer(function(socket){
	socket.write('Echo server\r\n');
	socket.pipe(socket);
}).listen(1113,'127.0.0.1');*/

// 除了端口外，也可以通过Domain Socket进行监听： server.listen('/tmp/echo.sock'); ,使用nc工具进行会话：$ nc - U /tmp/echo.sock
/*// 也可通过如下方式进行创建：
var net = require('net');
var server = net.createServer();
server.on('connection',function(socket){ // 客户端套接字连接到服务端触发，简写为通过net.createServer()最后一个参数传递
	// 新的连接
});*/

/*//--------------------------------- 创建TCP客户端---------------------------------
var net = require('net');
//var client = net.connect({path: '/tmp/echo.sock'});// 若为Domain Socket：
var client = net.connect({port:1113}, function() {
	console.log('client connected');
	client.write('world\r\n');
});
client.on('data',function(data){
	console.log(data.toString());
	client.end();
});
client.on('end',function(){
	console.log('client disconnected');
});*/


/*// ---------------------------------创建UDP服务端：不可靠，用于音频视频，DNS服务---------------------------------
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('message',function(msg,rinfo){
	console.log('server got: ' + msg + 'from ' + rinfo.address + ':'+rinfo.port);
});
server.on('listening',function(){ // 绑定完成后触发listening事件
	var address = server.address();
	console.log('server listening ' + address.address + ':' + address.port);
});
server.bind(41234); // 该套接字将接受所有网卡上41234端口上的消息*/

/*// ---------------------------------创建UDP客户端---------------------------------
var dgram = require('dgram');
var message = new Buffer('杨龙龙');
var client = dgram.createSocket('udp4');
client.send(message,0,message.length,41234,'localhost',function(err,bytes){ // 向服务端发送数据，第二个参数表示Buffer的偏移
	client.close();
});*/


// 以下代码跑不起来，讲述原理

/*// ---------------------------------HTTP请求方法的判断---------------------------------
function(req,res){
	switch(req.method){
		case 'POST':update(req,res); break;
		case 'DELETE':remove(req,res); break;
		case 'PUT':create(req,res); break;
		case 'GET':
		default :get(req,res); break;
	}
}*/

// ---------------------------------HTTP路径解析---------------------------------

/*//静态文件服务器，根据路径查找磁盘中的文件，将其响应给客户端：
var url = require('url');
var fs  = require('fs');
function(req,res){
	var pathname = url.parse(req.url).pathname; // pathname = /p/a/t/h
	fs.readFile(path.join(ROOT,pathname),function(err,file){
		if(err){
			res.writeHead(404);
			res.end('找不到相关文件');
			return
		}else{
			res.writeHead(200);
			res.end(file);
		}
	});
}*/

/*// 预设路径为控制器和行为+参数的组合：如/controller/action/a/b/c
function(req,res){
	var pathname = url.parse(req,url).pathname;
	var paths = pathname.split('/');
	var controller = paths[1] || 'index';
	var action = paths[2] || 'index';
	var args = paths.slice(3);
	if(handles[controller] && handles[controller][action]){
		handles[controller][action].apply(null,[req,res].concat(args));
	}else{
		res.writeHead(500);
		res.end('找不到服务器');
	}
}
// 这样业务部分只关系具体的业务实现即可，如：
handles.index = {};
handles.index.index = function(req,res,foo,bar){
	res.writeHead(200);
	res.end(foo);
};*/

/*// ---------------------------------HTTP查询字符串---------------------------------
var myurl = 'http://user:pass@host.com:8080/p/a/t/h?query=String&query2=String2&query2=String3#hash';
var url = require('url');
var querystring = require('querystring');
//var query = querystring.parse(url.parse(myurl).query);
var query = url.parse(myurl,true).query; // 与上一句一样的效果
console.log(query); // 得到{ query: 'String', query2: [ 'String2', 'String3' ] } ，键多次出现则为数组*/

/*// ---------------------------------Cookie---------------------------------
// Cookie处理步骤：服务器向客户端发送Cookie；浏览器将Cookie保存；之后每次浏览器都会将Cookie发向客户端
// 通过CURL模拟发送Cookie：curl -v -H "Cookie: foo=bar; baz=val" "http://127.0.0.1:1337/path?foo=bar&foo=baz"
// HTTP_Parse将所有报文字段解析到req.headers上，Cookie为req.headers.cookie
var http = require('http');
http.createServer(function(req,res){
	req.cookies = parseCookie(req.headers.cookie);
	handle(req,res);
}).listen(1113,'127.0.0.1');
console.log('server running at http://127.0.0.1:1113/');

function parseCookie(cookie){
	var cookies = {};
	if(!cookie){
		return cookies;
	}else{
		var list = cookie.split(';');
		for(var i = 0; i < list.length; i++){
			var pair = list[i].split('=');
			cookies[pair[0].trim()] = pair[1].trim();
		}
		return cookies;
	}
}
function handle(req,res){
	if(!req.cookies.isVisit){
		res.setHeader("Set-Cookie",serialize('isVisit','1',{'maxAge':'100 00'}));
		res.writeHead(200);
		res.end('first');
	}else{
		res.writeHead(200);
		res.end('agin');
	}
}
function serialize(name,val,opt){ // 将Cookie序列化为符合规范的字符串
	// cookie格式：Set-Cookie: name=value; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
	var pairs = [name + '=' + val];
	opt = opt || {};
	if(opt.maxAge) pairs.push('Max-Age=' + opt.maxAge); // 告诉cookie多久后过期
	if(opt.domain) pairs.push('Domain=' + opt.domain);
	if(opt.path) pairs.push('Path=' + opt.path);
	if(opt.expires) pairs.push('Expires=' + opt.expires.toUTCString()); // 何时过期
	if(opt.httpOnly) pairs.push('httpOnly'); // 不许与脚本通过document.cookie去更改cookie值
	if(opt.secure) pairs.push('Secure'); // 在http中无效，在HTTPS中才有效
	return pairs.join('; ');
}*/

// ---------------------------------Session：数据只保留在服务器端，客户端无法修改---------------------------------
/*// 基于Cookie实现用户和数据的映射，session一般20分钟过期
var session = {}; //生成session
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000; // 20min
var generate = function(){
	var session = {};
	session.id = (new Date()).getTime() + Math.random();
	session.cookie = {
		expire: (new Date()).getTime() + EXPIRES
	};
	session[session.id] = session;
	return session;
};
console.log(generate());
// 每个请求到来，检查Cookie中的口令与服务端数据，若过期则重新生成
function(req,res){
	var id = req.cookies[key];
	if(!id){
		req.session = generate();
	}else{
		var session = session[id];
		if(session){
			if(session.cookie.expire > (new Date().getTime())){ // 更新超时时间
				session.cookie.expire = (new Date()).getTime() + EXPIRES;
				req.session = session;
			}else{ // 超时，删除旧数据，并重新生成
				delete session[id];
				req.session = generate();
			}
		}else{ // session过期或者口令不对，重新生成session
			req.session = generate();
		}
	}
	handle(req,res);
}
function handle(req,res){
	// hack响应对象的writeHead()方法，在它内部注入Cookie的逻辑
	var writeHead = res.writeHead;
	res.writeHead = function(){
		var cookies = res.getHeader('Set-Cookie');
		var session = serialize('Set-Cookie',req.session.id);
		cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
		res.setHeader('Set-Cookie', cookies);
		return writeHead.apply(this, arguments);
	};
	if(!req.session.isVisit){
		res.session.isVisit = true;
		res.writeHead(200);
		res.end('first');
	}else{
		res.writeHead(200);
		res.end('agin');
	}
}*/

/*// 当cookie禁用，使用查询字符串的方式实现浏览器端和服务器端数据的对应
var getURL = function(_url,key,value){ // 若没有值，则生成新的带值的URL
	var obj = url.parse(_url,true);
	obj.query[key] = value;
	return url.format(obj);
};
function(req,res){
	var redirect = function(url){
		res.setHeader('Location',url);
		res.writeHead(302); // 重定向
		res.end();
	};
	var id = req.query[key];
	if(!id){
		var session = generate();
		redirect(getURL(req.url,key,session.id));
	}else{
		var session = session[id];
		if(session){
			if(session.cookie.expire > (new Date()).getTime()){ // 更新超时时间
				session.cookie.expire = (new Date()).getTime() + EXPIRES;
				req.session = session;
				handle(req,res);
			}else{ // 超时，删除旧数据，并重新生成
				delete session[id];
				var session = generate();
				redirect(getURL(req.url,key,session.id));
			}
		}else{ // 若session过期或者口令不对，重新生成session
			var session = generate();
			redirect(getURL(req.url,key,session.id));
		}
	}
}*/
//当用户访问http://localhost/pathname时，会条找到http://localhost/pathname?session_id=12345567这样的地址


/*// ---------------------------------使用本地缓存---------------------------------
var handle = function(req,res){ // 根据时间戳更新缓存
	fs.stat(filename,function(err,data){
		var lastModified = stat.mtime.toUTCString();
		if(lastModified == req.headers['if-modified-since']){
			res.writeHead(304,'Not Modified');
			res.end();
		}else{
			fs.readFile(filename,function(err,data){
				var lastModified = stat.mtime.toUTCString();
				res.setHeader('Last-Modified',lastModified);
				res.writeHead(200,'ok');
				res.end();
			});
		}
	});
};*/

/*// 根据时间戳更新缓存存在问题：时间戳变内容不变；精确到秒，精度差。使用HTTP1.1引入的ETag
var crypto = require('crypto');
var getHash = function(str){ // 根据内容生成散列值
	var shasum = crypto.createHash('sh1');
	return shasum.update(str).digest('base64');
};
var handle = function(req,res){
	fs.readFile(filename,function(err,file){
		var hash = getHash(file);
		var noneMatch = req['if-none-match'];
		if(hash === noneMatch) {
			res.writeHead(304,'Not Modified');
			res.end();
		} else{
			res.setHeader('ETag',hash);
			res.writeHead(200,'ok');
			res.end();
		}
	});
};*/

/*//使用node发送邮件
var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
	host: "smtp.qq.com", // 主机
	secureConnection: true, // 使用 SSL
	port: 465, // SMTP 端口
	auth: {
		user: "594043140@qq.com", // 账号
		pass: "13754956538..." // 密码
	}
});
// 设置邮件内容
var mailOptions = {
	from: "Fred Foo <594043140@qq.com>", // 发件地址
	to: "594043140@qq.com", // 收件列表
	subject: "Hello world", // 标题
	html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
}
// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response){
	if(error){
		console.log(error);
	}else{
		console.log("Message sent: " + response.message);
	}
	smtpTransport.close(); // 如果没用，关闭连接池
});*/










