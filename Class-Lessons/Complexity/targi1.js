let numberArray = [0,0,0,0,0,0,0,0,0,0];
let number = 2372389;
let temp=number;
while (temp>0){
    numberArray[temp%10]++;
    temp = parseInt(temp/10);
}
for( let counter = 0; counter < numberArray.length; counter++){
    if (numberArray[counter] === 0){
        console.log(`The number ${counter} not exists`);
    }
}