var number= prompt("Please enter number");
function getDigit(number){
    var digit=0;
    for(var index=0;index<number;index++){
        if(number%10!=0){
            number=parseInt(number/10);
            digit++;
        }
    }
    return digit;
}
console.log(getDigit(number));