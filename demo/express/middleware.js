// express 是由路由和中间件构成一个的 web 开发框架
// 中间是一个函数，可以访问请求对象req，响应对象res，和web应用中处于请求-响应循环流程中的中间件next
// 中间件的功能：执行任何代码，修改请求和响应对象，终结请求-响应循环，调用堆栈中的下一个中间件
// 注意：若当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

// ---------------------------- 应用级中间件：绑定到 app 对象 使用 app.use() 和 app.method() ----------------------------
var express = require('express');
var app = express();

app.use(function(req,res,next){// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
	console.log('Time', Date.now());
	next();
});

app.use('/user/:id', function(req,res,next){// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
	console.log('Request Type: ', req.method);
	next();
});

app.get('/user/:id', function (req, res, next) {// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
	res.send('USER');
});

app.use('/user/:id', function(req, res, next) { // 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
	console.log('Request URL:', req.originalUrl);
	next();
}, function (req, res, next) {
	console.log('Request Type:', req.method);
	next();
});

// ----------------------------对一个路径定义多个路由 ----------------------------
app.get('/user/:id', function (req, res, next) {// 一个中间件栈，处理指向 /user/:id 的 GET 请求
	console.log('ID:', req.params.id);
	next();
}, function (req, res, next) {
	res.send('User Info');
});

app.get('/user/:id', function (req, res, next) { // 不会被调用，因为第一个路由已经终止了请求-响应循环
	res.end(req.params.id);
});

// 在中间件栈中跳过剩余中间件,调用 next('route') 方法将控制权交给下一个路由,只对使用 app.VERB() 或 router.VERB() 加载的中间件有效
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
	// 如果 user id 为 0, 跳到下一个路由
	if (req.params.id == 0) next('route');
	// 否则将控制权交给栈中下一个中间件
	else next(); //
}, function (req, res, next) {
	// 渲染常规页面
	res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
	res.render('special');
});

// ------------------------------------路由级中间件 ------------------------------------
var app = express();
var router = express.Router();
router.use(function (req, res, next) { // 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
	console.log('Time:', Date.now());
	next();
});

router.use('/user/:id', function(req, res, next) { // 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
	console.log('Request URL:', req.originalUrl);
	next();
}, function (req, res, next) {
	console.log('Request Type:', req.method);
	next();
});

router.get('/user/:id', function (req, res, next) {// 一个中间件栈，处理指向 /user/:id 的 GET 请求
	// 如果 user id 为 0, 跳到下一个路由
	if (req.params.id == 0) next('route');
	// 负责将控制权交给栈中下一个中间件
	else next(); //
}, function (req, res, next) {
	// 渲染常规页面
	res.render('regular');
});

router.get('/user/:id', function (req, res, next) {// 处理 /user/:id， 渲染一个特殊页面
	console.log(req.params.id);
	res.render('special');
});

app.use('/', router);// 将路由挂载至应用

// -----------------------------错误处理中间件：需要四个参数 (err, req, res, next)-----------------------------
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// --------------------------------------内置中间件 --------------------------------------
// 从 4.x 开始, Express 已经不再依赖 Connect 了。除了 express.static,之前的内置中间件均单独作为模块安装使用了
// express.static 基于 serve-static，负责在 Express 应用中提托管静态资源。
var options = {
	dotfiles: 'ignore', // 是否对外输出文件名以点（.）开头的文件
	etag: false,       // 是否启用 etag 生成
	extensions: ['htm', 'html'], // 设置文件扩展名备份选项
	index: false,       // 发送目录索引文件
	maxAge: '1d',        // 以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性
	redirect: false,    // 当路径为目录时，不重定向至 “/”。
	setHeaders: function (res, path, stat) { // 设置 HTTP 头以提供文件的函数
		res.set('x-timestamp', Date.now());
	}
};
app.use(express.static('public', options));
app.use(express.static('../express')); // 托管静态文件，设置文件存放根目录
app.use(express.static('../movies'));// 静态资源存放在多个目录下面
app.use('/static', express.static('../../data'));
var server = app.listen(5000);

console.log("直接访问 http://localhost:5000/route.js");
console.log("直接访问 http://localhost:5000/readPg.js");
console.log("直接访问 http://localhost:5000/static/a.txt");

/* // --------------------------------------第三方中间件 --------------------------------------
// 例如：解析 cookie 的中间件： cookie-parser，安装$ npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
// 加载用于解析 cookie 的中间件
app.use(cookieParser());
*/
