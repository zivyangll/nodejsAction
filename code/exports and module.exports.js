//Module.exports才是真正的接口，exports只不过是它的一个辅助工具。
//若没有显式的给Module.exports设置任何属性和方法，那么你的模块就是exports设置给Module.exports的属性
//Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略

/*// rocker.js
 exports.name = function() {
 console.log('My name is Lemmy Kilmister');
 };
 // 等价于：
 module.exports.name = function() {
 console.log('My name is Lemmy Kilmister');
 };

 // user.js
 var rocker = require('./rocker.js');
 rocker.name(); // 'My name is Lemmy Kilmister' */

/*//实例2：
 module.exports = 'ROCK IT!';
 exports.name = function() {
 console.log('My name is Lemmy Kilmister');
 };

 var rocker = require('./rocker.js');
 rocker.name(); // TypeError: Object ROCK IT! has no method 'name' */

/*// 实例3：
 module.exports = function(name, age) {
 this.name = name;
 this.age = age;
 this.about = function() {
 console.log(this.name +' is '+ this.age +' years old');
 };
 };

 var Rocker = require('./rocker.js');
 var r = new Rocker('Ozzy', 62);
 r.about(); // Ozzy is 62 years old */

console.log(module.paths); //输出nodejs的模块路径