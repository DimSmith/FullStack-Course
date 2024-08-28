const student = {
    firstName: 'Dima',
    studentClass: 48,
    sayHi: () =>{
        console.log("hello world");
    },
    getClass: function() {
        return this.studentClass;
    },
}

const student2 = {
    firstName: 'Jhon',
    studentClass: 48,
    sayHi: () =>{
        console.log("hello world");
    },
    getClass: function() {
        return this.studentClass;
    },
}

//print the object
console.log(student);
console.log(student.firstName);
//print class by noation
var classField= "class";
console.log(student[classField]);
student.sayHi();
console.log(student.getClass());