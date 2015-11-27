// ---------------------基本类型-------------------------
var x = 3;
// ---------------------组合类型-------------------------
/*
var x = [0, 1, null];
var zoo = [new Rhino(), new Elephant(), new Snake()];
var zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
*/
// --------------------类型的上下文-------------------------
window.onmousedown = function (mouseEvent) {
    //console.log(mouseEvent.buton);  //<- Error
};
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.buton); //<- Now, no error is given
};
var Person = (function () {
    function Person() {
    }
    return Person;
})();
var p;
// OK, because of structural typing
p = new Person();
var x1;
// y1’s inferred type is { name: string; location: string; }
var y1 = { name: 'Alice', location: 'Seattle' };
x1 = y1; // OK
function greet(n) {
    alert('Hello, ' + n.name);
}
greet(y1); // OK
// -------------------- 函数类型的匹配：参数------------------------
var x2 = function (a) { return 0; };
var y2 = function (b, s) { return 0; };
y2 = x2; // OK
//x2 = y2; // Error
// -------------------- 函数类型的匹配：返回结果------------------------
var x3 = function () { return ({ name: 'Alice' }); };
var y3 = function () { return ({ name: 'Alice', location: 'Seattle' }); };
x3 = y3; // OK
//y3 = x3; // Error because x() lacks a location property
// -------------------- 数组的遍历------------------------
var items = [1, 2, 3];
// Don't force these extra arguments
items.forEach(function (item, index, array) { return console.log(item); });
// Should be OK!
items.forEach(function (item) { return console.log(item); });
// --------------------枚举------------------------
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
;
var status2 = Status.Ready;
//status2 = Color.Green;  //error
// --------------------类------------------------
var Animal = (function () {
    function Animal(name, numFeet) {
    }
    return Animal;
})();
var Size = (function () {
    function Size(numFeet) {
    }
    return Size;
})();
var a;
var s;
a = s; //OK
s = a; //OK
var x5;
var y5;
x5 = y5; // okay, y matches structure of x
var x6;
var y6;
//x6 = y6;  // error, x and y are not compatible 
//# sourceMappingURL=Type Inference & Compatibility.js.map