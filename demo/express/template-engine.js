/* // ----------------------------使用jade模版引擎------------------------------------
// 安装：$ npm install jade --save
var app = require('express')();
app.set('views', __dirname + '/views'); // 设置模板文件夹
app.set('view engine', 'jade'); // 设置模版引擎，支持jade、ejs、coffescript，jQuery template等模版

app.get('/', function (req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there!'}); // index为views目录下的index.jade文件
});

var server = app.listen(5000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
*/

// ----------------------------自定义模版引擎------------------------------------
var app = require('express')();
var fs = require('fs'); // 此模板引擎依赖 fs 模块
app.engine('ntl', function (filePath, options, callback) { // 定义模板引擎
	fs.readFile(filePath, function (err, content) {
		if (err) return callback(new Error(err));
		// 这是一个功能极其简单的模板引擎
		var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
			.replace('#message#', '<h1>'+ options.message +'</h1>');
		return callback(null, rendered);
	});
});
app.set('views', './views'); // 指定视图所在的位置
app.set('view engine', 'ntl'); // 注册模板引擎

app.get('/', function (req, res) {
	res.render('index', { title: 'Hey', message: 'Hello there! From ntl'});
});

var server = app.listen(5000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});