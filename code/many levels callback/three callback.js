
// 回调的理解：类似于点餐，一个人点完餐拿号之后，就去一旁等着，其他人可以继续点餐拿到；等到饭菜做好之后叫号，那个人再拿号过来领餐。
// 回调：将函数B作为参数传递给函数A，在函数A执行完成后调用B执行，可以很好的支持并发、异步，以及控制执行顺序

/*
// 获取JSON文件中的标题并渲染Web页面，三层回调
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
console.log('Server running at http://localhost:3000');*/




