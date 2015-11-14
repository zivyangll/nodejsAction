//需要进行二进制传输的示例有 ：通过TCP连接发送和接收数据，从图像或者压缩文件读取二进制数据；从文件系统读写数据，处理来自网络的二进制数据流。
//Buffer模块可以存储二进制数据，若不设置文件编码，则输出原始Buffer对象：<Buffer 6d 79 20 6e 61 6d 65 20 69 73 20 79 61 6e 67 6c 6f 6e 67 6c 6f 6e 67 2e 0a>
//设置编码：fs.readFile("a.txt","utf8",function(err,data){}); 包括ascii,ucs3,base64,hex,utf8
var fs = require("fs");
fs.readFile("../data/a.txt",function(err,data){
    if(err){
        throw err;
    }else{
        console.log(data);
        console.log(data.toString("utf8"));
    }
});


/*// Node.js中的缓冲区是对原始内存的分配，以便于Node.js对此读写数据
var buffer = new Buffer(8);//创建带有8个字节的缓冲区
//得到buffer为：<Buffer 50 59 40 01 01 00 00 00>
//缓冲区所代表的是计算机上所分配的原始内存。
console.log(buffer);
//得到：'\u0000 \u0000\u0000\u0000\u0000\u0000\u0000'
var buffer = new Buffer([85,86]);//85是字符U
console.log(buffer.toString("utf8"));//将编码传递给缓冲区，输出字符UV*/

/*// 写入缓冲区，向缓冲区追加数据，复制缓冲区，修改缓冲区中的字符串
// Buffer模块没有提供修改字符串的方法，若想修改：使用toString()方法读缓冲区，对String对象执行修改，将修改后的字符串写会缓冲区
var buffer = new Buffer(8);
buffer.write("hi","utf8");//写入缓冲区，控制台中输出1，说明该编码占用1个字节
console.log(buffer.toString());
buffer.write(" buffer",2,"utf8");//向缓冲区追加数据,2表示偏移量（从0开始）
console.log(buffer.toString());//控制台输出hi buffer
var buffer2 = new Buffer(8);
buffer.copy(buffer2);//将buffer复制给buffer2
console.log(buffer2.toString());//控制台输出hi buffer*/
