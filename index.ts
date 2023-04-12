const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")
const rectBtn = document.getElementById("rectangle-button") as HTMLButtonElement;
const circleBtn = document.getElementById("circle-button") as HTMLButtonElement;
const selectBtn = document.getElementById("select-button") as HTMLButtonElement


canvas.width = 600;
canvas.height = 600;
canvas.style.border = "1px solid #000"


interface Shape {
    draw(): void;
   
}

enum ShapeTypes {
    Rect = 1,
    Circle = 2
}

class Rectangle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
    ) {}
    draw(): void {
        ctx!.fillStyle = this.color;
        ctx!.shadowColor = "#0000ff";
        ctx!.shadowBlur = 15
        ctx!.shadowOffsetX = 5
        ctx!.shadowOffsetY = 5
        ctx?.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

class Circle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
    ) { }

    draw(): void {
        ctx!.fillStyle = this.color;
        ctx?.beginPath();
        ctx!.shadowColor = "#0000ff";
        ctx!.shadowBlur = 15
        ctx!.shadowOffsetX = 5
        ctx!.shadowOffsetY = 5
        ctx?.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx?.fill();
    }  
   
}

const shapes: Shape[] = [];

function generateRandomShape(shapeType: ShapeTypes):Shape {
    let shape: Shape;
    const x = (Math.floor(Math.random() * canvas.width));
    const y =( Math.floor(Math.random() * canvas.height));
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    switch (shapeType) {
        case ShapeTypes.Rect:
            const width = Math.floor(Math.random() * 100) + 50;
            const height = Math.floor(Math.random() * 100) + 50;
            shape = new Rectangle(x, y, width, height, color);
            break;
        case ShapeTypes.Circle:
            const radius = Math.floor(Math.random() * 50) + 25;
            shape = new Circle(x, y, radius, color);
            break;
            default:
                throw new Error();
    }
    return shape;
}


function drawRandomShape(shapeType: ShapeTypes){
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    shapes.push(generateRandomShape(shapeType));
    shapes.forEach(c => {
        c.draw()
    })
}

rectBtn.addEventListener("click", () => {
    drawRandomShape(ShapeTypes.Rect);
})

circleBtn.addEventListener("click", () => {
    drawRandomShape(ShapeTypes.Circle);
})



// function selectShapes(selectionX: number, selectionY: number, selectionWidth: number, selectionHeight: number): Shape[] {
//     const selectedShapes: Shape[] = [];

//     for (const shape of shapes) {
//         if (shape instanceof Rectangle) {
//             const rect = shape;
//             const left = rect.x;
//             const right = rect.x + rect.width;
//             const top = rect.y;
//             const bottom = rect.y + rect.height;

//             if (left < selectionX + selectionWidth &&
//                 right > selectionX &&
//                 top < selectionY + selectionHeight &&
//                 bottom > selectionY) {
//                 selectedShapes.push(shape);
//             }
//         } else if (shape instanceof Circle) {
//             const circle = shape;
//             const distance = Math.sqrt(
//                 (selectionX - circle.x) * (selectionX - circle.x) +
//                 (selectionY - circle.y) * (selectionY - circle.y)
//             );

//             if (distance < circle.radius) {
//                 selectedShapes.push(shape);
//             }
//         }
//     }

//     return selectedShapes
// }