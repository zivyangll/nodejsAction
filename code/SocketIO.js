// 动态Web简史
// 29世纪90年代后期，DHTML，引入了简单的动态功能，描述了用户与Web页面交互的方法以及当交互发生时会发生什么。
// Ajax：用户无需刷新页面就能从服务器请求数据，但想从服务器推动数据到浏览器比较困难，且在不同浏览器工作方式不同,每次通信都需要建立连接
// WebSocket：服务器和客户端之间实现双向实时通信，在Web服务器和浏览器之间保持连接持久打开，不支持重连接，但
// Socket.IO库提供了重连接reconnection handling／心跳heartbeat功能，并对某些跨浏览器的问题进行了抽象。
var http = require("http");
var fs    = require("fs");
var server = http.createServer(function(req,res){
	fs.readFile("./socketTest.html",function(error,data){ // 设置客户端网页
		res.writeHead(200,{"Content.Type":"text/html"});
		res.end(data,"utf-8");
	})
}).listen(3000,"127.0.0.1");
console.log('server running at  http://127.0.0.1:3000');
var io = require("socket.io").listen(server);//将Socket.IO绑定到服务器，可以侦听事件
io.sockets.on("connection",function(socket){//侦听连接事件,注意sockets和socket
	console.log("User connected");
	socket.emit("message",{text:"you hava receive message from server!"});//从服务器将数据发送给单个客户的
	// socket.broadcast.emit("message",{text:"you hava receive message from server!"});//给已连接的客户端发送数据

	socket.on("disconnect",function(){//侦听断开连接事件
		console.log("User disconnected!");
	});
	socket.on("fromClient",function(data){
		console.log(data.text);
	});
});
