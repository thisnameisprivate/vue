var obj = {
    a: 2,
};
var myObj = Object.create(obj); // myObj 并没有继承属性描述符
console.log(myObj.a);
var conf = Object.getOwnPropertyDescriptor(obj, 'a');
if (conf.enumerable == true) {
    console.log('enumerable Is Ok');
}
for (var k in myObj) {
    console.log(k); // a 可枚举
}
console.log(myObj.toString());
console.log(myObj.indexOf());
// 屏蔽属性
var obj = {
    a: 2,
};
var myObj = Object.create(obj);
console.log(myObj.a);
console.log(obj.a);
myObj.a = 3;
console.log(myObj.a);
console.log(obj.a);
//
function foo () {

}
var myfoo = new foo();
console.log(Object.getPrototypeOf(myfoo) === foo.prototype);
function foo () {

}
foo.prototype.constructor === foo;
var a = new foo;
a.constructor === foo;
