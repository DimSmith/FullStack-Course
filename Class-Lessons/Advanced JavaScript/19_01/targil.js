class Shape{
    constructor(placeX, placeY, color) {
        this.setPlaceX = placeX;
        this.setPlaceY = placeY;
        this.setColor = color;
    }
    set setPlaceX(placeX) {
        this.placeX = placeX;
    }

    set setPlaceY(placeY) {
        this.placeY = placeY;
    }

    set setColor(color) {
        this.color = color;
    }

    get getPlaceX() {
        return this.placeX;
    }

    get getPlaceY() { 
        return this.placeY;
    }

    get getColor() {
        return this.color;
    }

    calculateDistance() {
        let number = Math.pow(this.getPlaceX,2) + Math.pow(this.getPlaceY,2);
        return Math.sqrt(number);
    }
    toString(){
        return `X=${this.getPlaceX} Y=${this.getPlaceY} Color=${this.getColor}`;
    }
}

class Circle extends Shape{
    static pi=3.14;

    constructor(placeX, placeY, color, radius) {
        super(placeX, placeY, color);
        this.setRadius = radius;
    }
    set setRadius(radius) {
        this.radius = radius;
    }
    get getRadius() {
        return this.radius;
    }
    getArea(){
        return Circle.pi*Math.pow(this.getRadius,2);
    }
    getPerimeter(){
        return 2*Circle.pi*this.getRadius;
    }
    toString(){
        return `${super.toString()} ,Radius=${this.getRadius}`;
    }
}

//Targil 1
let square = new Shape(5,5,"red");
console.log("========Targil 1============")
console.log(square);
console.log(square.calculateDistance());
console.log(square.toString());


//Targil 2
let newCircle = new Circle(4,4,"green",5);
console.log("========Targil 2============")
console.log(newCircle);
console.log(newCircle.toString());
console.log(newCircle.calculateDistance());
console.log(newCircle.getPerimeter());
console.log(newCircle.getArea());
console.log(`PI= ${Circle.pi}`);
