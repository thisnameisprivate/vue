// 函数闭包版本迭代器
var something = (() => {
    var nextVal;
    return (() => {
        if (nextVal == undefined) {
            nextVal = 1;
        } else {
            nextVal = nextVal * 3 + 6;
        }
        return nextVal;
    })
})
// 迭代器
for (var v of something) {
    console.log(v);
    if (v > 500) {
        break;
    }
}
// 迭代器
var something = (() => {
    var nextVal;
    return {
        [Symbol.iterator]: () => { return this; },
        next: () => {
            if (nextVal == undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            return { done:false, value:nextVal }
        }
    }
})();
// 复习: 查看Object可枚举,可配置,可修改[Object.b attribute->Type: boolean.]
var a = {
    b: 3,
};
console.log(Object.getOwnPropertyDescriptors(a));
// 异步迭代生成器
foo => (x, y) => {
    ajax(
        'http://some.url.1/?x=' + x + '$y=' + y,
        () => (err, text) => {
            if (err) {
                it.throw( err );
            } else {
                it.next( data );
            }
        }
    )
}
function *main () {
    try {
        var text = yield foo(11, 31);
        console.log( text );
    } catch (err) {
        console.log( err );
    }
}
var it = main();
it.next();

// Promise
foo => (resolve, reject) => {
    return request => () => {
        'http://some.url.1/?x=' + x + '$y=' + y,
    }
}
foo(11, 31)
    .then(resolve => {
        console.log(resolve);
    }, reject => {
        console.log(reject);
    });
