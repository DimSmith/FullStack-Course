class Computer{
    //c'tor
    constructor(memoryProcessor,memoryDisc,model,price,warranty){
        this.setMemoryProcessor = memoryProcessor;
        this.setMemoryDisc = memoryDisc;
        this.setModel = model;
        this.setPrice = price;
        this.setWarranty = warranty; 
    }
    //setters
    set setMemoryProcessor(memoryProcessor){
        if (memoryProcessor<4 || memoryProcessor>16){
            this.memoryProcessor = 4;
            return;
        }
        this.memoryProcessor = memoryProcessor;
    }
    set setMemoryDisc(memoryDisc){
        if (memoryDisc<200 || memoryDisc>3000){
            this.memoryDisc = 200;
            return;
        }
        this.memoryDisc = memoryDisc;
    }
    set setModel(model){
        this.model = model;
    }
    set setPrice(price){
        if (price<800 || price>20000){
            this.price = 800;
            return;
        }
        this.price = price;
    }
    set setWarranty(warranty){
        if (warranty<0 || warranty>5){
            this.warranty = 0;
            return;
        }
        this.warranty = warranty;
    }
    //getters
    get getMemoryProcessor(){
        return this.memoryProcessor;
    }
    get getMemoryDisc(){
        return this.memoryDisc;
    }
    get getModel(){
        return this.model;
    }
    get getPrice(){
        return this.price;
    }
    get getWarranty(){
        return this.warranty;
    }
    //functions
    advice=()=>{
        return 'Would you like to buy earphones?';
    }
    print=()=>{
        return `Memory Processor:${this.getMemoryProcessor} ,Memory Disc:${this.getMemoryDisc} ,Model:${this.getModel} ,Price:${this.getPrice} ,Warranty:${this.getWarranty}`;
    }
};
class DesktopComputer extends Computer{
    //c'tor
    constructor(memoryProcessor,memoryDisc,model,price,warranty,wirelessMouse,screenSize){
        super(memoryProcessor,memoryDisc,model,price,warranty);
        this.setWirelessMouse = wirelessMouse;
        this.setScreenSize = screenSize;
    }
    //setters
    set setWirelessMouse(wirelessMouse){
        if(wirelessMouse instanceof Boolean){
        this.wirelessMouse = wirelessMouse;
        return;
        }
        this.wirelessMouse = false;
    }
    set setScreenSize(screenSize){
        if (screenSize<11 || screenSize>18){
            this.screenSize = 11;
            return;
        }
        this.screenSize = screenSize;
    }
    //getters
    get getWirelessMouse(){
        return this.wirelessMouse;
    }
    get getScreenSize(){
        return this.screenSize;
    }
    //functions
    advice=()=>{
        return 'Would you like to buy table for the new computer?';
    }
    print=()=>{
        return `${super.print()} ,Wireless Mouse:${this.getWirelessMouse} ,ScreenSize:${this.getScreenSize}`;
    }
};
class Laptop extends Computer{
    //c'tor
    constructor(memoryProcessor,memoryDisc,model,price,warranty,chargeTime,battery,touchScreen){
        super(memoryProcessor,memoryDisc,model,price,warranty);
        this.setChargeTime = chargeTime;
        this.setBattery = battery;
        this.setTouchScreen = touchScreen;
    }
    //setters
    set setChargeTime(chargeTime){
        if (chargeTime<1 || chargeTime>9){
            this.chargeTime = 1;
            return;
        }
        this.chargeTime=chargeTime;
    }
    set setBattery(battery){
        if (battery<0 || battery>100){
            this.battery = 0;
            return;
        }
        this.battery=battery;
    }
    set setTouchScreen(touchScreen){
        if (touchScreen instanceof Boolean){
            this.touchScreen = touchScreen;
            return;
        }
        this.touchScreen = false;
    }
    //getters
    get getChargeTime(){
        return this.chargeTime;
    }
    get getBattery(){
        return this.battery;
    }
    get getTouchScreen(){
        return this.touchScreen;
    }
    //functions
    advice = () => {
        return `Would you like to buy case for the new laptop and ${super.advice()}`;
    }
    chargeComplete =() =>{
        return `The battery had been successfully charged`;
    }
    print =() => {
        return `${super.print()} ,Charge Time:${this.getChargeTime} ,Battery Capacity:${this.getBattery} ,Touch Screen:${this.getTouchScreen}`;
    }
};

const  executeActions = (object) => {
    if (object instanceof Computer) {
        console.log(object.advice());
        console.log(object.print());
    }else if (object instanceof DesktopComputer){
        console.log(object.advice());
        console.log(object.print());
    }else 
        {
        console.log(object.advice());
        console.log(object.chargeComplete());
        console.log(object.print());
    }
}

