const student1 = {
    firstName: 'Dima',
    studentClass: 48,
    grades: [85,78,92,99,100],
    getAvg: function(){
        let sum=this.grades[0];
        for (let index=1; index<this.grades.length ; index++) {
            sum += this.grades[index];
        }
        return sum/this.grades.length;
    },
}

const student2 = {
    firstName: 'Vika',
    studentClass: 49,
    grades: [90,94,92,98,100],
    getAvg: function(){
        let sum=this.grades[0];
        for (let index=1; index<this.grades.length ; index++) {
            sum += this.grades[index];
        }
        return sum/this.grades.length;
    },
}

const student3 = {
    firstName: 'Rafi',
    studentClass: 50,
    grades: [65,85,75,54,90],
    getAvg: function (){
        let sum=this.grades[0];
        for (let index=1; index<this.grades.length ; index++) {
            sum += this.grades[index];
        }
        return sum/this.grades.length;
    },
}

console.log(student1.getAvg(),student2.getAvg(),student3.getAvg());