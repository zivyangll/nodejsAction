var http = require('http');
var work = require('./lib/timetrack');
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
					work.add(db,req,res);
					break;
				case '/archive':
					work.archive(db,req,res);
					break;
				case 'delete':
					work.delete(db,req,res);
					break;
			}
			break;
		case 'GET':
			switch(req.url){
				case '/':
					work.show(db,res);
					break;
				case '/archive':
					work.showArchived(db,res);
					break;
			}
			break;
	}
});