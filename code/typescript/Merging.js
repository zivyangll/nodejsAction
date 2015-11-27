var box = { height: 5, width: 6, scale: 10 };
console.log(box.height);
// -------------------融合Modules-----------------------------
var Animals;
(function (Animals) {
    var Zebra = (function () {
        function Zebra() {
        }
        return Zebra;
    })();
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
var Animals;
(function (Animals) {
    var Dog = (function () {
        function Dog() {
        }
        return Dog;
    })();
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
// is equivalent to:
var Animals1;
(function (Animals1) {
    var Zebra = (function () {
        function Zebra() {
        }
        return Zebra;
    })();
    Animals1.Zebra = Zebra;
    var Dog = (function () {
        function Dog() {
        }
        return Dog;
    })();
    Animals1.Dog = Dog;
})(Animals1 || (Animals1 = {}));
// -------------------融合Modules易出错地方-----------------------------
var Animal;
(function (Animal) {
    var haveMuscles = true;
    function animalsHaveMuscles() {
        return haveMuscles;
    }
    Animal.animalsHaveMuscles = animalsHaveMuscles;
})(Animal || (Animal = {}));
var Animal;
(function (Animal) {
    function doAnimalsHaveMuscles() {
        //return haveMuscles;  // <-- error, haveMuscles is not visible here
    }
    Animal.doAnimalsHaveMuscles = doAnimalsHaveMuscles;
})(Animal || (Animal = {}));
// ----------Merging Modules with Classes, Functions, and Enums-------------------
//  merging a module with a class
var Album = (function () {
    function Album() {
    }
    return Album;
})();
var Album;
(function (Album) {
    var AlbumLabel = (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    })();
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
//  --------------------declaration merging--------------------
function buildLabel(name) {
    return buildLabel.prefix + name + buildLabel.suffix;
}
var buildLabel;
(function (buildLabel) {
    buildLabel.suffix = "";
    buildLabel.prefix = "Hello, ";
})(buildLabel || (buildLabel = {}));
console.log(buildLabel("Sam Smith"));
// --------------------融合enum--------------------
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
var Color;
(function (Color) {
    function mixColor(colorName) {
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
    Color.mixColor = mixColor;
})(Color || (Color = {}));
//# sourceMappingURL=Merging.js.map