//  You Know JavaScript Debugger.
module.exports = (cls) => {
    if (typeof(cls) === 'function') {
        if (cls.prototype) {
            try {
                cls.arguments && cls.caller;
                return false;
            } catch (e) {}
                return true;
        }
    }
    return false;
}
/* ~All parts of a ClassDeclaration or a ClassExpression are strict mode code. */
/* 说明class声明下都是strict mode, 那么在严格模式下,你一定见过这个错误:
*  Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
*  所以如果你不是这么定义一个函数:
* */
"use strict";
var f = function () {};
/*
*  普通函数的f.caller和f.arguments都是可以访问的.但是ckass的话,不加'use strict'也默认是严格模式,上面发的库就是利用了这个特性来进行isClass实现.
*  SO: 一般情况下这个判断是没有错误的,又看了一个另外的判断class的库:
* */
var toString = Function.prototype.toString();
function fnBody (fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace('/\s*}[^}]*s/', '');
}
function isClass(fn) {
    return (typeof fn === 'function' && (/^class(\s|\{\}$)/.test(toString.call(fn)) || (/^.*classCallCheck\(/.test(fnBody(fn)))) // bobel.js
    );
}
/*
*  这个就比较粗暴了,直接toString之后看有没有class关键字,如果是babel转过去的class会是这样的.
* */
"use strict";
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var a = function a() {
    _classCallCheck(this, a);
}