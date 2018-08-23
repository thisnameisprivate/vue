var strPrimitive = 'I am a string';
typeof strPrimitive; // string
strPrimitive instanceof String; // false;
var strObject = new String('I am a string');
typeof strObject; // object
strObject instanceof String; // ture

// JavaScript 引擎会自动把以下转换为 new String(), new Number()...
var strPrimitive = 'I am a string';
console.log(strPrimitive.length); // 13
console.log(strPrimitive.charAt(3)); // m
var number = 42.359;
console.log(number.toFixed(2)); // 42.36
// 可计算属性名
var prefix = 'foo';
var myObject = {
    [prefix + 'bar'] : "hello",
    [prefix + 'baz'] : "world"
};
console.log(myObject["foobar"]);
console.log(myObject["foobaz"]);
// 对象函数访问
function foo () {
    console.log('foo');
}
var somefoo = foo; // 对foo函数的引用
var myObjcet = {
    somefoo: foo,
};
console.log(foo);
console.log(somefoo);
console.log(myObjcet.somefoo);

var myObject = {
    foo: function () {
        console.log('foo');
    }
};
var someFoo = myObject.foo;
console.log(someFoo);
console.log(myObject.foo);
// 数组
var myArray = ['foo', 32, 'bar'];
myArray.baz = 'baz'; // 以对象方式添加的元素不会影响数组的长度
console.log(myArray.length); // 3
console.log(myArray.baz);  // baz
// 看起来像数字的下表会被自动转换成数字
var myArray = ['foo', 32, 'bar'];
myArray['3'] = 'baz'; // 以数组方式添加的元素会影响数组的长度
console.log(myArray.length); // 4
console.log(myArray[3]); // baz
// 复制对象
function anotherFunction () {

}
var anotherObjcet = {
    c: true,
};
var anotherArray = [];
var myObjcet = {
    a: 2,
    b: anotherObjcet,
    c: anotherArray,
    d: anotherFunction,
};
anotherArray.push(anotherObjcet, myObjcet);
// JSON 字符串复制并解析出一个结构和值完全一样的对象
// var newObj = JSON.parse(JSON.stringify(someobj));
// ES6 浅复制 case syntax ..
// var newObj = Objcet.assign(targetObjcet, source, source2, source3);
var newObj = Object.assign({}, myObjcet);
console.log(newObj.a);
console.log(newObj.b === myObjcet.b);
console.log(newObj.c === myObjcet.c);
console.log(newObj.d === myObjcet.d);
// getOwnPropertDescriptor 获取对象的数据描述符. writable(可写), enumerable(可枚举), configurable(可配置);
var object = {
    a: 2,
};
console.log(Object.getOwnPropertyDescriptor(object, 'a'));
// ps:
var myObject = {};
Object.defineProperty(myObject, 'a', { // 设置属性描述符
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true,
});
console.log(myObject.a);
console.log(Object.getOwnPropertyDescriptor(myObject, 'a'));
// 不可写 case
var object = {};
Object.defineProperty(object, 'a', {
    value: 2,
    writable: false, // 不可写
    enumerable: true,
    configurable: true,
});
object.a = 3;
console.log(object.a);
delete object.a;
console.log(object.a);
var obj = {
    a: 2,
};
Object.preventExtensions(obj); // 禁止对象扩展
obj.b = 3;
console.log(obj.b);
var obj = {
    a: 2,
};
var newObj = Object.seal(obj); // seal 就像在原有的对象上使用了,Object.preventExtensions();
console.log(newObj);
var obj = {
    a: 3,
};
var newObj = Object.freeze(obj); // freeze 会冻结一个对象,就像是在原有的对象上使用了Object.seal();
console.log(newObj);
// [[ Get ]]
// [[ Put ]]
var obj = {
    a: 2,
};
Object.defineProperty(obj, 'b', {
    get: function () { // 给 b 设置一个getter
        console.log(this.a * 2);
        enumerable: true;
    },
});
console.log(obj.a);
console.log(obj.b);
// 判断属性是否存在
var obj = {
a: 2,
};
console.log('a' in obj); // true
console.log('b' in obj); // false
// 可枚举性
var myObject = {};
Object.defineProperty(myObject, 'a', {
    value: 3,
    enumerable: true, // a 可枚举
});
Object.defineProperty(myObject, 'b', {
    value: 2,
    enumerable: false, // b 不可枚举
});
console.log(myObject.b); // 2
console.log('b' in myObject); // true
console.log(myObject.hasOwnProperty('b')); // true
for (var k in myObject) {
    console.log(k, myObject[k]);
}
// a 3
var arrEnumerables = Object.keys(myObject); // 返回一个数组包含所有可以枚举的属性
console.log(arrEnumerables);
var allArr = Object.getOwnPropertyNames(myObject); // 返回一个数组包含所有属性(无论它们是否可枚举)
console.log(allArr);
var arr = [2, 3, 4];
arr.forEach(a => { // 将数组中的元素依次传入function (a) {...} 作为参数
    console.log(a);
});
arr.every(function (a) {
    console.log(a);
});
var arr = [2, 3, 4];
for (var v of arr) {  // for .. of 循环直接遍历数组的值
    console.log(v);
}
// array 有内置的@@iterator来遍历数组
// ps: 手动使用@@iterator遍历数组
var myArray = [2, 3, 4, 5];
var it = myArray[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
var myObject = {
    a: 1,
    b: 2,
    c: 3
};
for (var v of myObject) {
    console.log(v);
}