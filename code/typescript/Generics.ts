function identity(arg: number): number {
    return arg;
}

// ---------------------使用any类型---------------------
function identity1(arg: any): any {
    return arg;
}

// ---------------------使用泛类型---------------------
function identity2<T>(arg: T): T {
    return arg;
}
var output = identity2<string>("myString");  // type of output will be 'string'
var output = identity2("myString");  // type of output will be 'string'

// ---------------------使用泛型变量---------------------
function loggingIdentity<T>(arg: T): T {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

function loggingIdentity1<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

// -------------------------泛型1-------------------------
function identity3<T>(arg: T): T {
    return arg;
}
var myIdentity3: <T>(arg: T)=>T = identity3;

// -------------------------泛型2-------------------------
function identity4<T>(arg: T): T {
    return arg;
}
var myIdentity4: <U>(arg: U)=>U = identity4;

// -------------------------泛型3-------------------------
function identity5<T>(arg: T): T {
    return arg;
}
var myIdentity5: {<T>(arg: T): T} = identity5;

// -------------------------使用泛型接口-------------------------
interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity6<T>(arg: T): T {
    return arg;
}
var myIdentity6: GenericIdentityFn = identity6;

// -------------------------使用泛型接口2-------------------------
interface GenericIdentityFn1<T> {
    (arg: T): T;
}
function identity7<T>(arg: T): T {
    return arg;
}
var myIdentity7: GenericIdentityFn1<number> = identity7;

// ----------------------泛型类别----------------------------
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
var myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

var stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// ----------------------泛型限制----------------------------
function loggingIdentity3<T>(arg: T): T {
    //console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

// 解决以上限制
interface Lengthwise {
    length: number;
}
function loggingIdentity4<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity4(3);  // Error, number doesn't have a .length property
loggingIdentity4({length: 10, value: 3});

// ----------------------在泛型中使用类类型----------------------------
// 简单例子
function create<T>(c: {new(): T; }): T {
    return new c();
}

// 复杂例子
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function findKeeper<A extends Animal, K> (a: {new(): A;
    prototype: {keeper: K}}): K {

    return a.prototype.keeper;
}

findKeeper(Lion).nametag;  // typechecks!

