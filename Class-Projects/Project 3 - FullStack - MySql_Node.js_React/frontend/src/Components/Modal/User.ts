export class User{
    public userId:number;
    public userFname:string;
    public userLname:string;
    public userEmail:string;
    public userPass:string;
    public userAdmin:number;
    

    constructor(userId:number,userFname:string,userLname:string,userAdmin:number,userEmail:string,userPass:string){
        this.userId=userId;
        this.userFname=userFname;
        this.userLname=userLname;
        this.userPass=userPass;
        this.userAdmin=userAdmin;
        this.userEmail=userEmail;
    }
}