var taskNameList = [];
var taskDateList = [];
var taskDoList = [];

const newTask = () => {
    var nameTask = document.getElementById("nameTask").value;
    var dateTask = String(document.getElementById("dateTask").value);
    addTask(nameTask, dateTask);
    createTable();
}

const addTask = (nameTask,dateTask) => {
    taskNameList.push(nameTask);
    taskDateList.push(dateTask);
    taskDoList.push(false);
}

const createTable   = () => {
    var result = `<table border="1" cellSpacing="0">`;
    for (var index = 0; index < taskNameList.length; index++) {
        result += `
            <tr>
                <td>${taskNameList[index]}</td>
                <td>${taskDateList[index]}</td>
                <td><input type="checkbox" ${taskDoList[index]?"checked":""}</td>
            </tr>
        `;
        }
        result  += "</table>";
        document.getElementById("taskList").innerHTML = result;
}