const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const rectBtn = document.getElementById("rectBtn") as HTMLButtonElement;
const circBtn = document.getElementById("circleBtn") as HTMLButtonElement;


canvas.width = 600;
canvas.height = 600;
canvas.style.border = "1px solid #000";


interface Shape{
    draw():void;
}


enum ShapeTypes {
    Rect = 1,
    Circle = 2,
}


const shapes: Shape[] = [];


class Rectangle implements Shape{
    constructor(
        public x:number,
        public y:number,
        public width:number,
        public height:number,
        public color:string,
    ) {};

    draw(): void {
        ctx?.beginPath();
        ctx!.fillStyle = this.color;
        ctx?.fillRect(this.x, this.y, this.width, this.height);
        ctx?.closePath();
    };
}


class Circle implements Shape{
    constructor(
        public x:number,
        public y:number,
        public radius:number,
        public color:string,
    ) {};

    draw(): void {
        ctx?.beginPath();
        ctx!.fillStyle = this.color;
        ctx?.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx?.fill();
        ctx?.closePath();
    };
}


class DefaultShape{
    constructor(
        public x:number,
        public y:number,
        public width:number,
        public height:number,
        public color:string,
    ) {};

    draw(): void {
        ctx?.beginPath();
        ctx!.fillStyle = this.color;
        ctx?.fillRect(this.x, this.y, this.width, this.height);
        ctx?.closePath();
    };
}

let defaultShape = new DefaultShape(5,5,20,20, "red");
defaultShape.draw();



function generateRandomShape(shapeType: ShapeTypes):Shape {
    let shape: Shape;
    const randomY = (Math.floor(Math.random() * canvas.width));
    const randomX:number =( Math.floor(Math.random() * canvas.height));
    const color:string = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;


    switch (shapeType) {
        case ShapeTypes.Rect:
            const minWidthAndHeight: number = 25
            const width:number = Math.floor(Math.random() * 100) + minWidthAndHeight;
            const height:number = Math.floor(Math.random() * 100) + minWidthAndHeight;
            shape = new Rectangle(randomX, randomY, width, height, color);
            break;
        case ShapeTypes.Circle:
            const minRadius:number = 25;
            const radius:number = Math.floor(Math.random() * 50) + minRadius;
            shape = new Circle(randomX, randomY, radius, color); 
            break;
        default:
            throw new Error();
    }
    return shape;
}


function drawRandomShape(shapeType:ShapeTypes) {
    shapes.push(generateRandomShape(shapeType));    
    shapes.forEach((el)=> {
        el.draw();
    })
}


rectBtn.addEventListener("click", (e) => {
    drawRandomShape(ShapeTypes.Rect)
});


circBtn.addEventListener("click", () => {
    drawRandomShape(ShapeTypes.Circle)
});
