/*// 回调的顺序不可预知
// 从磁盘读取的两个文件先返回，因为无需进入网络
// 回调首先是负责解决不可预测性的方法，它也是处理并发（一次做多件事情）的高效方法。
var fs = require("fs"),
    http = require("http");

http.get({host: "baidu.com"}, function (res) {
 console.log("baidu.com");
}).on("error", function (e) {
 console.log(e.message);
});

http.get({host: "taobao.com"}, function (res) {
 console.log("taobao.com");
}).on("error", function (e) {
 console.log(e.message);
});

fs.readFile("../../data/a.txt", "utf8", function (err, data) {
 if (err) throw err;
 console.log(data);
});

http.get({host: "douban.com"}, function (res) {
 console.log("douban.com");
}).on("error", function (e) {
 console.log(e.message);
});

fs.readFile("../../data/b.txt", "utf8", function (err, data) {
 if (err) throw err;
 console.log(data);
});*/

/*// 同步意味着每次执行一个操作，在一个操作完成之前，代码的执行会被堵塞，无法移到下一个操作上
// 通过函数数组实现执行顺序的控制
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilenameA = './data/a.txt';
var configFilenameB = './data/b.txt';

function checkFileA() {
 fs.exists(configFilenameA, function (exists) {
  if (!exists) {
   return next(new Error('Missing RSS File: ' + configFilename));
  } else {
   console.log('checkFileA');
   next(null, configFilenameA);
  }
 })
}

function readFileA(configFilenameA) {
 fs.readFile(configFilenameA, function (err, data) {
  if (err) return next(err);
  console.log('readFileA' + ',' + data);
  next(null);
 })
}

function checkFileB() {
 fs.exists(configFilenameB, function (exists) {
  if (!exists) {
   return next(new Error('Missing RSS File: ' + configFilename));
  } else {
   console.log('checkFileB');
   next(null, configFilenameB);
  }
 })
}

function readFileB(configFilenameB) {
 fs.readFile(configFilenameB, function (err, data) {
  if (err) return next(err);
  console.log('readFileB' + ',' + data);
 })
}
function next(err, result) {
 if (err) throw err;
 var currentTask = tasks.shift(); // 从任务数组取下个数组
 if (currentTask) {
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

/*// 串行流程控制，先输出1000，然后500，最后100
setTimeout(function () {
    console.log('1000ms');
    setTimeout(function () {
        console.log('500ms');
        setTimeout(function () {
            console.log('100ms');
        }, 100)
    }, 500)
}, 1000);*/

/*// 使用Nimble流程控制工具
var nimble = require('nimble');
nimble.series([  // 给nimble一个函数数组，挨个执行
 function (callback) {
  setTimeout(function () {
   console.log('1000ms');
   callback();
  }, 1000)
 },
 function (callback) {
  setTimeout(function () {
   console.log('500ms');
   callback();
  }, 500)
 },
 function (callback) {
  setTimeout(function () {
   console.log('100ms');
   callback();
  }, 100)
 }
]);*/



