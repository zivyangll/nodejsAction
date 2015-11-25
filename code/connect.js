// 中间件connect是中间件的模块化组件，可以拦截HTTP服务器提供的请求和响应对象，执行逻辑，然后传递给下一个中间件或者结束响应
// 通过中间件组件用来请求日志、静态文件服务、请求体解析、会话管理等，express是构建在connect基础上
// 中间件组件是一个js函数，接受三个参数：req请求对象，res响应对象，next回调函数（表示完成工作，进行下一个中间件）

// 最小的connect程序
var connect = require('connect');
var app = connect(); // 返回connect裸程序，没有中间件，也就没有响应，返回404
app.use(logger); // 通过use方法将中间件传递给分配器
app.use(hello);  // 传递hello中间件
app.listen(4000);
console.log('http://localhost:4000');

// 定义logger日志中间件
function logger(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
}

// 响应'Hello World'中间件
function hello(req, res){ // 没有next回调，因为这个组件结束了HTTP响应
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
}

