class FullPerson{
    private name:String;
    private age:number;
    private isMarried:Boolean;

    constructor(name:String, age:number, isMarried:Boolean){
        this.name = name;
        this.age = age;
        this.isMarried = isMarried;
    }

    public print():void{
        console.log(`Name:${this.name} Age:${this.age} IsMarried:${this.isMarried?'yes':'no'}`);
    }

}