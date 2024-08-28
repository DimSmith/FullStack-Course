function Cat(name,age){
    var _age;
    var _name;

    this.getAge = function(){
        return this._age;
    };
    this.getName = function(){
        return this._name;
    };

    this.setName = function(newName){
        if (newName.length<2 || newName.length>15){
            console.log("Pleas enter a name i more than 2 characters and less then 15 characters");
            this._name = "";
            return;
        }
        this._name = newName;
    };
    this.setAge = function(newAge){
        if(newAge<0 || newAge>20){
            console.log("Age need to be btw 0-20");
            this._age =0;
            return;
        }
        this._age = newAge;
    };

    this.setName(name);
    this.setAge(age);
}

Cat.prototype.drinkMMilk = function(){
    console.log("Milk");
}


Cat.prototype.isAlive = false;
Cat.type ="Cat";

/*
let cat = new Cat("Bumper",1);
console.log(Cat.prototype.isAlive);
console.log(Cat.type);
console.log(Cat);
cat.drinkMMilk();
*/

let cat = new Cat("Mitzi", -4);
console.log(cat);