var max=prompt("Please enter maximum number");
var den=prompt("Please enter divide number");
var counter=2;

while (counter <= max){
    if (counter%den==0){
        console.log(counter);
    }
    counter++;
} 