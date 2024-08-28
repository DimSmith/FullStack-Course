var numbers = [];
var odd=0;
var even=0;

for(var index=0; index<10; index++){
    numbers.push(Number(prompt("Enter please a number")));
}
for(var index=0; index<numbers.length; index++){
    if(numbers[index]%2==0){
        even++;
    }
    else{
        odd++;
    }
}
console.log("Even numbers: ;",even);
console.log("Odd numbers: ;",odd);