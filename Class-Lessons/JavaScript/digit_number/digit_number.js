var number= prompt("Please enter number");

if (number<10){
    console.log("1 Digit");
}  else if(number<100){
    console.log("2 Digits");
} else if(number<1000){
    console.log("3 Digits");
} else{
    console.log("4 Digits");
}