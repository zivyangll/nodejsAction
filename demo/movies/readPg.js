var pg = require('pg');
var http = require('http');
var conString = "tcp://postgres:admin@localhost:5432/movie"; // 连接字符串="tcp:// 用户名 : 密码 @localhost:5432/ 库名";
var client = new pg.Client(conString);
var movies = null;

// 连接数据库
client.connect(function (error, results) {
	if (error) {
		console.log('ClientConnectionReady Error: ' + error.message);
		client.end();
		return;
	}
	console.log('Connecting to postgres success...');
});


http.createServer(function (require, response) {
	response.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8',
		'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
		'Access-Control-Allow-Headers':'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
		'Access-Control-Allow-Origin':'*'
	});
	// 查询数据库
	client.query("select * from \"movie\" where douban_movie_lookedman>100000 order by random() limit 15", function (err, result) {
		//console.log(result.rows);
		movies = JSON.stringify(result.rows);
		response.end(movies);
	});
}).listen(3000, '192.168.2.113'); // or listen(3000,'127.0.0.1');

console.log("Server running at http://192.168.2.113:3000/");

/*

var xmlHttp;
function createxmlHttpRequest() {
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}
function doGet(url) {
	createxmlHttpRequest();
	xmlHttp.open("GET", url);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function () {
		if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
			alert('success');
		} else {
			alert('fail');
		}
	}
}
doGet("http://192.168.2.113:3000/")
*/
