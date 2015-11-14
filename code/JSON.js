//JSON:JavaScript对象标记：轻量级的数据交换格式，由Douglas Crockford发明。
//JSON的键值对用逗号分开，键值对可以嵌套，创建更为复杂的数据结构。键值对必需位于双引号内才有效。{"name":"yll","age":"22"}

/*//使用Node.js通过JSON发送数据服务，必须将头Header设置为application/json,普通的为text/plain,设置为application/text会下载文本。
var http = require("http");
http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end('{"name":"yll","age":"22","home":"huozhou"}');
}).listen(3000,"127.0.0.1");
console.log("Server is running at 'http://127.0.0.1:3000'");*/

/*// 将javaScript对象obj转换为JSON字符串:JSON.stringify(obj)
// 将Json字符串转换为JSON对象：JSON.parse(json)
var obj = {
    name:"yll",
    age :"22"
};
myJsonString = JSON.stringify(obj);//将javaScript对象obj转换为JSON字符串
console.log(myJsonString);//输出{"name":"yll","age":"22"} 字符串
myJsonObj = JSON.parse(myJsonString);//将Json转换为JSON对象
console.log(myJsonObj.age); //输出22*/

// 调用第三方API，返回JSON数据进行解析
var http = require("http");
var data = "";
var options = {
    host:"ip.taobao.com",
    path:"/service/getIpInfo.php?ip=63.223.108.42"
};
var request = http.get(options,function(res){
    res.on("data",function(chunk){
        console.log(chunk.toString())
        data += chunk.toString();
    });
    res.on("end",function(){
        ipdata = JSON.parse(data);
        console.log('the ip is come from :' + ipdata.data.country);
    });
    res.on("error",function(err){
        console.log("there was an error: " + err.message);
    })
});
