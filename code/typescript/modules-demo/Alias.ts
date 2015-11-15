// you can simplify working with either kind of module is to use import q = x.y.z to create shorter names for commonly-used objects.
// Not to be confused with the import x = require('name') syntax used to load external modules
module Shapes {
    export module Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
var sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'