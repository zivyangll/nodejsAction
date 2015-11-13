var fs = require('fs');
var fileDir = './data/static/';
var wordStatic = {};
var tasks = [];
var completeTasks = 0;

fs.readdir(fileDir,function(err,files){
    if(err) throw err;
    for(var index in files){
        var task = (function(file){
            return function(){
                console.log("统计一个文件");
                fs.readFile(file,function(err,text){
                    if(err) throw err;
                    console.log("start " + new Date())
                    countWordsInText(text);
                    checkIfComplete();
                    console.log("end " + new Date())
                });
            }
        })(fileDir + '/' + files[index]);
        tasks.push(task); // 把所有函数都添加到函数调用数组中
    }
    for(var task in tasks){ // 开始执行所有任务
        tasks[task]();
    }
});

function countWordsInText(text){
    var words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();
    for (var index in words){
        var word = words[index];
        if(word){
            wordStatic[word] = (wordStatic[word]) ? wordStatic[word] + 1 : 1;
        }
    }
}

function checkIfComplete(){
    completeTasks++;
    if(completeTasks == tasks.length){
        for(var index in wordStatic){
            console.log(index + ': ' + wordStatic[index]);
        }
    }
}