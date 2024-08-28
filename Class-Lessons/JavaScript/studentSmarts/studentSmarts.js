// constructor -> c'stor
function Student(studentName,studentClass,studentGrades) {
    //fields
    this.name = studentName;
    this.class = studentClass;
    this.grades = studentGrades;

    //methods
    this.getAvg = function(){
        let avg=this.grades[0];
        for (let index=1; index<this.grades.length ; index++) {
            avg += this.grades[index];
        }
        return avg/this.grades.length;
    }
    this.getMin = function(){
        let min= this.grades[0];
        for (let index=1; index<this.grades.length; index++) {
            if(this.grades[index]<min) {
                min = this.grades[index];
            }
            
        }
        return min;
    }

    this.tableHeader = function(){
        return `
            <table cellspacing="0" border="1" style="margin-left: auto;margin-right: auto;">
                    <th>name</th>
                    <th>class</th>
                    <th>grades avg</th>
            `;
    }
    this.tableData = function(){
        return `
            <tr>
            <td>${this.name}</td>
            <td>${this.class}</td>
            <td>${this.getAvg()}</td>
            </tr>
        `;
    }
    this.tableFooter = function(){
        return `</table>`
    }
}

function injectTable(studentList){
    var myTable = studentList[0].tableHeader();
    for (var index=0;index<studentList.length;index++){
        myTable+=studentList[index].tableData();
    }
    myTable+=studentList[0].tableFooter();
    document.getElementById("res").innerHTML = myTable;
}

injectTable([ 
    new Student("Dima",48,[98,95,100,100,98]),  
    new Student("Vika",48,[95,100,94,92,98]), 
    new Student ("Rafi",48,[86,89,92,85,98])
]);