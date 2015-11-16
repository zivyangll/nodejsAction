// 异步编程：网络、文件、流，定时器操作等为异步操作

/* // --------------高阶函数：把函数作为参数，或者将函数作为返回值------------------------
 function foo(x){
 return function(){
 return x;
 }
 }
 // sort函数接受一个方法作为参数参与运算
 var points = [ 40, 100, 1, 5, 25, 10 ];
 points.sort(function(a,b){
 return a -b; //从小到大排序
 });
 console.log(points); // [ 1, 5, 10, 25, 40, 100 ]*/

// --------------偏函数：------------------------
/*// 传统方式的类型判断
 var toString = Object.prototype.toString;
 var isString = function(obj){
 console.log(toString.call(obj)); // 使用Object.prototype.toString.call()进行类型判断
 return toString.call(obj) == '[object String]';
 };
 console.log(isString(33));
 console.log(isString("sdf"));
 var isFunction = function(obj){
 return toString.call(obj) == '[object Function]';
 };
 console.log(isFunction(toString)); // 每个类型都需要重复定义is***函数*/

/*// 使用偏函数创建函数工厂
 var isType = function(type){
 return function(obj){
 return toString.call
 }
 };
 var isString = isType('String'); // 通过部分参数来产生一个新的定制函数的形式
 var isFunction = isType('Function');*/

/*// 在underscore库中的after()方法是偏函数的应用
 _after = function(times, func){ // 生成一个需要调用多次才真正执行实际函数的函数
 if(times <= 0) return func();
 return function(){
 if( --times < 1){
 return func.apply(ths, arguments);
 }
 }
 };*/

//-----------------异步编程解决------------------------------
/*// 通过事件/订阅
 emitter.on("event1",function(message){
 console.log(message);
 });
 emitter.emit("event1","I am message")*/;

/*// 雪崩问题：高访问量，大并发量的情况下缓存失效的情景
var select = function(callback){
 db.select("SQL",function(results){
  callback(results);
 })
};

// 通过事件队列解决以上雪崩问题
var events =require("events");
var proxy = new events.EventEmitter();
var status = "ready"; // 添加状态锁
var select = function(callback){
 proxy.once("selected", callback); // 利用once将请求的回调都压入事件队列中
 if(status == "ready"){
  status = "pending";
  db.select("SQL",function(results){ //
   console.log("ds");
   proxy.emit("selected",results);
   status = "ready";
  })
 }
};*/



/*// 网络、文件、流等为异步I/O操作，除此之外，还有一些与I/O无关的异步API
 // 如： setTimeout()、setInterval()、setImmediate()、process.nextTick()
 setTimeout(function(){
 console.log("只执行一次");
 },1000);

 setInterval(function(){
 console.log("重复执行")
 },1000);

 setImmediate(function(){ // 属于check观察者
 console.log("setImmediate延迟");
 },0);
 process.nextTick(function(){ // 属于idle观察者,在每一轮循环检查中,idle > I/O > check
 console.log("nextTick延迟")
 },0);
 console.log("正常执行");*/

//



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
// ---------------------方式1：通过函数数组实现执行顺序的控制---------------------------------------------------------
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

/* // ---------------------方式2：通过深层回调实现串行流程控制，先输出1000，然后500，最后100---------------------------------------------------------
setTimeout(function () {
    console.log('1000ms');
    setTimeout(function () {
        console.log('500ms');
        setTimeout(function () {
            console.log('100ms');
        }, 100)
    }, 500)
}, 1000);*/

/* // ---------------------方式3： 使用Nimble流程控制工具--------------------------------------------------------
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

/* // ---------------------方式4：使用async流程控制工具：串行执行--------------------------------------------------------
// 前一个结果是后一个调用的输入时，series方法无法满足需求，需要用waterfall()方法
var async = require('async');
var fs    = require('fs');
async.series([
    function(callback){ // 每个callback将结果保存起来
     fs.readFile('../data/b.txt','utf-8',callback);
    },
    function(callback){
     fs.readFile('../data/a.txt','utf-8',callback);
    }
],function(err,results){ // 保存的结果以数据方式传入
      console.log(results);
    }
);*/

/* // ---------------------方式5：使用async流程控制工具：串行执行，前一个结果是后一个调用的输入--------------------------------------------------------
 var async = require('async');
 var fs    = require('fs');
 async.waterfall([
	 function(callback){ // 每个callback将结果保存起来
		 fs.readFile('../data/b.txt','utf-8',function(err,content) {
			 callback(err, content);
		 });
	 },
	 function(arg1,callback){
		 console.log("arg1: " + arg1);
		 fs.readFile('../data/a.txt','utf-8',function(err,content) {
			 callback(err, content);
		 });
	 }
 ],function(err,results) { // 得到最后的结果
	 console.log("results: " + results);
 });*/

/*// ---------------------方式5：使用async流程控制工具：串行执行，处理复杂依赖关系-----------------------
// connectMongoDB和connectRedis依赖readConfig, uploadAsserts依赖complieAsserts，startup依赖所有完成
var deps = {
	readConfig: function(callback){
		// 执行读配置文件操作
		callback();
	},
	connectMongoDB: ['readConfig',function(callback){
		// 连接mongodb操作
		callback();
	}],
	connectRedis: ['readConfig',function(callback){
		// 连接redis操作
		callback();
	}],
	complieAsserts: function(callback){
		// 编译asserts
		callback();
	},
	uploadAsserts: ['complieAsserts',function(callback){
		// 载入assert
		callback();
	}],
	startup: ['connectMongoDB','connectRedis','uploadAsserts',function(callback){
		// startup
	}]
};
var async = require('async');
async.auto(deps);// auto能根据依赖关系自动分析，以最佳顺序执行以上业务*/


/*// 使用async流程控制工具：并行执行，使用parallel()方法
var async = require('async');
var fs    = require('fs');
async.parallel([
 function(callback){ // 每个callback将结果保存起来
  fs.readFile('../data/b.txt','utf-8',callback);
 },
 function(callback){
  fs.readFile('../data/a.txt','utf-8',callback);
 }
],function(err,results){ // 保存的结果以数据方式传入
 console.log(results);
});*/

/*// async 提供用于处理异步调用限制的方法：parallelLimit()
var async = require('async');
var fs    = require('fs');
async.parallelLimit([
 function(callback){ // 每个callback将结果保存起来
  fs.readFile('../data/b.txt','utf-8',callback);
 },
 function(callback){
  fs.readFile('../data/a.txt','utf-8',callback);
 }
],1,function(err,results) { // limit参数限制任务只能同时并发一定数量，而不是无限制并发
 console.log(results);
});*/

/*// parallelLimit()无法动态增加并行任务，async提供queue()方法可以，用于遍历文件目录等操作
var async = require('async');
var fs    = require('fs');
var q = async.queue(function(file,callback){
 fs.readFile(file,'utf-8',callback);
},2);
q.drain = function(){
 // 完成了队列中的所有任务
};
fs.readdirSync('.').forEach(function(file){
 q.push(file,function(err,data){
  // TODO
 });
});
*/

/*// ---------------------方式6：使用Step流程控制工具：串行执行，调用上一个结果-----------------------
var Step = require('step');
var fs   = require('fs');
Step(
	function readFile1(){ // 每个callback将结果保存起来
		fs.readFile('../data/b.txt','utf-8',this);
	},
	function readFile2(err, content){
		console.log(content); // 上一个函数的调用结果
		fs.readFile('../data/a.txt','utf-8',this);
	},
	function done(err, content) {
		console.log(content); // 上一个函数的调用结果
	}
);*/

/*// ---------------------方式6：使用Step流程控制工具：并行执行，调用上一个结果-----------------------
var Step = require('step');
var fs   = require('fs');
Step(
	function readFile1(){
		fs.readFile('../data/a.txt','utf-8',this.parallel());
		fs.readFile('../data/b.txt','utf-8',this.parallel()); // parallel告诉step需要等待所有任务完成时才进行下一个任务
	},
	function done(err, content1,content2) { // 依次上以上函数的调用结果
		console.log(arguments);  // { '0': undefined, '1': 'a', '2': 'b' }
	}
);*/

/*// ---------------------方式6：使用Step流程控制工具：结果分组-----------------------
var Step = require('step');
var fs   = require('fs');
Step(
	function readDir(){
		fs.readdir('../data',this); // 读取目录
	},
	function readFile(err,results){
		if(err) throw err;
		var group = this.group(); // 告诉Step要并行执行
		results.forEach(function(filename){
			if(/\.txt$/.test(filename)){
				fs.readFile('../data/' + filename, 'utf8',group()); // 这个group将生成一个回调函数，接受返回值将会按组存储
			}
		});
	},
	function showAll(err, files){ // files保存所有读取文件后的结果
		if(err) throw err;
		console.dir(files);
	}
);*/
