
// ------------------数据类型-----------------------

var isDone:boolean = false; // Boolean
var height:number = 6; // Number
var name:string = "bob"; // String
name = 'smith';
var list:number[] = [1, 2, 3]; // Array
var list:Array<number> = [1, 2, 3];
enum Color {Red, Green, Blue} // Enum
var c:Color = Color.Green;

enum Color1 {Red = 1, Green, Blue} // 默认值
var b:Color1 = Color1.Green;

enum Color2 {Red = 1, Green = 2, Blue = 4} // 任意值
var a:Color2 = Color2.Green;

enum Color4 {Red = 1, Green, Blue}
var colorName:string = Color4[2];
console.log(colorName);

var notSure:any = 4; // Any任意类型
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
var anylist:any[] = [1, true, "free"];
anylist[1] = 100;

function warnUser():void { // Void类型
    console.log("This is my warning message");
}

// ------------------接口-----------------------

// Our First Interface
function printLabel(labelledObj:{label: string}) {
    console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// ------------------改为接口形式-----------------------
interface LabelledValue {
    label: string;
}
function printLabel1(labelledObj:LabelledValue) {
    console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel1(myObj);

// ------------------接口中可选的属性-----------------------
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config:SquareConfig):{color: string; area: number} {
    var newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({color: "black"});

// ------------------接口函数类型-----------------------
interface SearchFunc {
    (source: string, subString: string): boolean;
}
var mySearch: SearchFunc;
mySearch = function(src: string, sub: string) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

// ------------------接口数组类型-----------------------
interface StringArray {
    [index: number]: string;
}
var myArray: StringArray;
myArray = ["Bob", "Fred"];

// ------------------接口类类型-----------------------
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
class Clock1 implements ClockInterface  {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

// ------------------接口类类型2-----------------------
interface ClockStatic {
    new (hour: number, minute: number);
}
class Clock  {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
var cs: ClockStatic = Clock;
var newClock = new cs(7, 30);

// ------------------继承接口-----------------------
interface Shape1 {
    color: string;
}
interface Square1 extends Shape1 {
    sideLength: number;
}
var square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;

// ------------------继承多重接口-----------------------
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
var square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// ------------------继承接口：混合类型-----------------------
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
var cHybrid : Counter;
//cHybrid(10);
//cHybrid.reset();
//cHybrid.interval = 5.0;


// ------------------------类--------------------------
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
var greeter = new Greeter("world");

// ------------------------类的继承--------------------------
class Animal {
    private name:string; // ，，默认是public
    constructor(theName: string) { this.name = theName; }
    move(meters: number = 0) {
        console.log(this.name + " moved " + meters + "m.");
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(meters = 5) {
        console.log("Slithering...");
        super.move(meters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(meters = 45) {
        console.log("Galloping...");
        super.move(meters);
    }
}

var sam = new Snake("Sammy the Python");
var tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// ------------------------类的访问器--------------------------
// 若报错：Accessors are only available when targeting ECMAscript 5 and higher.
// 解决：File Watchers 在tsc.cmd命令上加参数--target ES5 --module commonjs； 在Languages & Frameworks:TypeScript:Command line options:添加--target ES5 --module commonjs
var passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

// ------------------------类的静态属性--------------------------
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

var grid1 = new Grid(1.0);  // 1x scale
var grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// ------------------------类的构造函数--------------------------
class Greeter1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
var greeter: Greeter1;
greeter = new Greeter1("world");
console.log(greeter.greet());

// ------------------------使用类作为接口--------------------------
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

var point3d: Point3d = {x: 1, y: 2, z: 3};