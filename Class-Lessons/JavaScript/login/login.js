const userName = "zeev";
const userPass = "123456";

/*
function checkLogin(){

}
*/

const checkLogin = ()=>{
    var uName = document.getElementById("uName").value;
    var uPass = document.getElementById("uPass").value;
    if(uName == userName && uPass == userPass){
        document.getElementById("response").innerText = "Hello My Master";
        document.getElementById("response").style.color = "green";
    }
    else{
        document.getElementById("response").innerText = "Why who are you?";
        document.getElementById("response").style.color = "red";
    }
}