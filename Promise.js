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