// -------------------------函数的不同写法---------------------------------
function add(x, y) {
    return x + y;
}
var myAdd = function (x, y) {
    return x + y;
};
var myAdd = function (x, y) {
    return x + y;
};
// myAdd has the full function type
var myAdd = function (x, y) {
    return x + y;
};
// The parameters 'x' and 'y' have the type number
var myAdd = function (x, y) {
    return x + y;
};
// -------------------------固定数量参数---------------------------------
function buildName(firstName, lastName) {
    return firstName + " " + lastName;
}
//var result1 = buildName("Bob");  //error, too few parameters
//var result2 = buildName("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName("Bob", "Adams"); //ah, just right
// -------------------------可选数量参数，不可超出---------------------------------
function buildName1(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName1("Bob"); //works correctly now
//var result2 = buildName1("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName1("Bob", "Adams"); //ah, just right
// -------------------------默认参数，不可超出---------------------------------
function buildName2(firstName, lastName) {
    if (lastName === void 0) { lastName = "Smith"; }
    return firstName + " " + lastName;
}
var result1 = buildName2("Bob"); //works correctly now, also
//var result2 = buildName2("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName2("Bob", "Adams"); //ah, just right
// -------------------------剩余参数，可超出---------------------------------
function buildName4(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName4("Joseph", "Samuel", "Lucas", "MacKinzie");
// -------------------------剩余参数，可超出---------------------------------
function buildName5(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var buildNameFun = buildName5;
// -------------------------Lambdas和this---------------------------------
// ()=>{}是lambda表达式，表示一个匿名函数，=>前面的是参数，后面的是函数体。
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // Notice: the line below is now a lambda, allowing us to capture 'this' earlier
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
// -------------------------函数重载---------------------------------
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
//# sourceMappingURL=Functions.js.map