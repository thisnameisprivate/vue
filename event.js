var eventLoop = [];
var event;
while (true) {
    if (eventLoop.length > 0) {
        event = eventLoop.shift();
        try {
            event();
        } catch (err) {
            reportError(err);
        }
    }
}
// 非交互实例代码
var res = {};
function foo (results) {
    res.foo = results;
}
function bar (results) {
    res.bar = results;
}
// 交互
var res = [];
function response (data) {
    res.push(data);
}
ajax('url1', response());
ajax('url2', response());
// 协调交互顺序
var res = [];
function response(data) {
    if (data.url == 'url1) {
        res[0] = data;
    } else if (data.url == 'url2') {
        res[1] = data;
    }
}
ajax('url1', response());
ajax('url2', response());
// error code
var a, b;
function foo (x) {
    a = x * 2;
    baz();
}
function bar (y) {
    b = y * 2;
    baz();
}
function baz () {
    console.log(a + b);
}
ajax('url1', foo());
ajax('url2', bar());
// 协作
var res = [];
function response(data) {
    res = res.concat(data.map(function (val) {
        return val * 2;
    }))
}
// for ... of
let iterable = [10, 20, 30];
for (let val of iterable) {
    console.log(val);
}

var res = {};
function response (data) {
    var chunk = data.splice(0, 1000);
    res = res.concat(chunk.map(function(val) {
        return val * 2;
    }));
    if (data.length > 0) {
        setTimeout(function () {
            response(data);
        }, 0);
    }
}