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
next(); // 开始串行执行任务
