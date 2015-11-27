var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function identity(arg) {
    return arg;
}
// ---------------------使用any类型---------------------
function identity1(arg) {
    return arg;
}
// ---------------------使用泛类型---------------------
function identity2(arg) {
    return arg;
}
var output = identity2("myString"); // type of output will be 'string'
var output = identity2("myString"); // type of output will be 'string'
// ---------------------使用泛型变量---------------------
function loggingIdentity(arg) {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity1(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
function loggingIdentity2(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
// -------------------------泛型1-------------------------
function identity3(arg) {
    return arg;
}
var myIdentity3 = identity3;
// -------------------------泛型2-------------------------
function identity4(arg) {
    return arg;
}
var myIdentity4 = identity4;
// -------------------------泛型3-------------------------
function identity5(arg) {
    return arg;
}
var myIdentity5 = identity5;
function identity6(arg) {
    return arg;
}
var myIdentity6 = identity6;
function identity7(arg) {
    return arg;
}
var myIdentity7 = identity7;
// ----------------------泛型类别----------------------------
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
})();
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
var stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
// ----------------------泛型限制----------------------------
function loggingIdentity3(arg) {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
function loggingIdentity4(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity4(3);  // Error, number doesn't have a .length property
loggingIdentity4({ length: 10, value: 3 });
// ----------------------在泛型中使用类类型----------------------------
// 简单例子
function create(c) {
    return new c();
}
// 复杂例子
var BeeKeeper = (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
})();
var ZooKeeper = (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
})();
var Animal = (function () {
    function Animal() {
    }
    return Animal;
})();
var Bee = (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        _super.apply(this, arguments);
    }
    return Bee;
})(Animal);
var Lion = (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        _super.apply(this, arguments);
    }
    return Lion;
})(Animal);
function findKeeper(a) {
    return a.prototype.keeper;
}
findKeeper(Lion).nametag; // typechecks!
//# sourceMappingURL=Generics.js.map