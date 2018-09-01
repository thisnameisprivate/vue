function getData () {
    return {
        a: '1',
        b: '2'
    };
}
var {a, b} = getData();
console.log(a);
console.log(b);

var a = 2;
switch (true) {
    case a == 2:
        console.log("a = 2");
        break;
    case a == 1:
        console.log("a = 1");
        break;
    default:
        console.log(" a undefined.");
}
// netSpace4
Array.prototype.push = function (item) {
    this[this.length-1] = item;
}