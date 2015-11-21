var express  = require('express');
var mongoose = require('mongoose');
var express  = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app      = express();

app.set('views', __dirname + '/views'); // 设置模板文件夹
app.set('view engine', 'jade'); // 设置模版引擎，支持jade、ejs、coffescript，jQuery template等模版
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret:'OSDJLFJDSJSDJLKJFLKS'}));


mongoose.connect('mongodb://localhost/todo_development',function(err){ // 确定连接到mongo数据库中
	if(!err){
		console.log('connected to MongoDB');
	}else{
		throw err;
	}
});

function validatePresenceOf(value){ // 确保用户输入不能为空
	return value &&  value.length;
}

// 定义文档-也就是数据库表
var Schema = mongoose.Schema;
var myTask = new Schema({ // 定义文档
	task	: { type: String, validate: validatePresenceOf} // 验证数据
});
var Task = mongoose.model('Task',myTask); // 创建一个新的任务

// 添加路由
app.get('/tasks',function(req,res){
	Task.find({},function(err,docs){ // 显示所有数据
		res.render('index',{
			title: 'Todos index view',
			docs : docs 			  // 将docs传递给index.jade，每个docs为为{ __v: 0, task: 'sssss', _id: 564fc76297bcc5805564b251 },
		});
		//console.log(docs);
	});
});

app.get('/tasks/new',function(req,res){
	res.render('new',{
		title: 'New task'
	});
});

app.post('/tasks',function(req,res){ // 处理新任务的post请求
	var task = new Task(req.body.mytaskinstance); //通过body-parser将其解析为json
	console.log(req.body);
	task.save(function(err){
		if(!err){
			res.redirect('/tasks');
		} else{
			res.redirect('/tasks/new');
		}
	})
});

app.get('/tasks/:id/edit',function(req,res){ // 编辑任务
	console.log(req.params)
	Task.findById(req.params.id, function(err,doc){ // 这个id如何得到
		res.render('edit',{
			title: 'Edit Task View',
			task: doc
		});
	});
});

app.post('/tasks/:id',function(req,res){ // 编辑任务
	Task.findById(req.params.id, function(err,doc){ // 这个id如何得到
		doc.task = req.body.mytaskinstance.task;
		doc.save(function(err){
			if(!err){
				res.redirect('/tasks');
			} else{
				console.log("err");
			}
		});
	});
});

app.get('/tasks/:id/delete',function(req,res){ // 删除任务
	Task.findById(req.params.id, function(err, doc){
		if(!doc) {
			return next(
				new NotFound('Document not found')
			)
		} else{
			doc.remove(function() {
				res.redirect('/tasks');
			})
		}
	})
});



// 启动服务
var server = app.listen(5000,function(){
	var port = server.address().port;
	console.log('Server running at http://localhost:%s/tasks',port)
});
