// 错误处理中间件需要4 个参数： (err, req, res, next)
// 一般在其他 app.use() 和路由调用后，最后定义错误处理中间件
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
	// 业务逻辑
	// 返回的响应是随意的，可以响应一个 HTML 错误页面、一个 JSON 字符串等
});

// 可定义多个错误处理中间件，例如为使用 XHR 的请求定义一个错误处理中间件
var bodyParser = require('body-parser'); // bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err); // 将错误传递下去
}
function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something blew up!' });
	} else {
		next(err);
	}
}
function errorHandler(err, req, res, next) { // errorHandler 能捕获所有错误
	res.status(500);
	res.render('error', { error: err });
}

// 路由句柄有多个回调函数，可使用 ‘route’ 参数跳到下一个路由句柄
app.get('/a_route_behind_paywall',
	function checkIfPaidSubscriber(req, res, next) {
		if(!req.user.hasPaid) {
			// 继续处理该请求
			next('route');
		}
	}, function getPaidContent(req, res, next) {
		PaidContent.find(function(err, doc) {
			if(err) return next(err);
			res.json(doc);
		});
	});

// 缺省错误处理句柄:将错误处理交给 Express 内置的错误处理机制
function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500);
	res.render('error', { error: err });
}

var server = app.listen(5000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});

//调试
//Linux:   $ DEBUG=express:* node index.js
//Windows: > set DEBUG=express:* & node index.js
