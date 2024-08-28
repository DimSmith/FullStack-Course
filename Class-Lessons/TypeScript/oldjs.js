class User{
    userName ="";
    userPass = "";

    adminName="admin";
    adminPass="12345";

    constructor(userName, userPass){
        this.userName = userName;
        this.userPass = userPass;
    }

    makeLogin(){
        if(this.userName==this.adminName && this.userPass==this.adminPass)
        {
            console.log("Hello Admin!");
        }
        else{
            console.log("Who are you!!!");
        }
    }
}

let webUser = new User("admin","12345");
webUser.makeLogin();
