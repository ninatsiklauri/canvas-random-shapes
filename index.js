var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rectBtn = document.getElementById("rectBtn");
var circBtn = document.getElementById("circleBtn");
canvas.width = 600;
canvas.height = 600;
canvas.style.border = "1px solid #000";
var ShapeTypes;
(function (ShapeTypes) {
    ShapeTypes[ShapeTypes["Rect"] = 1] = "Rect";
    ShapeTypes[ShapeTypes["Circle"] = 2] = "Circle";
})(ShapeTypes || (ShapeTypes = {}));
var shapes = [];
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    ;
    Rectangle.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
    };
    ;
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    ;
    Circle.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
    };
    ;
    return Circle;
}());
var DefaultShape = /** @class */ (function () {
    function DefaultShape(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    ;
    DefaultShape.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
    };
    ;
    return DefaultShape;
}());
;
var defaultShape = new DefaultShape(5, 5, 20, 20, "red");
defaultShape.draw();
function generateRandomShape(shapeType) {
    var shape;
    var randomY = (Math.floor(Math.random() * canvas.width));
    var randomX = (Math.floor(Math.random() * canvas.height));
    var color = "rgb(".concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ", ").concat(Math.floor(Math.random() * 256), ")");
    switch (shapeType) {
        case ShapeTypes.Rect:
            var minWidthAndHeight = 25;
            var width = Math.floor(Math.random() * 100) + minWidthAndHeight;
            var height = Math.floor(Math.random() * 100) + minWidthAndHeight;
            shape = new Rectangle(randomX, randomY, width, height, color);
            break;
        case ShapeTypes.Circle:
            var minRadius = 25;
            var radius = Math.floor(Math.random() * 50) + minRadius;
            shape = new Circle(randomX, randomY, radius, color);
            break;
        default:
            throw new Error();
    }
    return shape;
}
function drawRandomShape(shapeType) {
    shapes.push(generateRandomShape(shapeType));
    shapes.forEach(function (el) {
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        defaultShape.draw();
        el.draw();
    });
}
rectBtn.addEventListener("click", function () {
    drawRandomShape(ShapeTypes.Rect);
});
circBtn.addEventListener("click", function () {
    drawRandomShape(ShapeTypes.Circle);
});
