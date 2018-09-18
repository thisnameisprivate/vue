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