
// -------------------------函数的不同写法---------------------------------
function add(x: number, y: number): number { return x+y; }

var myAdd: (x:number, y:number)=>number = // 完整的函数定义
    function(x: number, y: number): number { return x+y; };

var myAdd: (baseValue:number, increment:number)=>number = // 形参
    function(x: number, y: number): number { return x+y; };

// myAdd has the full function type
var myAdd = function(x: number, y: number): number { return x+y; };

// The parameters 'x' and 'y' have the type number
var myAdd: (baseValue:number, increment:number)=>number =
    function(x, y) { return x+y; };

// -------------------------固定数量参数---------------------------------
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
//var result1 = buildName("Bob");  //error, too few parameters
//var result2 = buildName("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName("Bob", "Adams");  //ah, just right

// -------------------------可选数量参数，不可超出---------------------------------
function buildName1(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName1("Bob");  //works correctly now
//var result2 = buildName1("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName1("Bob", "Adams");  //ah, just right

// -------------------------默认参数，不可超出---------------------------------
function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
var result1 = buildName2("Bob");  //works correctly now, also
//var result2 = buildName2("Bob", "Adams", "Sr.");  //error, too many parameters
var result3 = buildName2("Bob", "Adams");  //ah, just right

// -------------------------剩余参数，可超出---------------------------------
function buildName4(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName4("Joseph", "Samuel", "Lucas", "MacKinzie");

// -------------------------剩余参数，可超出---------------------------------
function buildName5(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
var buildNameFun: (fname: string, ...rest: string[])=>string = buildName5;

// -------------------------Lambdas和this---------------------------------
// ()=>{}是lambda表达式，表示一个匿名函数，=>前面的是参数，后面的是函数体。
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // Notice: the line below is now a lambda, allowing us to capture 'this' earlier
        return () => {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// -------------------------函数重载---------------------------------
var suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
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