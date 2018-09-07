/*
*  JavaSciprt 判断 localStorage 时效是否过期
* */
var obj = new Object();
obj.a = a;
obj.time = 3600;
obj.date = new Date().getTime();
localStorage.setItem('data', JSON.stringify(obj));
var b = JSON.parse(localStorage.getItem('data'));
var time = b.time;
var data = b.date;
if ((parseInt(time) + parseInt(data)) < new Date().getTime()) {
    localStorage.remove('data');
} else {
    console.log(b.a);
}