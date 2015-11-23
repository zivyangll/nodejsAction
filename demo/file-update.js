var http = require('http');
var formidable = require('formidable');
var server = http.createServer(function(req,res){ // 创建HTTP服务器
	switch (req.method
		) {
		case 'GET':
			show(req,res);
			break;
		case 'POST':
			upload(req,res);
			break;
	}
});
server.listen(5000);
console.log('http://localhost:5000');
function show(req,res){
	var html = '' +
		'<form method="post" action="/" enctype="multipart/form-data">' + //multipart/form-data是适用于BLOB的MIME类型
		'<p><input type="text" name="name"/></p>' +
		'<p><input type="file" name="file"/></p>' +
		'<p><input type="submit" value="Upload"/></p>' +
		'</form>';
	res.setHeader('Content-type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html));
	res.end(html);
}

function upload(req,res){// 上传逻辑，通过formidable实现
	if(!isFormData(req)){
		console.log("不存在multipart/form-data");
		res.statusCode = 400;
		res.end('please upload a file');
		return;
	}
	//res.end(); // 不结束影响，请求会一直挂起，处于等待状态
	var form = new formidable.IncomingForm(); // 初始化表单，默认将上传的文件流入/tmp或者C:\Users\yll\AppData\Local\Temp中，若没有上传文件则保存空文件

	// ------------------------------方式1------------------------------------
	form.on('field',function(field,value){ // 获取表单字段
		console.log(field);
		console.log(value);
	});
	form.on('file',function(name,file){ // 获取文件，file对象提供了文件各种属性信息
		console.log(name);
		console.log(file);
	});
	form.on('progress',function(bytesReceived,bytesExpected){ // 获取上传进度
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		console.log(percent);
	});
	form.on('end',function(){
		res.end('upload complete!');
	});
	form.parse(req); // 必须要添加，否则结果监听事件没反应

	// ------------------------------方式2------------------------------------
	//form.parse(req,function(err, fields, files){ // 更加简洁和抽象的API
	//	console.log(fields); // 表单字段{ name: 'sds' }
	//	console.log(files); // 文件信息
	//	res.end('upload complete!!!');
	//});
}

function isFormData(req){ // 确保它是一个文件上传请求
	var type = req.headers['content-type'] || '';
	//console.log(type.indexOf('multipart/form-data'));
	return type.indexOf('multipart/form-data') == 0; // 若content-type中有multipart/form-data的话，为真
}