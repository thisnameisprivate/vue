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
// getter
var obj = {
    log: ['a', 'b', 'c'],
    get latest () {
        if (this.log.length == 0) {
            return undefined;
        }
        return this.log[this.log.length - 1];
    }
};
console.log(obj.latest);

// 五个回调的故事
analytics.trackPurchase(purchaseData, function () {
    chargeCreditCard();
    displayThankyouPage();
});
var tacked = false;
analytics.trackPurchase(purchaseData, function () {
    if (!tracked) {
        tracked = true;
        chargeCreditCard();
        displayThankyouPage();
    }
});
// 针对不信任输入的防御性代码
function addNumbers (x, y) {
    if (typeof x != 'number' || typeof y != 'number') {
        throw Error("Bad parameters");
    }
    return x + y;
}
function addNumbers (x, y) {
    x = Number(x);
    y = Number(y);
    return x + y;
}
function success (data) {
    console.log(data);
}
function failure (err) {
    console.log(err);
}
ajax('url.1', success, failure);
// error-first
function response(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
}
ajax('url.1', response);
// 验证概念
function timeoutify(fn, delay) {
    var intv = setTimeout(function () {
        intv = null;
        fn (new Error(' Timeout! '));
    }, delay);
    return function () {
        if (intv) {
            clearTimeout(intv);
            fn.apply(this, arguments);
        }
    }
}
function asyncify (fn) {
    var orig_fn = fn;
    intv = setTimeout(function () {
        intv = null;
        if (fn) fn ();
    }, 0);
}

// 使用方式
function foo (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
}