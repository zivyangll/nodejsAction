// 获取JSON文件中的标题并渲染Web页面

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('./title.json', function (err, data) {
            if (err) {
                console.log('fault');
                res.end('Server Error');
            } else {
                var titles = JSON.parse(data.toString());
                fs.readFile('./template.html', function (err, data) {
                    if (err) {
                        console.log('fault');
                        res.end('Server Error');
                    } else {
                        var tempHtml = data.toString();
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.write(tempHtml.replace('%', titles.join('</li><li>')));
                        res.end();
                    }
                })
            }
        })
    }
}).listen(3000);
console.log('Server running at http://localhost:3000');