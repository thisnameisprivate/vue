var gimmSomething = ( () => {
    var nextVal;
    if (nextVal === undefined) {
        nextVal = 1;
    } else {
        nextVal = (3 * nextVal) + 6;
    }
    return nextVal;
})();
gimmSomething(); // 1
gimmSomething(); // 9
gimmSomething(); // 33
gimmSomething(); // 105
// iterator
var something = ( () => {
    var nextVal;
    return {
        [Symbol.iterator] : () => { return this; },
        next : () => {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            return { done:false, value:nextVal}
        }
    }
})();
// for .. of
for (var v of something) {
    console.log(v);
    if (v > 500) {
        break;
    }
}
// Array for .. of
var a = [1, 2, 3, 4, 5];
for (var v of a) {
    console.log(v);
}
// 1, 2, 3, 4, 5
var a = [1, 2, 3, 4, 5];
var it = a [Symbol.iterator]();
it.next().value;
it.next().value;
it.next().value;
// 生成器
function *something () {
    var nextVal;
    while (true) {
        if (nextVal == undefined) {
            nextVal = 1;
        } else {
            nextVal= (3 * nextVal) + 6;
        }
        yield nextVal;
    }
}
var it = something();
it.next().value; // 1
it.next().value; // 9
it.next().value; // 33