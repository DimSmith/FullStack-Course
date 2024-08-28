class Theater{
    //felids
    private name:String;
    private seatsNumber:number;
    private openHour:number;
    private closeHour:number;

    readonly minNameLength=1;
    //ctor
    constructor(name:String, openHour:number, closeHour:number,seatsNumber?:number){
        this.setName= name;
        this.setSeats= seatsNumber!;
        this.setOpenHour= openHour;
        this.setCloseHour= closeHour;
    }

    //setter
    public set setName(name:String){
        if(name.length < this.minNameLength){
            console.log("You must enter a name");
            this.name="n/a";
            return;
        }
        this.name = name;
    }

    public set setSeats(seatsNumber:number){
        if(seatsNumber < 1){
            console.log("You must enter positive number above 0")
            this.seatsNumber = 0;
            return;
        }
        this.seatsNumber = seatsNumber;
    }
    public set setOpenHour(openHour:number){
        if(openHour < 6 || openHour >12){
            this.openHour = 6;
            return;
        }
        this.openHour = openHour;

    }
    public set setCloseHour(closeHour:number){
        if(closeHour < 18 || closeHour > 23){
            this.closeHour = 23;
            return;
        }
        this.closeHour = closeHour;
    }

    public get getName():String{
        return this.name;
    }
    public get getOpenHour():number{
        return this.openHour;
    }
    public get getCloseHour():number{
        return this.closeHour;
    }
    public get getNumberSeats():number{
        return this.seatsNumber!;
    }


    public workingHours():number{
        return this.closeHour-this.openHour;
    }

    public theaterInfo():string{
        return `Theater ${this.name} have ${this.seatsNumber} number of seats is open from ${this.openHour} and close in ${this.closeHour}`;
    }
}

let theater1 = new Theater("Planet",250, 8,20);
let theater2 = new Theater("Lev",100, 7,23);

console.log(theater1.theaterInfo());
console.log(theater1.workingHours());

console.log(theater2.theaterInfo());
console.log(theater2.workingHours());
