// arrow function
var foo = a => {
    console.log(a);
}
foo(2); // 2
// this 1
var obj = {
    count: 0,
    cool: function coolFn() {
        var self = this;
        if (self.count < 1) {
            setTimeout(function timer() {
                console.log('awesome ? ');
                self.count++;
            }, 2000)
        }
    },
};
obj.cool();
// this 1 arrow function
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.count < 1) {
            setTimeout(() => {
                console.log('awesome ? ');
                this.count++;
                console.log(this.count);
            }, 2000);
        }
    }
};
obj.cool();
// this 1 bind() case;
var a = 1;
var module = {
    a: 2,
    getA: function () {
        console.log(this.a);
    }
};
module.getA();
var getA1 = module.getA;
getA1();
var getA2 = getA1.bind(module);
getA2();
// this 2 bind() case;
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.count < 1) {
            setTimeout(function timer() {
                this.count++;
                console.log('more awemore ? ');
                console.log(this.count);
            }.bind(this), 100);
        }
    },
};
obj.cool();
// on this
function identify() {
    console.log(this.name.toUpperCase());
    return this.name.toUpperCase();
}

function speak() {
    var str = 'Hello, I\'m ' + identify.call(this); // 此处向identify传递一个参数这个参数就像这样: { name : join }
    console.log(str);
}
var me = {
    name: 'join'
};
var you = {
    name: 'tom'
};

identify.call(me); // JOIN
identify.call(you); // TOM
speak.call(me); // Hello, I'm JOIN
speak.call(you); // Hello, I'm TOM
// on this 2
function foo(num) {
    console.log('foo: ' + num);
    data.count++
    console.log(data.count);
}

var data = {
    count: 0,
};
for (var i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}
// on this 2 foo change
function foo(num) {
    console.log('foo: ' + num);
    foo.count++;
    console.log(foo.count);
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}
// on this 3
function foo(num) {
    console.log('foo: ' + num);
    this.count++;
    console.log(this.count);
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo.call(foo, i); //  call强制指向foo本身
    }
}
// ReferenceError: a is not defined
function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log(this.a);
}
foo();

function baz() {
    console.log('bar');
    bar();
}

function bar() {
    console.log('baz');
    foo();
}

function foo() {
    console.log('baz');
}
baz();

function foo() {
    var a = 2;
    console.log(a);
    console.log(this.a); // CallStack Is OutSide Varibale, So A Is 3; default bind
}
var a = 3;
foo();
// on this 4
function foo() {
    'use strict'; // 使用严格模式,就不能将全局对象用于默认绑定
    console.log(this.a);
}
var a = 2;
foo();
// on this 5
function foo() {
    console.log(this.a);
}
var a = 2;
(function () {
    'use strict'; // 在严格模式下调用不影响默认绑定
    foo();
})();
// on this 6 obj
function foo() {
    console.log(this.a);
}
var obj = {
    a: 3,
    foo: foo,
};
obj.foo();
// 隐式丢失
function foo() {
    console.log(this.a);
}
var obj = {
    a: '42',
    func: foo
};
var a = 'Hello, call Stack';
setTimeout(obj.func, 1000);
// call func change this
function foo() {
    console.log(this.a);
}
var obj = {
    a: 'Hello, call',
};
foo.call(obj); // 调用foo时传入全局对象obj改变foo中的this指向
function foo() {
    console.log(this.a);
}
var obj = {
    a: 3,
};
var bar = function () {
    foo.call(obj);
}
bar();
setTimeout(bar, 2000);
// 强制绑定场景1(创建一个包裹函数, 负责接收参数并返回值)
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 1,
};
var bar = function () {
    return foo.apply(obj, arguments);
}
var f = bar(3);
console.log(f);
// 强制绑定场景2(创建给一个可以重复使用的辅助函数);
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 1,
};

function bind(func, obj) {
    return function () {
        return func.apply(obj, arguments);
    }
}
var f = bind(foo, obj);
var b = f(3);
console.log(b);
// 强制绑定 "bind()" 函数
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2,
};
var f = foo.bind(obj);
console.log(f(3));