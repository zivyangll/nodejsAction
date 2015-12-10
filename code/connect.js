// 中间件connect是中间件的模块化组件，可以拦截HTTP服务器提供的请求和响应对象，执行逻辑，然后传递给下一个中间件或者结束响应
// 通过中间件组件用来请求日志、静态文件服务、请求体解析、会话管理等，express是构建在connect基础上
// 中间件组件是一个js函数，接受三个参数：req请求对象，res响应对象，next回调函数（表示完成工作，进行下一个中间件）

/*// -------------------------------最小的connect程序-------------------------------
var connect = require('connect');
var app = connect(); // 返回connect裸程序，没有中间件，也就没有响应，返回404
app.use(logger)  // 通过use方法将中间件传递给分配器
	.use(hello)  // 传递hello中间件
	.listen(4001);
console.log('http://localhost:4001');
console.log('http://localhost:4002');

*/

/*// -------------------------------中间件顺序的重要性1-------------------------------
connect()
	.use(hello)    // 因为hello不会调用next()
	.use(logger)// logger中间不会被调用（实际上也可以被调用，只不过res.end必须最后调用）
	.listen(4002);
//中间件顺序的重要性2  利用中间件进行认证
connect()
	.use(looger)
	.use(restrictFileAccess) // 只有用户有效时才会调用next()
	.use(serveStaticFiles)
	.use(hello);*/

/*// -------------------------------Connect中挂载中间件组件或服务器的语法-------------------------------
var connect = require('connect');
connect()
	.use(logger)// 当.use()的第一个参数为字符串时，只有URL前缀与之匹配时，conncet才会调用后面的中间件
	.use('/admin', restrict) // 确保访问页面的是有效用户
	.use('/admin',admin) // 给用户呈现管理区
	.use(hello)
	.listen(4003);
console.log('http://localhost:4003/admin/users');*/

/*// 在两个不同的挂载点挂载博客程序
var connect = require('connect');
connect()
	.use(logger)
	.use('/blog',blog)
	.use('/posts',blog)
	.use('hello')
	.listen(4004);*/

// 定义logger日志中间件
function logger(req, res, next){
	console.log('from logger ,%s %s', req.method, req.url);
	next();
}
// 响应'Hello World'中间件
function hello(req, res){ // 没有next回调，因为这个组件结束了HTTP响应
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
}

// 实现HTTP Basic认证的中间件组件
function restrict(req, res, next){
	var authorization = req.headers.authorization;
	if(!authorization){
		return next(new Error('Unauthorized'));
	}
	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	authenticateWithDatabase(user, pass, function(err){ // 根据数据库中记录检查认证信息的函数
		if(err){
			return next(err);  // 告诉分派器出错
		}
		next(); // 若认证信息有效，不带参数调用next()
	});
}

// 显示管理面板的中间件
function admin(req, res, next){
	switch (req.url){   // 通过挂载，case中使用/和/users，而不是/admin和/admin/users
		case '/' :
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['yll','ziv','lxj']));
	}
}

/*// ---------------------通过闭包创建可配置，可重用的中间件（闭包：用函数返回一个函数）----------------------------
// 可配置中间件结构：
function setup(options) {
	// 设置逻辑，在这里进行中间件初始化
	return function(req, res, next){
		//中间件逻辑，即使被外部函数返回了，仍然可以访问options
	}
}
// 用法：
app.use(setup({some: 'options'}));*/

/*// --------------------- 创建可配置的logger中间件组件 ---------------------
function setup(format){  // 可用不同配置调用多次
	var regexp = /:(\w+)/g; // 匹配请求属性
	return function logger(req, res, next){  // 真实的logger组件
		var str = format.replace(regexp, function(match, property){ // 格式化请求的日志条目
			return req[property];
		});
		console.log(str);
		next();
	}
}
module.exports = setup;  // 直接导出logger*/

/*// --------------------------------构建路由中间件组件--------------------------------
var connect = require('connect');
var app = connect();
var parse = require('url').parse;
var routes = { // 定义路由的对象
	GET: {
		'/users': function(req, res){console.log("OKI")
			res.end('yll, ziv, lxj');
		},
		'user/:id':function(req, res){
			res.end('user' + id);
		}
	},
	DELETE: {
		'/user/:id': function(req, res, id){
			res.end('deleted user ' + id);
		}
	}
};
app.use(router(routes)) // 将路由对象传递给路由器的setup函数
	.listen(4006);
console.log('http://localhost:4006/users');
function router(obj){  // 路由器组件
	return function(req, res, next){
		if(!obj[req.method]){
			next();
			return;
		}
		var routes = obj[req.method];
		var url = parse(req.url);
		var paths = Object.keys(routes); // 将req.method对应的路径存放到数组中:[/users,user/:id]
		for(var i = 0; i < paths.length; i++){ // 遍历路径
			var path = paths[i];
			var fn = routes[path];
			path = path
				.replace(/\//g,'\\/')
				.replace(/:(\w+)/g, '([^\\/]+)');
			console.log(path);
			var re = new RegExp('^' + path + '$'); // 构造正则表达式
			var captures = url.pathname.match(re);
			if(captures){
				var args = [req, res].concat(captures.slice(1)); // 传递被捕获的分组
				fn.apply(null, args);
				return; // 当有匹配的函数时，返回，防止后续的next()调用
			}
		}
		next();
	}
}*/

/*//  --------------------------------构建一个重写URL的中间件组件 --------------------------------
// 任务：接受/blog/posts/my-post-title请求，根据文章标题查找ID，然后将URL转换成/blog/posts/id。
var path = url.parse(req.url).pathname;
function rewrite(req, res, next){
	var match = path.match(/^\/blog\/posts\/(.+)/)
	if(match){ // 只针对/blog/posts请求查找
		findPostIdBySlug(match[1], function(err, id){
			if(err) {
				return next(err);
			}
			if(!id){
				return next(new Error('User not found'));
			}
			req.url = '/blog/posts/' + id; // 重写req.url属性，使得后续中间件调用真是ID
			next();
		});
	}else{
		next();
	}
}*/

//  -------------------------------- 使用错误处理中间件--------------------------------

/*// Connect的默认错误处理器
var connect = require('connect');
var app = connect();
app
	.use(function hello(req, res){
		foo();
		res.setHeader('Content-Type', 'text/plain');
		res.end('hello world');
		next(err);
	})
	.use(function hi(req,res){console.log('ht');}) // 上一个出错，就会掉过这个
	.use(errorHandler()) //使用自定义错误处理代替默认错误处理
	.listen(4007);
console.log('http://localhost:4007');

// 自行处理程序错误
function errorHandler(){
	var env = process.env.NODE_ENV || 'development';  // 用NODE_ENV设定程序的模式
	return function(err, req, res, next){
		res.statusCode = 500;
		switch(env){
			case 'development':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err));
				break;
			default:
				res.end('Server error');
		}
	}
}*/

// 使用多个错误处理中间件
var connect = require('connect');
var api = connect()
	.use(users)
	.use(pets)
	.use(errorHandler); // 处理来自api的所有错误
connect()
	.use(hello)
	.use('/api',api)
	.use(errorPage) // 处理来自主程序app的所有错误
	.listen(4008);

// 实现hello组件：匹配'/hello'
function hello(req, res, next){
	if(req.url.match(/^\/hello/)){
		res.end('hello world\n');
	}else{
		next();
	}
}

// 实现users中间件：在数据库中搜索用户
var db = {
	users: [
		{ name: 'tobi' },
		{ name: 'loki' },
		{ name: 'jane' }
	]
};
function users(req, res, next){
	var match = req.url.match(/^\/user\/(.+)/);
	if(match){
		var user = db.users[match[1]];
		if(user){ // 判断用户是否存在
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(user));
		}else{
			var err = new Error('User not found');
			err.notFound = true;
			next(err);
		}
	}else{
		next();
	}
}

// 实现pets中间组件
function pets(req, res, next){
	if(req.url.match(/^\/pet\/(.+)/)){
		foo(); // 未定义的foo()函数会触发异常，但是不会有err.notFound属性
	}else{
		next();
	}
}

// 实现errorHandler中间件，带有上下文信息的错误消息
function errorHandler(err, req, res, next){
	console.error(err.stack);
	res.setHeader('Content-Type', 'application/json');
	if(err.notFound){
		res.statusCode = 404;
		res.end(JSON.stringify({error: err.message}));
	}else{
		res.statusCode = 500;
		res.end(JSON.stringify({error: 'Internal Server Error'}));
	}
}

// 实现errorPage中间件

