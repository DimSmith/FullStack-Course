class Car{
    private model:String;
    private price:number;

    private static totalCar:number=0;

    constructor(model:String, price:number){
        this.model = model;
        this.price = price;
        Car.totalCar++;
    }
    public static get getTotalCar():number{
        return Car.totalCar;
    }
}

let car1 = new Car("mazda",48000);
let car2 = new Car("Merz",300000);

console.log("Total",Car.getTotalCar);