class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    print(){
        return `${this.name} is ${this.age} years old`;
    }

    static desorption(){
        return "i am a person class";
    }
}

class Student extends Person{
    constructor(name,age,grade){
        super(name,age);
        this.grade = grade;
    }

    //Override
    print(grade){
        if (grade === undefined){
            return `${super.print()} ,grade is ${this.grade}`;
        }
        return `${super.print()} ,grade is ${grade}`;
    }
}

class Lecturer extends Person{
    constructor(name,age,course){
        super(name,age);
        this.course = course;
    }

    print(){
        return `${super.print()} ,tech ${this.course}`;
    }
}


/*
Person.desorption();
let dima = new Person("Dima", 31);
console.log(dima.print());
console.log(dima instanceof Person);
*/

let dima = new Student("Dima",30, 100);
let zeev = new Lecturer("zeev",49, "FullStack");

console.log(dima);
console.log(zeev);

console.log(dima.print());
console.log(dima.print("A+"));