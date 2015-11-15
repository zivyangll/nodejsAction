// ---------------------基本类型-------------------------
var x = 3;

// ---------------------组合类型-------------------------
/*
var x = [0, 1, null];
var zoo = [new Rhino(), new Elephant(), new Snake()];
var zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
*/

// --------------------类型的上下文-------------------------
window.onmousedown = function(mouseEvent) {
    //console.log(mouseEvent.buton);  //<- Error
};
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.buton);  //<- Now, no error is given
};

// -------------------- 类型的匹配-------------------------
interface Named {
    name: string;
}
class Person {
    name: string;
}
var p: Named;
// OK, because of structural typing
p = new Person();

// -------------------- 类型的匹配-------------------------
interface Named1 {
    name: string;
}
var x1: Named1;
// y1’s inferred type is { name: string; location: string; }
var y1 = { name: 'Alice', location: 'Seattle' };
x1 = y1; // OK
function greet(n: Named) {
    alert('Hello, ' + n.name);
}
greet(y1); // OK

// -------------------- 函数类型的匹配：参数------------------------
var x2 = (a: number) => 0;
var y2 = (b: number, s: string) => 0;

y2 = x2; // OK
//x2 = y2; // Error

// -------------------- 函数类型的匹配：返回结果------------------------
var x3 = () => ({name: 'Alice'});
var y3 = () => ({name: 'Alice', location: 'Seattle'});

x3 = y3; // OK
//y3 = x3; // Error because x() lacks a location property

// -------------------- 数组的遍历------------------------
var items = [1, 2, 3];

// Don't force these extra arguments
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach((item) => console.log(item));

// --------------------枚举------------------------
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

var status2 = Status.Ready;
//status2 = Color.Green;  //error

// --------------------类------------------------
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

var a: Animal;
var s: Size;

a = s;  //OK
s = a;  //OK

// --------------------接口：空接口-----------------------
interface Empty<T> {
}
var x5: Empty<number>;
var y5: Empty<string>;

x5 = y5;  // okay, y matches structure of x

// --------------------接口2：非空接口-----------------------
interface NotEmpty<T> {
    data: T;
}
var x6: NotEmpty<number>;
var y6: NotEmpty<string>;

//x6 = y6;  // error, x and y are not compatible