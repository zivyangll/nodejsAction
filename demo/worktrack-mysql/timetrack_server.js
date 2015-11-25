var http = require('http');
var mysql = require('mysql');

var db = mysql.createConnection({ // 连接mysql
	host:	'localhost',
	user:	'admin',
	password:'mysql',
	database:'timetrack'
});

var server = http.createServer(function(req,res){
	switch(req.method){
		case 'POST':
			switch(req.url){
				case '/':
					addDate(db,req,res);
					break;
				case '/archive':
					archiveDate(db,req,res);
					break;
				case '/delete':
					deleteDate(db,req,res);
					break;
			}
			break;
		case 'GET':
			switch(req.url){
				case '/':
					show(db,res);
					break;
				case '/archived':
					showArchived(db,res);
					break;
			}
			break;
	}
});

// 创建数据库表，所有sql语句都用query函数执行
db.query(
	"create table if not exists work (" +
	"id  int(10) NOT NULL AUTO_INCREMENT," +
	"hours  decimal(5,2) DEFAULT 0 ," +
	"date  DATE ," +
	"archived  int(1) DEFAULT 0 ," +
	"description  longtext ," +
	"PRIMARY KEY (id)" +")",
	function(err){
		if(err) throw err;
		console.log('Server started at http://127.0.0.1:3000');
		server.listen(3000,'127.0.0.1');
	}
);

var qs = require('querystring');

// ---------------------------------辅助函数--------------------------------

var  sendHtml = function(res,html){ // 发送HTML响应
	res.setHeader('Content-Type', 'text/html;charset="utf-8"');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
};

var parseReceivedData = function(req, cb) { // 解析HTTP POST数据
	var body = '';
	req.setEncoding('utf-8');
	req.on('data',function(chunk){
		body += chunk;
	});
	req.on('end',function(){
		var data = qs.parse(body);
		console.log(data);
		cb(data);
	});
};

var actionForm = function(id, path, label){ // 渲染简单的表单
	var html = '<form method="POST" action="' + path + '">' +
		'<input type="hidden" name="id" value="' + id + '">' +
		'<input type="submit" value="' + label + '" />' +
		'</form>';
	return html;
};

// ---------------------------------Mysql中添加数据--------------------------------
var addDate = function(db, req, res){
	parseReceivedData(req, function(work){
		db.query( // 添加到查询语句之前，query方法会自动把参数转义，防止遭受sql注入攻击
			'insert into work (hours, date, description) values (?, ?, ?)',  // 向mysql插入数据,?用来指明应该把参数放在哪里的占位符
			[work.hours, work.date, work.description],
			function(err){
				if (err) throw err;
				show(db, res); // 显示工作清单
			}
		);
	});
};

// ---------------------------------Mysql中删除数据--------------------------------
var deleteDate = function(db, req, res){
	parseReceivedData(req, function(work){
		db.query(
		'delete from work where id =?',[work.id],function(err){
			if(err) throw err;
			show(db, res); // 显示工作清单
		});
	});
};

// ---------------------------------Mysql中更新数据--------------------------------
var archiveDate = function(db, req, res){ // 将它标记为已归档
	parseReceivedData(req, function(work){
		db.query(
			'update work set archived=1 where id=?',[work.id],function(err){ // 更新数据
				if(err) throw err;
				show(db, res);
			}
		);
	});
};

// ---------------------------------Mysql中获取数据--------------------------------
var show = function(db, res, showArchived){
	var query = 'select * from work ' +
		'where archived=? ' +
		'order by date DESC';
	// console.log("showArchived" + showArchived); // undefined
	var archiveValue = (showArchived) ? 1 : 0; // 默认为0
	db.query(
		query,[archiveValue],function(err, rows){
			// console.log(JSON.stringify(rows))
			if(err) throw err;
			html = (showArchived) ? '' : '<a href="/archived">Archived Work</a><br/>';
			html += workHitlistHtml(rows);
			html += workFormHtml();
			sendHtml(res,html);
		}
	);
};
var workHitlistHtml = function(rows){ // 渲染mysql记录为表格
	var html = '<table>';
	for(var i in rows){
		html += '<tr>';
		html += '<td>' + rows[i].date + '</td>';
		html += '<td>' + rows[i].hours + '</td>';
		html += '<td>' + rows[i].description + '</td>';
		if(!rows[i].archived){
			html += '<td>' + workArchiveForm(rows[i].id) + '</td>';
		}
		html += '<td>' + workDeleteForm(rows[i].id) + '</td>';
		html += '</tr>';
	}
	html += '</table>'
	return html;
};

var workFormHtml = function(){
	var html = '<form method="POST" action="/">' +
		'<p>Date (YYY-MM-DD):<br/><input name="date" type="text"><p/>' +
		'<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
		'<p>Description:<br/>' +
		'<textarea name="description"></textarea></p>' +
		'<input type="submit" value="Add" />' +
		'</form>';
	return html;
};

var showArchived = function(db, res){
	show(db, res, true);  // 只显示归档的工作记录
};

var workArchiveForm = function(id){ // 渲染归档按钮表单
	return actionForm(id,'/archive','Archive');
};

var workDeleteForm = function(id){ // 渲染删除按钮表单
	return actionForm(id,'/delete','Delete');
}



