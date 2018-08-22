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