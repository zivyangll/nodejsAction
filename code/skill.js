var foo = 1;
function a(){
	console.log(foo); // 输出1
}
function b(){
	console.log(foo); // 输出undefined
	var foo = 2; // 若定义局部变量，则默认在函数首部申明该变量，var foo;
	console.log(foo); // 输出2
}
a();
b();