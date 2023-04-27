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
    changeColorToShape(xmouse:number, ymouse:number):boolean
}


enum ShapeTypes {
    Rect = 1,
    Circle = 2
}


const shapes: Shape[] = [];
let currentColor: string[] = [];


class Rectangle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public selected:boolean
    ) {}

    draw(): void {
        ctx?.beginPath()
        ctx!.fillStyle = this.color;
        ctx!.shadowColor = "#0000ff";
        ctx!.shadowBlur = 15
        ctx!.shadowOffsetX = 5
        ctx!.shadowOffsetY = 5
        ctx?.fillRect(this.x, this.y, this.width, this.height)
        ctx?.closePath()
    }
    
    getNewColor(newColor:string){        
        this.color = newColor;
        this.draw()
    }

    changeColorToShape(xmouse:number, ymouse:number): boolean {
        let distance = xmouse > this.x && xmouse < this.x + this.width && ymouse > this.y
        && ymouse < this.y + this.height;

        if(distance){
            this.selected = true
            if(this.selected = true){
                this.getNewColor("red")
            }
            return true
        }else{
            this.getNewColor(this.color)
            return false
        }
        
    }
}


class Circle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public selected:boolean
    ) {}

    draw(): void {
        ctx?.beginPath();
        ctx!.fillStyle = this.color;
        ctx!.shadowColor = "#0000ff";
        ctx!.shadowBlur = 15
        ctx!.shadowOffsetX = 5
        ctx!.shadowOffsetY = 5
        ctx?.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx?.fill();
        ctx?.closePath()
    }

    getNewColor(newColor:string){
        this.color = newColor;
        this.draw();
    }


    changeColorToShape(xmouse:number, ymouse:number): boolean {
        let distance = Math.sqrt
        (
            ((xmouse - this.x) * (xmouse - this.x)) 
            +
            ((ymouse - this.y) * (ymouse - this.y))
        )

        if(distance < this.radius){
            this.getNewColor("red")
            return true
        }else{
            this.getNewColor(this.color)
            return false
        }
    }
}



function generateRandomShape(shapeType: ShapeTypes):Shape {
    let shape: Shape;
    const x = (Math.floor(Math.random() * canvas.width));
    const y =( Math.floor(Math.random() * canvas.height));
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    currentColor.push(color)
    let selected = false

    switch (shapeType) {
        case ShapeTypes.Rect:
            const width = Math.floor(Math.random() * 100) + 50;
            const height = Math.floor(Math.random() * 100) + 50;
            shape = new Rectangle(x, y, width, height, color, selected);
            break;
        case ShapeTypes.Circle:
            const radius = Math.floor(Math.random() * 50) + 25;
            shape = new Circle(x, y, radius, color, selected);
            break;
            default:
                throw new Error();
    }    
    
    return shape;
}



function clickShape() {
    canvas.addEventListener("click", (e:MouseEvent) =>{
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        shapes.forEach(el =>{
            el.changeColorToShape(x,y)
        })
    })
}


function drawRandomShape(shapeType: ShapeTypes){
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    shapes.push(generateRandomShape(shapeType));
    shapes.forEach(c => {
        c.draw(); 
    });
}


rectBtn.addEventListener("click", () => {
    drawRandomShape(ShapeTypes.Rect);
})


circleBtn.addEventListener("click", () => {
    drawRandomShape(ShapeTypes.Circle);
})


selectBtn.addEventListener("click", clickShape)