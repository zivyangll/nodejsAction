
/*// 回调的顺序不可预知
 // 从磁盘读取的两个文件先返回，因为无需进入网络
 // 回调首先是负责解决不可预测性的方法，它也是处理并发（一次做多件事情）的高效方法。
 var fs = require("fs"),
 http = require("http");

 http.get({host:"baidu.com"}, function (res) {
 console.log("baidu.com");
 }).on("error",function(e){
 console.log(e.message);
 });

 http.get({host:"taobao.com"}, function (res) {
 console.log("taobao.com");
 }).on("error",function(e){
 console.log(e.message);
 });

 fs.readFile("../../data/a.txt","utf8",function(err,data){
 if(err) throw err;
 console.log(data);
 });

 http.get({host:"douban.com"}, function (res) {
 console.log("douban.com");
 }).on("error",function(e){
 console.log(e.message);
 });

 fs.readFile("../../data/b.txt","utf8",function(err,data){
 if(err) throw err;
 console.log(data);
 });*/

/*// 同步意味着每次执行一个操作，在一个操作完成之前，代码的执行会被堵塞，无法移到下一个操作上
// 通过函数数组实现执行顺序的控制
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilenameA = './data/a.txt';
var configFilenameB = './data/b.txt';

function checkFileA(){
    fs.exists(configFilenameA,function(exists){
        if(!exists){
            return next(new Error('Missing RSS File: ' + configFilename));
        }else{
            console.log('checkFileA');
            next(null,configFilenameA);
        }
    })
}

function readFileA(configFilenameA){
    fs.readFile(configFilenameA,function(err,data){
        if(err) return next(err);
        console.log('readFileA'+','+ data);
        next(null);
    })
}

function checkFileB(){
    fs.exists(configFilenameB,function(exists){
        if(!exists){
            return next(new Error('Missing RSS File: ' + configFilename));
        }else{
            console.log('checkFileB');
            next(null,configFilenameB);
        }
    })
}

function readFileB(configFilenameB){
    fs.readFile(configFilenameB,function(err,data){
        if(err) return next(err);
        console.log('readFileB'+ ','+ data);
    })
}
function next(err,result){
    if(err) throw err;
    var currentTask = tasks.shift(); // 从任务数组取下个数组
    if(currentTask){
        currentTask(result);
    }
}

var tasks = [
    checkFileA,
    readFileA,
    checkFileB,
    readFileB
];
next(); // 开始串行执行任务*/

/*// 事件循环
// 事件循环使得系统可以将回调函数先保存起来，而后当事件在将来发生时再运行，因为回调函数的执行被推迟到事件发生之后，
// 于是就无需停止执行，控制流可以返回到Node运行时环境，从而让其他事情发生.
// 核心思想：将代码围绕着事件来架构，而不是按照期待中的输入顺序来架构。
// Node.js不适合：处理大量数据或者长时间运行计算等，Node.js旨在网络中推送数据并瞬间完成。与之类似的为java的vertx
var http = require("http");
function fetchPage(){
    console.log("fetching page");
    http.get({host:"douban.com"},function(res){//要爬的网址
        console.log("data returned from page");
        res.on("data",function(d){//返回该网页的源码
            process.stdout.write(d)//将网页源码输出
        })
    }).on("error",function(e){
        console.log("There was an error " + e)
    })
}
function fetchapi(){
    console.log("fetching api");
    http.get({host:"movie.douban.com"},function(res){
        console.log("data returned from the api");
    }).on("error",function(e){
        console.log("There was an er ror " + e);
    })
}
fetchPage();
fetchapi();*/
