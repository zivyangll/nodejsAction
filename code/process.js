//当运行Node.js程序时，它运行于单个进程之上，进程id仅被指派了一小段时间，当执行完成后，进程就不存在了
console.log(process.pid) // 获取node的pid

/*// 捕获进程事件：能够让开发者了解在应用程序中通过正常的错误处理过程不曾遇到的问题
 process.on("exit",function(){ // 退出进程事件：exit
 console.log("exited");
 });
 process.on("uncaughtException",function(err){ // 捕获未捕获的异常：uncaughtException
 console.error(err.stack);
 });*/

//进程与信号：在linux中，进程可以接受信号，从而让进程可以以某种方式来响应
//向进程发送信号,在Linux中，使用kill向进程发送信号，如： kill -s SIGINT [process_id]

/*//process模块可以让Node.js侦听这些信号并据此响应
 process.stdin.resume();//防止脚本在初始化从stdin的读取时退出
 process.on("SIGINT",function(){ // SIGINT发送中断信,可以设置这些信号的侦听器并据此响应
 console.log("Got a SIGINT. Exiting"); // 在退出进程前可以关闭连接，写入日志文件，对下一个进程做些什么等等
 process.exit(0);//退出进程
 })*/

// 子进程是由另一个进程（父进程）创建的进程，一个父进程可以有许多子进程，一个子进程只能有一个父进程
// 使用子进程的场景：复杂计算，在Node.js外部使用系统工具操作数据，执行清理操作，执行复杂操作。
// 父进程与子进程数据交换：数据流通过stdin/stdout/sterr来交换。

/*// 在Node.js中使用ping程序，可以通过生成spawn一个子进程并通过侦听来自子进程的stdout来实现。
var spawn = require("child_process").spawn;
var ping = spawn("ping",["www.baidu.com"]); // 参数：Command(想要运行的命令),Arguments(传递给命令的任何参数),Options(工作目录／环境变了等)
ping.stdout.setEncoding("utf-8");//必须对指定数据进行编码，否则显示的是原始流
ping.stdout.on("data",function(data){
    console.log(data)
});*/

/*// 杀死子进程：Child Process模块提供了kill()方法，默认发送SIGTERM信号
// 例如父进程发送kill信号给子进程，父进程侦听子进程退出事件并做出处理
var spawn = require("child_process").spawn;
var ping = spawn("ping",["www.baidu.com"]);
ping.on("exit",function(code,signal){//侦听子进程退出事件
    console.log("child process was killed with a " + signal + "signal");
});
ping.kill("SIGINT");//中断子进程*/

/* // 与子进程进行通信：创建提供父子进行通信能力的方法：fork()——创建Node.js子进程，每个fork()的开销在于每个子进程是全新的V8实例。若与系统命令交互，则使用spawn()。
// 每个Node.js进程需要花费30ms启动，并占用10M内存。
var fork = require("child_process").fork;
var child = fork("../data/child.js");
child.on("message",function(m){
    console.log("p:",m);
});
child.send({message:"hello,child!"});*/

/*// 集群Cluster模块
//按计算机上可以使用的处理器数量来扩展应用程序，每个处理器都有一个子进程，还有一个父进程来管理它们。子进程常称为worker process
//Cluster模块中的fork()方法是建立在Child Process模块的fork()方法之上，基本相同
var cluster = require("cluster");
var http    = require("http");
var cpus    = require("os").cpus().length;//系统cpu数量
console.log("执行一次");
if(cluster.isMaster){
    console.log("Master process started with PID: ",process.pid);
    for(var i = 0; i < cpus; i++){
        cluster.fork();
    }
    cluster.on("exit",function(worker){//侦听进程死亡事件
        console.log("worker " + worker.process.pid + " died");
        cluster.fork();
    })
}else{
    console.log("Worker process started with PID: " ,process.pid);
    http.createServer(function(req,res){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("hello world\n");
    }).listen(3000);
}*/

// 使用nodejs作为系统脚本文件
// 首先在脚本顶部加shebang：! /usr/bin/env node
// 然后将脚本设置为可执行：chmod +x app.js
// 参数以process.argv数组的形式传递给脚本