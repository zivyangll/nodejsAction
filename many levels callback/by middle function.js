var http = require('http');
var fs   = require('fs');

var server = http.createServer(function(req,res){
    getTitles(res);  // give getTitles the control power
}).listen(3000,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');

function getTitles(res){
    fs.readFile('./title.json',function(err,data){
        if(err){
            return hadError(err,res); // ”–¥ÌŒÛ”–æ°‘Á∑µªÿ
        }else{
            getTemplate(JSON.parse(data.toString()),res);
        }
    });
}

function getTemplate(titles,res){
    fs.readFile('./template.html',function(err,data){
        if(err){
            return hadError(err,res);
        }else{
            formatHTML(titles,data.toString(),res);
        }
    });
}

function formatHTML(titles,tmp,res){
    var html = tmp.replace('%',titles.join('</li><li>'));
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err,res){
    console.err(err);
    res.end('Server Error');
}