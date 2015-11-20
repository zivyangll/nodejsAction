var express = require('express');
var app = express();

// ----------------------------路由方法-----------------------------------
app.get('/',function(req,res){ // 首页
	res.send('Hello World');
});

// 在路由中使用参数
app.get('/users/:id',function(req,res){ // 首页
	res.send('Hello World form uer id: ' + req.params.id);
});
console.log('在路由中使用参数 ' + 'http://localhost:5000/users/99');


app.post('/',function(req,res){ // 网站首页接受 POST 请求
	res.send('Got a POST request');
});

app.post('/user',function(req,res){ // 网站首页接受 PUT 请求
	res.send('got a put request at /user');
});

app.delete('/user',function(req,res){
	res.send('got a delete request at /user');
});

app.all('/secret',function(req,res,next){ // 对于一个路径上所有请求加载中间件
	console.log('message from app.all()');
	next(); // 将控制权交给下一个控制器
});

/*// ----------------------------路由路径：采用正则表达式-----------------------------------

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
	console.log('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
	console.log('random.text');
});

// 使用字符串模式的路由路径示例：
// 匹配 acd 和 abcd
app.get('/ab?cd',function(req,res){
	console.log('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
	console.log('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
	console.log('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
	console.log('ab(cd)?e');
});

// 使用正则表达式的路由路径示例：
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
	console.log('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
	console.log('/.*fly$/');
});*/

// ----------------------------路由句柄：可提供多个回调函数-----------------------------------
//可以混合使用函数和函数数组处理路由：
var cb0 = function (req, res, next) {
	console.log('CB0');
	next();
};

var cb1 = function (req, res, next) {
	console.log('CB1');
	next();
};

app.get('/example/d', [cb0, cb1], function (req, res, next) {
	console.log('response will be sent by the next function ...');
	next();
}, function (req, res) {
	res.json({'s':'sd'});
});

// -----------------------------响应方法-----------------------------------------
// res.download()	提示下载文件。
// res.end()	终结响应处理流程。
// res.json()	发送一个 JSON 格式的响应。
// res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
// res.redirect()	重定向请求。
// res.render()	渲染视图模板。
// res.send()	发送各种类型的响应。
// res.sendFile	以八位字节流的形式发送文件。
// res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

// ----------------------app.route()：创建路由路径的链式路由句柄----------------------------------------
app.route('/book')
	.get(function(req,res){
		res.send('get a book');
	})
	.post(function(req,res){
		res.send('post a book');
	})
	.put(function(req,res){
		res.send('update the book');
	});

// 路由的管理，可以讲路由单独写在一个文件中
var routes = require('./routes');
app.get('/routesindex',routes.index);
console.log('将路由单独定义为一个文件' + ' http://localhost:5000/routesindex');

// ---------------------- 监听端口----------------------------------
var server = app.listen(5000,function(){
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
// curl http://localhost:5000
// curl http://localhost:5000/user -d 'sfsd'
// curl http://localhost:5000/ -d 'sfsd'
// curl http://localhost:5000/secret -d 'sfsd'
// curl http://localhost:5000/butterfly -d 'sfsd'
// curl http://localhost:5000/example/d


