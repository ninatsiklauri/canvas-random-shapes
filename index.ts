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
    select(xmouse:number, ymouse:number):boolean
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
    select(xmouse:number, ymouse:number):boolean {
        const distance = Math.sqrt(
            (xmouse - this.x) * (xmouse - this.x)
            +
            (ymouse - this.y) * (ymouse - this.y)
        )
        if(distance < this.width){
            return false
        }else {
            return true
        }
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
    select(xmouse:any, ymouse:any): boolean {
        const distance = (
            (xmouse - this.x) * (xmouse - this.x)
            +
            (ymouse - this.y) * (ymouse - this.y)
        )
        if(distance < this.radius){
            return false
        }else {
            return true
        }
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




canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log(select(x,y))
})


selectBtn.addEventListener("click", (event) => {
    
})

