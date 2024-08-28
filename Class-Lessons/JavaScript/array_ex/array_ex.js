var grades = [];
var lowGrade =100;
var highGrade =0;
var avg=0;

//push => last in - first out => LIFO
for(var index=0; index<5; index++){
    grades.push(Number(prompt("enter grade")));
}
for(var index=0; index<grades.length; index++){
    if(grades[index]<lowGrade){
        lowGrade =grades[index];
    }
    if(grades[index]>highGrade){
        highGrade =grades[index];
    }
    avg+=grades[index];
}

avg/=grades.length;
console.log("Highest grade :",highGrade);
console.log("Lowest grade :",lowGrade);
console.log("Average :",avg);