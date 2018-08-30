
// 类型转换发生在静态语言编译阶段, 而强制类型转换发生在动态语言运行时。
function onlyOne () {
    var sum = 0;
    for (var i = 0; i <  arguments.length; i ++) {
        sum += Number(!! arguments[i]);
    }
    return sum === 1;
}

(function (a, b) {
    a = a || 'value';
    b = b || 'value';
    console.log(a + "" + b);
})('ealy', 'ealy')