// you can simplify working with either kind of module is to use import q = x.y.z to create shorter names for commonly-used objects.
// Not to be confused with the import x = require('name') syntax used to load external modules
var Shapes;
(function (Shapes) {
    var Polygons;
    (function (Polygons) {
        var Triangle = (function () {
            function Triangle() {
            }
            return Triangle;
        })();
        Polygons.Triangle = Triangle;
        var Square = (function () {
            function Square() {
            }
            return Square;
        })();
        Polygons.Square = Square;
    })(Polygons = Shapes.Polygons || (Shapes.Polygons = {}));
})(Shapes || (Shapes = {}));
var polygons = Shapes.Polygons;
var sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
//# sourceMappingURL=Alias.js.map