Promise.prototype.then = function (resolve, reject) {
    var next = this._next() || (this._next = Promise());
    var status = this.status;
    var x;
    if ('pending' === status) {
        isFn(resolve) && this._resolves.push(resolve);
        isFn(reject) && this._rejects.push(reject);
        return next;
    }
    if ('resolved' === status) {
        if (!isFn(resolve)) {
            next.resolve(resolve);
        } else {
            try {
                x = resolve(this.value);
                resolveX(next, x);
            } catch (e) {
                this.reject(e);
            }
        }
        return next;
    }
    if ('rejected' === status) {
        if (!isFn(reject)) {
            next.reject(reject);
        } else {
            try {
                x = reject(this.reason);
                resolveX(next, x);
            } catch (e) {
                this.reject(e);
            }
        }
        return next;
    }
}
function sleep (ms) {
    return function (v) {
        var p = Promise();
        setTimeout(function () {
            p.resolve(v);
        });
        return p;
    }
}
function getImg (url) {
    var p = Promise();
    var img = new Image();
    img.onload = function () {
        p.resolve(this);
    };
    img.onerror = function (err) {
        p.reject(err);
    };
    img.url = url;
    return p;
}
function getImg (url) {
    return Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            resolve(this);
        };
        img.onerror = function (err) {
            reject(err);
        };
        img.url = url;
    })
}
function addImg (img) {
    $('#list').find('> li:last-child').html('').append(img);
}
function prepend () {
    $('<li>').html('loading...').append($('#list'));
}
function run () {
    $('#done').hide();
    getData('map.json').then(function () {
        $('h4').html(data.name);
        return data.list.reduce(function (promise, item) {
            return promise.then(prepend).then(sleep(1000)).then(function () {
                return getImg(itme.url);
            }).then(addItem);
        }, Promise.resolve())
    }).then(sleep(300)).then(function () {
        $('#done').show();
    });
}
$('#run').on('click', run);
const promise = new Promise((resolve, reject) => {
    if (true) { // 异步执行成功
        resolve();
    } else {
        reject();
    }
});
promise.then ( resolve => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("setTimeOut Resolve function");
            resolve("Resolve function");
        }, 1000)
    })
}, reject => {
    console.log(reject);
    return false;
}).then (resolve => {
    console.log(resolve);
    console.log("Execute Over, Success function!");
})
var p = {
    then: function (cb, errcb) {
        cb(42);
        errcb("evil laugh");
    }
};
p.then(function fulfilled(val) {
    console.log(val); //42
}, function rejected (err) {
    console.log(err); // evil laugh
})
Promise.resolve(p).then(val => {
    console.log(val);
}, errject => {
    console.log(errject); // 永远不会到这里
})
var p = Promise.resolve(21);
var p2 = p.then(resovle => {
    console.log(resovle);
    return resovle * 2;
})
p2.then(resolve => {
    console.log(resolve); // 42
})
var p = Promise.resolve(21);
p.then(function (resolve) {
    return new Promise(function (resolve, reject) {
        // console.log(resolve);s
        setTimeout(function () {
            return resolve ( resolve * 2);
        }, 1000)
    })
})
.then (function (resolve) {
    console.log(resolve);
})
delay = (timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timer);
    })
}
delay(100)
    .then(() => {
        console.log("100ms after exec");
        return delay(500);
    })
    .then(() => {
        console.log("200ms after exec");
        return delay(1000);
    })
    .then(() => {
        console.log("300ms after exec");
    })
    .then(resolveValue => {
        console.log("300ms after exec");
    })
function request (url) {
    return new Promise(function (resolve, reject) {
        ajax(url, resolve);
    })
}
var rejectedPr = new Promise((resolve, reject) => {
    resolve(Promise.reject("Oops"));
})
rejectedPr.then(() => {
    // 永远不会运行到这里。
}, err => {
    console.log(err): // Oops
})
function fulfilled (msg) {
    console.log(msg);
}
function rejected (err) {
    console.log(err);
}
p.then(fulfilled, rejected);
var p = Promise.resolve(42);
p.then(resolve => {
    console.log(resolve.toLowerCase());
})
.done(null, handleErrors);
var p = Promise.resolve(42);
p.then(function fulfilled (msg) {
    console.log(msg.toLowerCase());
})
var p1 = request(url);
var p2 = request(url2);
Promise.all([p1, p2]).then(function (msg) {
    return request(
        "http://some.url.3/?v=" + msg.join(',')
    );
})
.then(function (msg) {
    console.log(msg);
});
Promise.race([
    foo(),
    timeOutPromise(3000) // 定时为3000ms
])
.then(
    function () {
        // 按时完成(在3000ms之内)
    },
    function (err) {
        console.log(err);
    }
)
if (!Promise.first) {
    Promise.first = function (prs) {
        return new Promise(function (resolve, reject) {
            prs.forEach(function (pr) {
                Promise.resolve(pr)
                    .then(resolve);
            })
        })
    }
}