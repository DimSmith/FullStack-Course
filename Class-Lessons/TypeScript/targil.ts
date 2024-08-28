class Person{
    //fields - שדות
    private userName: String;
    private userAge: number;
    readonly currentYear=2024;

    //constructor - בנאי
    constructor(userName: String, userAge: number){
        this.userName = userName;
        this.userAge = userAge;
    }
    //methods - פעולות

    public userInfo(){
        return `${this.userName} was born in ${this.currentYear-this.userAge}`;
    }

}

let dima = new Person("Dima", 31);
console.log(dima.userInfo());