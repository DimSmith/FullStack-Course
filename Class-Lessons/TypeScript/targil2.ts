class Car{
    //fields
    private plateNumber:String | number;
    private company:String;
    private model:String;
    private color:String;
    private year:number;
    private engine:String | number;
    private speed:number;
    
    //c'tor
    constructor(plateNumber:String | number, company:String, model:String, color:String, year:number, engine:number){
        this.plateNumber = plateNumber;
        this.company = company;
        this.model = model;
        this.color = color;
        this.year = year;
        this.engine = engine;
        this.speed = 0;
    }

    //setter
    public setPlateNumber(plateNumber:String | number):void{
        this.plateNumber=plateNumber;
    }
    public setCompany(company:String):void{
        this.company=company;
    }
    public setModel(model:String):void{
        this.model=model;
    } 
    public setColor(color:String):void{
        this.color=color;
    }
    public setYear(year:number):void{
        this.year=year;
    }
    public setEngine(engine:number):void{
        this.engine=engine;
    }
    public setSpeed(speed:number):void{
        this.speed=speed;
    }

    //getter
    public getPlateNumber():String | number{
        return this.plateNumber;
    }
    public getCompany():String{
        return this.company;
    }
    public getModel():String{
        return this.model;
    } 
    public getColor():String{
        return this.color;
    }
    public getYear():number{
        return this.year;
    }
    public getEngine():String | number{
        return this.engine;
    }
    public getSpeed():number{
        return this.speed;
    }

    //methods
    public print():void{
        console.log(`Car Info: 
        Number Plate:${this.plateNumber}
        Production:${this.company}
        Model:${this.model} 
        Color:${this.color}
        Year Of Production:${this.year}
        Engine Type:${this.engine}
        Speed:${this.speed} KMH`);
    }
    public speedUp(speed:number):void{
        for (let speedy=this.speed;speedy <= speed;speedy++){
            this.speed = speedy;
        }

    }
    public speedDown(speed:number):void{
        for (let speedy=this.speed; speedy>speed;speedy--){
            this.speed = speedy;
        }
    }

    public stopCar():void{
        this.speedDown(0);
    }
}

let car1 = new Car(234567,"BMW","V8","Black",2024,2000);
let car2 = new Car(234345,"Kia","V2","Red",2020,1200);
let car3 = new Car(234123,"Mazda","V4","white",2018,1400);