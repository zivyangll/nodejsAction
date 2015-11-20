var express = require('express');
var router = express.Router();

router.use(function timeLog(req,res,next){ // 该路由使用中间件
	console.log('Time: ', Date.now());
	next();
});

router.get('/',function(req,res){ // 定义网站主页的路由
	res.send('ziv home page');
});

router.get('/about',function(req,res){ // 定义 about 页面的路由
	res.send('About birds');
});

var app = express();
app.use('/ziv', router);
var server = app.listen(5500, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s/ziv', port);
});