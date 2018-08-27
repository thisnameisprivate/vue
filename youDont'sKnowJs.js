if (typeof DEBUG !== 'undefined') {
    console.log('DEBUG is defined');
}
if (window.DEBUG) {
    console.log('123');
} else {
    console.log('321');
}
function foo () {
    var arr = Array.from(arguments);
    arr.push('bac');
    console.log(arr);
}
foo('bar', 'baz');
var a = 'hello, vue';
var c = a.split('').reverse().join('');
console.log(c);
var a = 5E10;
console.log(a.toExponential());
console.log(void 0 == 'undefined'); // FALSE
var a = new String('abc');
console.log(typeof a);
console.log(a instanceof String);
Object.prototype.toString.call(a);
console.log(a.toString());
Object.prototype.toString.call(null);
Object.prototype.toString.call(undefined);
var b = new String('abc');
Object.prototype.toString();
// array
arr = [1, 2, 3];
Object.prototype.toString.call(arr);
var a = new String('abc');
var b = new Number(10);
var c = new Boolean(true);
console.log(a.valueOf());
console.log(b.valueOf());
console.log(c.valueOf());
if (! Date.now()) {
    Date.now = function () {
        return (new Date()).getTime();
    }
}
(function (x) {
    if (!x) {
        throw new Error("x wasn't proivied!");
    }
})(1)