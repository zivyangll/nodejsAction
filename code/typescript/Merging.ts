// -------------------融合接口-----------------------------
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

var box: Box = {height: 5, width: 6, scale: 10};
console.log(box.height);

// -------------------融合接口2-----------------------------
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: string): HTMLElement;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
// 以上三个接口最终合并为：
interface Document1 {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}

// -------------------融合Modules-----------------------------
module Animals {
    export class Zebra { }
}

module Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}
// is equivalent to:
module Animals1 {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}

// -------------------融合Modules易出错地方-----------------------------
module Animal {
    var haveMuscles = true;

    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}
module Animal {
    export function doAnimalsHaveMuscles() {
        //return haveMuscles;  // <-- error, haveMuscles is not visible here
    }
}

// ----------Merging Modules with Classes, Functions, and Enums-------------------
//  merging a module with a class
class Album {
    label: Album.AlbumLabel;
}
module Album {
    export class AlbumLabel { }
}

//  --------------------declaration merging--------------------
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
module buildLabel {
    export var suffix = "";
    export var prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));

// --------------------融合enum--------------------
enum Color {
    red = 1,
    green = 2,
    blue = 4
}
module Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}