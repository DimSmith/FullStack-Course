function Animal(name,sound){
    
    //getters
    Animal.prototype.getName = function (){
        return this._name;
    }
    Animal.prototype.getSound = function (){
        return this._sound;
    }
    Animal.prototype.isAlive = function (){
        return this._isAlive;
    }

    //setters
    Animal.prototype.setName = function (){
        this.name = name;
    }
    Animal.prototype.setSound = function (){
        this.sound = sound;
    }
    Animal.prototype.isAlive = function (){
        this._isAlive = false;
    }

    var _name;
    var _sound;
    var _isAlive=true;
}

function Lion(name,sound,eat){
    Lion.prototype.eat = function (eatAnimal){
        eatAnimal.isAlive = false;
    };
    this._name = name;
    this._sound = sound;
    this._isAlive = true;
}

function Lion(name,sound){
    Lion.prototype.eat = function (eatAnimal){
        eatAnimal.isAlive = false;
    };
    this._name = name;
    this._sound = sound;
    this._isAlive = true;
}

function Cow(name,sound){
    Cow.prototype.giveMilk = function (){
        return this._isAlive;
    };
    this._name = name;
    this._sound = sound;
    this._isAlive = true;
}

function Cat(name,sound){
    Cat.prototype.drink = function (drinkCow){
        if (drinkCow.giveMilk()){
            console.log("Yummy milk");
        }else{
            console.log("the cow is dead");
        }
    };
    this._name = name;
    this._sound = sound;
    this._isAlive = true;
}

function Mouse(name,sound){
    this._name = name;
    this._sound = sound;
    this._isAlive = true;
}