function Car(){
    this.manufacture = "bmw";
    this.model = "6"
}

//creating object constructor
const bmw_Daniel = new Car();
const bmw_Gabriel = new Car();

console.log(bmw_Daniel);
console.log(bmw_Gabriel);

// add by Yarden
Car.prototype.engine = 3000;
console.log(bmw_Daniel);
console.log(bmw_Gabriel);

//changing only new create objects from car
Car.prototype = {engine: 3300};

const bwm_ofir = new Car();

console.log(`the car of daniel ${bmw_Daniel.manufacture}-${bmw_Daniel.model} have engine: ${bmw_Daniel.engine}`);
console.log(`the car of Gabriel ${bmw_Gabriel.manufacture}-${bmw_Gabriel.model} have engine: ${bmw_Gabriel.engine}`);
console.log(`the car of Gabriel ${bwm_ofir.manufacture}-${bwm_ofir.model} have engine: ${bwm_ofir.engine}`);


function Person(){
    this.name = "zeev";
}
Person.prototype.name = "zeevik the fox";
Person.prototype.age = 49;
const zeev = new Person;

console.log(zeev);
console.log(zeev.name , zeev.age);