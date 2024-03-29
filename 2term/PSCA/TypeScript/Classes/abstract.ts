abstract class Figure {
    getArea(): void{
        console.log("Not Implemented")
    }
}
class Rectangle extends Figure{
    constructor(public width: number, public height: number){ 
        super();
    }
    getArea(): void{
        let square = this.width * this.height;
        console.log("area =", square);
    }
} 
let someFigure: Figure = new Rectangle(20, 30)
someFigure.getArea();   // area = 600

