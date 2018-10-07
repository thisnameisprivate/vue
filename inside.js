// 异步委托
function *foo () {
    var r1 = request('https://some.url.1');
    var r3 = request('https://some.url.2?v=' + r1);
    return r3;
}
function *bar () {
    var r2 = request('https://some.url.3');
    var r3 = yield *foo();
    console.log(r3);
}
ruo(bar);
// 递归委托
function *foo (val) {
    if (val > 1) {
        val = yield *foo(val - 1);
    }
    return yield request('https://some.usr.1?v=' + val);
}
function *bar () {
    var r1 = yield *foo(3);
    console.log(r1);
}
// 生成器并发
var res = [];
function *resData ( url ) {
    res.push(
        yield request( url )
    );
}
var it1 = resData('https://some.url.1');
var it2 = resData('https://some.url.2');
var p1 = it1.next();
var p2 = it2.next();
p1
.then(function (data) {
    it1.next(data);
    return it2;
})
    .then (function (data) {
        it2.next(data);
    });