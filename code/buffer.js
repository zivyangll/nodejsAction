//需要进行二进制传输的示例有 ：通过TCP连接发送和接收数据，从图像或者压缩文件读取二进制数据；从文件系统读写数据，处理来自网络的二进制数据流。
//Buffer模块可以存储二进制数据，若不设置文件编码，则输出原始Buffer对象：<Buffer 6d 79 20 6e 61 6d 65 20 69 73 20 79 61 6e 67 6c 6f 6e 67 6c 6f 6e 67 2e 0a>
// Buffer内存分配不是在V8的堆内存中，而是在C++层面实现内存的申请，采用slab分配机制

/*//设置编码：fs.readFile("a.txt","utf8",function(err,data){}); 包括ascii,ucs3,base64,hex,utf8
var fs = require("fs");
fs.readFile("../data/a.txt",function(err,data){
	if(err){
		throw err;
	}else{
		console.log(data);
		console.log(data.toString("utf8"));
	}
});*/

/*// 设置编码函数：
var fs = require('fs');
var rs = fs.createReadStream('../data/a.txt',{highWaterMark: 11});
rs.setEncoding('utf8');*/

/*// Buffer不支持的编码
console.log(Buffer.isEncoding('GBK')); // 测试Buffer是否支持'GBK'编码

// 若Buffer不支持编码，使用iconv-lite库进行编码类型转换
var iconv = require('iconv-lite');
var buf = new Buffer(" 创建","utf8");
//console.log(buf.toString());
var str = iconv.decode(buf,'utf8'); // Buffer转字符串
console.log(str);
var buf = iconv.encode(str,'GBK'); //字符串转 Buffer
console.log(buf.toString());*/


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

/*
// 正确的拼接Buffer应该使用Buffer.concat()方法
var chunks = [];
var size = 0;
var fs = require('fs');
fs.readFile('../data/a.txt',function(err,data){
	data.on('data',function(chunk){
		chunks.push(chunk);
		size += chunk.length;
	});
	data.on('end',function(){
		var buf = Buffer.concat(chunks,size);
		var str = iconv.decode(buf,'uft8');
		console.log(str);
	});
});
*/
