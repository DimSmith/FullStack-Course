var grade1=[85,54,89,92,57,88,94];
var grade2=[88,92,89,92,60,88,100];
var grade3=[85,49,92,57,88,38,100];


//var avg1=0;
//var avg2=0;
//var avg3=0;
//for(var counter=0; counter<grade1.length; counter++) {
//    avg1+=grade1[counter];
//}
//avg1/=grade1.length;

//for(var counter=0; counter<grade2.length; counter++) {
//    avg1+=grade2[counter];
//}
//avg2/=grade2.length;
//for(var counter=0; counter<grade3.length; counter++) {
//    avg3+=grade3[counter];
//}
//avg3/=grade3.length;
//DRY => Don't Repeat Yourself

function printHello(){
    console.log("Hello");
}

function printHi(userName){
    console.log("Hello", userName);
}

function getPi(){
    return 3.145;
}

function getAvg(grades){
    avg=0;
    for (var index=0;index<grades.length;index++){
        avg+=grades[index];
    }
    return avg/grades.length;
}

printHello();
printHi("dima");
var pi = getPi();
console.log(pi);
console.log(getAvg(grade1));
console.log(getAvg(grade2));
console.log(getAvg(grade3));