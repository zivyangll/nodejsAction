/*// 传统方式
 interface StringValidator {
 isAcceptable(s: string): boolean;
 }

 var lettersRegexp = /^[A-Za-z]+$/;
 var numberRegexp = /^[0-9]+$/;

 class LettersOnlyValidator implements StringValidator {
 isAcceptable(s: string) {
 return lettersRegexp.test(s);
 }
 }

 class ZipCodeValidator implements StringValidator {
 isAcceptable(s: string) {
 return s.length === 5 && numberRegexp.test(s);
 }
 }

 // Some samples to try
 var strings = ['Hello', '98052', '101'];
 // Validators to use
 var validators: { [s: string]: StringValidator; } = {};
 validators['ZIP code'] = new ZipCodeValidator();
 validators['Letters only'] = new LettersOnlyValidator();
 // Show whether each string passed each validator
 strings.forEach(s => {
 for (var name in validators) {
 console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
 }
 });*/
// 模块化
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    })();
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    })();
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
// Some samples to try
var strings = ['Hello', '98052', '101'];
// Validators to use
var validators = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(function (s) {
    for (var name in validators) {
        console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
    }
});
//# sourceMappingURL=modules-demo.js.map