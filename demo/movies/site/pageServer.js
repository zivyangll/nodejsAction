//--------------------------------- 创建静态文件服务器---------------------------------
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

var server = http.createServer(function(req,res){
	var url = parse(req.url);
	var path = join(root,url.pathname);
	res.setHeader('content-type', 'text/html;charset=utf8');
	fs.stat(path,function(err,stat){ // fs.stat()获取文件相关信息，如大小，修改时间，错误码
		if(err){
			if(err.code == 'ENOENT'){
				res.statusCode = 404;
				res.end('Item not found');
			} else{
				res.statusCode = 500;
				res.end('Internal Server Error!');
			}
		}else{
			res.setHeader('Content-Length', stat.size);
			var stream = fs.createReadStream(path);
			stream.pipe(res); // 读入流.pipe(写入流);
			stream.on('error',function(err){ // 不加异常处理，当路径不对则服务会被错误搞垮
				res.statusCode = 500;
				res.end('Internal Server Error!');
			})
		}
	});
});
server.listen(4000);