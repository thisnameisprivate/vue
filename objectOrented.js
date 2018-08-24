function minix ( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        if ( !( key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}
var Vehicle = {
    engines: 1,
    ignition: function () {
        console.log('Truning on my engine');
    },
    drive: function () {
        this.ignition();
        console.log('Steering and moving forward!');
    }
};
var Car = minix(Vehicle, {
    wheels: 4,
    drive: function () {
        Vehicle.derive.call(this);
        console.log(
            "Rolling on all " + this.wheels + "wheels !"
        );
    }
});
console.log(Car);
// object 寄生继承
function Vehicle () {
    this.engines = 1;
}
Vehicle.prototype.ignition = function () {
    console.log('Turning on my engine.');
}
Vehicle.prototype.drive = function () {
    this.ignition();
    console.log('Steering and moving forward!');
}
// 寄生类 Car
function Car () {
    var car = new Vehicle();
    car.wheels = 4;
    var vehDrive = car.drive;
    car.drive = function () {
        vehDrive.call(this);
        console.log(
            "Rolling on all" + this.wheels + " wheels!"
        );
    }
    return car;
}
var myCar = new Car();
myCar.drive();
// 隐式混入
var Something = {
    cool: function () {
        this.getter = 'Hello, Vue';
        this.count = this.count ? this.count++ : 1;
    }
};
console.log(Something.cool());
console.log(Something.getter);
console.log(Something.count);
// 把 Something 混入到Another
var Another = {
    cool: function () {
        Something.cool.call(this); // 此处 this 指的是Another这个对象
    }
};
console.log(Another.cool());
console.log(Another.getter);
console.log(Another.count);
Another.count = 2;
console.log(Something.count);
console.log(Another.count);