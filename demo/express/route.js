var express = require('express');
var app = express();

app.get('/',function(req,res){ // 首页
	res.send('Hello World');
});

app.post('/',function(req,res){ // 网站首页接受 POST 请求
	res.send('Got a POST request');
});

app.post('/user',function(req,res){ // 网站首页接受 PUT 请求
	res.send('got a put request at /user');
});

app.delete('/user',function(req,res){
	res.send('got a delete request at /user');
});
var server = app.listen(5000,function(){
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
// curl http://localhost:5000
// curl http://localhost:5000/user -d 'sfsd'
// curl http://localhost:5000/ -d 'sfsd'