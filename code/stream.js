//流可以：创建代理服务器，流服务器，操作文件上传的服务（图像调整，视频编码转换等）
//流是移动数据的高校方式：来自流的数据在其完成操作之前就可以使用了。
//包括：标准输入，标准输出，标准错误
//在Linux中，sort < test.txt 将对test中的文本进行排序，并输出到终端
//sort < test.txt > sorted.txt   将排序后的结果重定向，输出到sorted文件中

/* //使用流来读写文件,若想读入所有数据，必须将其连接到一个变量中。
var fs = require("fs");
var stream = fs.ReadStream("../data/a.txt");
var data = "";
stream.on("data",function(chunk){
    data += chunk;
    console.log("read some data");
});
stream.on("close",function(){
    console.log("all the data is read");
     console.log(data)
});*/

/*// 使用流读入文件，然后写入另一个文件
var fs = require("fs");
var readableStream = fs.ReadStream("../data/a.txt");
var writableStream = fs.WriteStream("../data/out.txt");
readableStream.setEncoding("utf8");
readableStream.on("data",function(chunk){
    writableStream.write(chunk);
});
readableStream.on("close",function(){
    writableStream.end();
});*/

/*// 通过管道连接流：Node.js提供了连接两个可读和可写流，并在它们之间通过管道传输数据的方法：pipe()，缓冲区被用于读写流中的数据
var fs = require("fs");
var readableStream = fs.ReadStream("../data/a.txt");
var writableStream = fs.WriteStream("../data/out.txt");
readableStream.pipe(writableStream);*/

/*// 流的MP3服务器
// 在HTTP模块中，响应对象是一个可写流，它可以让文件以可读流的方式读入，然后经过管道成为进入响应对象的可写流
// pipe()可以处理所需要的暂停和恢复，使用流可以使得MP3文件可以先读，然后通过管道输送到响应中
var http = require("http");
var fs   = require("fs");
http.createServer(function(req,res){
    var mp3 = "../data/慢慢.mp3";
    var stat = fs.statSync(mp3);
    res.writeHead(200,{
        "Content-Type":"audio/mpeg",
        "Content-Length":stat.size
    });
    var readableStream = fs.createReadStream(mp3);
    readableStream.pipe(res);
}).listen(3000,"127.0.0.1");
console.log("Server is running at 'http://127.0.0.1:3000'")*/

/*// 图片流
var fs = require('fs');
var stream = fs.createReadStream('../data/a.jpg');
stream.on('data',function(chunk){
    console.log(chunk.toString().length);
});
stream.on('end',function(){
    console.log('end');
});
console.log("执行位置");*/

/*// 流的图片服务器
var http = require('http'),
    fs   = require('fs');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'image/jpg'});
    fs.createReadStream('../data/a.jpg').pipe(res);
}).listen(3000);
console.log("Server running at http://localhost:3000/");*/

/*// 使用流下载文件到本地
var http = require("http");
var fs   = require("fs");
var writableStream = fs.WriteStream("../data/download.jpg");
var address = "http://www.baidu.com/img/bd_logo1.png";
var request = http.get(address,function(res){
    res.on("data",function(chunk){
        writableStream.write(chunk);
        console.log("get data");
    });
    res.on("end",function(){
        console.log("over")
    });
    res.on("error",function(err){
        console.log("error : ",err.message);
    });
});*/




