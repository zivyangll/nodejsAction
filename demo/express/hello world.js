var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.end('Hello World');
});

var server = app.listen(5000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
