class NewUser{
    //fields - שדות
    private userName: String;
    private userPass: String;
    //constructor - בנאי
    constructor(userName: String, userPass: String){
        this.userName = userName;
        this.userPass = userPass;
    }
    //methods - פעולות
    public makeLogin():void{ // void -תוכנה שלא מחזירה ערך נגדיר את הפונקציה כ 
        console.log("making login");
    }

    public sayHelloYarden(msg:String):String{
        return `Yarden say: ${msg}`;
    }

    public makeAction(nodeId:number,epId:number,state:boolean){
        this.makeRealAction(nodeId,epId,state);
    }

    private makeRealAction(nodeId:number,epId:number,state:boolean){
        //bla bla bla
    }
}

let ilan = new NewUser("ilan", "12345");
ilan.sayHelloYarden("i not here");