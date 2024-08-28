var num1=50;
var num2=100;
var num3=88;
var num4=70;
var num5=75;

var max=0;
var min=100;

//max
if(num1 > max){
    max=num1;
}
if(num2 > max){
    max=num2;
}
if(num3 > max){
    max=num3;
}
if(num4 > max){
    max=num4;
}
if(num5 > max){
    max=num5;
}

//min
if(num1 < min){
    min=num1;
}
if(num2 < min){
    min=num2;
}
if(num3 < min){
    min=num3;
}
if(num4 < min){
    min=num4;
}
if(num5 < min){
    min=num5;
}

//Average
var avg= (num1+num2+num3+num4+num5)/5;

console.log("High grade :",max);
console.log("Lowest grade :",min);
console.log("Average :",avg);