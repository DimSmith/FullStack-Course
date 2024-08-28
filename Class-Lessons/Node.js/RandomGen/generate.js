const nameLength = 5;

function randomName(length) {
    let result = '';
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const allLettersLength = allLetters.length;
    let counter = 0;
    while (counter < length) {
      result += allLetters.charAt(Math.round(Math.random() * allLettersLength));
      counter += 1;
    }
    return result;
}

console.log(randomName(nameLength));