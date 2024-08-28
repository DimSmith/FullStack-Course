var numbers = [1,2,3,42,5,6,7,12,34,56];

//for(var index=0; index<10; index++){
//    numbers.push(Number(prompt("Enter please a number")));
//}

function getBig(numbers){
    var big =numbers[0];
    for(var index=1; index<numbers.length; index++){
        if(big<numbers[index]){
            big = numbers[index];
        }
    }
    return big;
}

console.log(getBig(numbers));