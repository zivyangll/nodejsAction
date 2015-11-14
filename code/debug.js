// 使用STDIO模型进行调试

/*// console.erro()可以提供错误详细信息
console.log("Debugging message");
function notDefined(){
    try{
        someFunction();//undefined
    }catch(e){
        console.error(e);
    }
}
notDefined();*/

/*// 使用console.time()和console.timeEnd()进行性能基准测试,得到执行的时间
var sum = 0;
var arr = new Array(1000000);
for(var i = 0; i < arr.length; i++){
    arr[i] = Math.random();
}
console.time("for-loop-1");
for(var i in arr){
    sum += arr[i];
}
console.timeEnd("for-loop-1");

console.time("for-loop-2");
for(var i = 0; i < arr.length; i++){//效率更高
    sum += arr[i];
}
console.timeEnd("for-loop-2");*/

/*// 得到应用程序中某个点的函数或方法调用清单，使用console.trace()方法
function doTask(){
    doSubTask(1000,10000);
}
function doSubTask(countX,countY){
    for(var i=0;i<countX;i++){
        for(var j=0;j<countY;j++){}
    }
    console.trace();
}
doTask();*/

// 使用v8调试器调试代码：在希望断点发生的地方加入debugger，或者使用webstorm/浏览器断点调试

 // 通过：node debug app.js进行带有调试功能的程序
// 键入“cont”进行下一个断点，键入"repl"可以查询a,b,c的值，ctrl+c退出（REPL:Read,Evaluate,Print,Loop——在断点处详细调试）
var foo = function(){
    var a = 3, b = 5;
     //debugger;
    var bar = function(){
        var b = 7; c = 11;
        a += b + c;
         //debugger;
    }
    bar();
     //debugger;
};
foo();

// 使用 Node Inspector进行调试
