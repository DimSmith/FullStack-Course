//Loading the array from the local storage
var tasks = JSON.parse(localStorage.getItem("myTasks"));
if (tasks == null){
    var tasks = [];
}
taskNote();

//Function of building task on board
function taskNote(){
    var note ="";
    for(var index=0; index<tasks.length; index++) {
        note +=`
        <div class="col" id="noteStyle">
            <button type="button" class="btn btn-close" id="closeButton" onclick="deleteTask(${tasks[index].id})"></button>
            <div><textarea rows="6" readonly>${tasks[index].description}</textarea></div>
            <div id="dataArea">${tasks[index].date}</div>
            <div id="timeArea">${tasks[index].time}</div>
        </div>
        `;
    }
    document.getElementById("notes").innerHTML = note;
}

//Adding new task to array
const addTask =() => {
    //Making new object
    var task = new Object();
    task.description = document.getElementById("taskDescription").value;
    task.date = document.getElementById("taskDate").value;
    task.time = document.getElementById("taskTime").value;

    //adding id for new task
    var id = tasks.length +1;
    task.id =id;

    //alert massage for invalid date
    if(new Date(task.date)< new Date()){
        alert("You can't choose date in past");
        return;
    }

    tasks.push(task);

    //Reset form inputs after adding task
    resetForm();

    //Add the new task on board
    taskNote();

    //Save the new task in storage
    saveTask();
}

//Rest Function
const resetForm = () => {
    document.getElementById("form").reset();
};

//Saves task in local storage
const saveTask = ()=>{
    localStorage.setItem("myTasks",JSON.stringify(tasks));
};

//Delete task 
const deleteTask = (note) => {
    var clear = tasks.filter((array,index)=>{ 
        if(array.id === note){
            tasks.splice(index, 1);

            //Changing and build task notes board without the deleted task
            taskNote();

            //Update array in the local storage
            saveTask();
        }
    })
};
