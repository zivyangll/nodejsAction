// 编写测试，当对代码做出修改之后，不会给应用程序引入新的bug。

// TDD测试驱动开发：首先编写描述了他们希望程序如何工作的测试，然后编写代码让测试通过：增加稳定性，便于重构，方便集成

/*// Assert模块：提供了一个基础的测试框架，而第三方模块在assert基础上改进，包括测试报告，测试异步代码以及使用DBB或者TDD风格测试，建议使用===,而不是==
var assert = require("assert");
assert.equal("8",8); // 沉默是金
assert.strictEqual("8",8); //抛出错误*/

/*// nodeunit模块：使用nodeunit进行单元测试，在assert基础上添加了建立与拆卸测试的能力，异步测试能力，mock和stub的功能。安装：npm install -g nodeunit ,运行：nodeunit app.js
exports.firstTest = function(test){//每个测试都声明成exports.testName（描述）
    test.expect(1);//n为期望的断言数
    test.strictEqual("hello","hello");
    test.done();//避免通过假测试，完成之后一定要调用test.done()表示测试完成
};
exports.secendTest = function(test){
    test.expect(1);
    test.strictEqual("hello","there");
    test.done();
};
var fs = require("fs");
exports.asyncTest = function(test){
    fs.stat("file.txt",function(err,stats){
        test.expect(2);
        test.strictEqual(err,null);
        test.notStrictEqual(stats.size,0);
        test.done();//容易忘记
    });
};*/

// BDD:行为驱动开发：开发从外部往内考虑程序，测试以应用程序与来自外界的交互为基础，而不需要理解应用程序内部原理，用白话描述正在测试什么，然后声明其如何工作

/*// Vows模块：用于以BDD风格测试Node.js应用程序，建立在assert模块之上。安装：npm install vows --save，运行node app.js，若测试通过，则列出honored数量
var vows = require("vows");
var assert = require("assert");
vows.describe("Compare String").addBatch({ // 描述 Description，对测试的描述
    "when comparing the same stirngs":{    // 上下文 Context，测试运行的上下文
        topic:"hello",                     // 主题 Topic，测试的什么
        "they should be equal":function(topic){ //宣告 Vow，期望在测试中发生什么
            assert.strictEqual(topic,"lalala");
        }
    },
    "when conparing different stirngs":{
        topic:"hello",
        "they should not be equal":function(topic){
            assert.notStrictEqual(topic,"there");
        }
    }
}).run();*/

/*// 使用vows进行异步测试：回调时特殊的this.callback函数，在所有的Vows主题中均可用，它使回调的结果可以被传递到测试函数中
var vows   = require("vows");
var assert = require("assert");
var fs     = require("fs");
vows.describe("Async testing").addBatch({
    "When using fs.stat on a file":{
        topic:function(){
            fs.stat("file.txt",this.callback);//必须要有this.callback
        },
        "it should be present": function(err,stat){
            assert.notStrictEqual(err,null);
        },
        "it should not be empry":function(err,stat){
            assert.notStrictEqual(stat.size,0)
        }
    }
}).run();*/


