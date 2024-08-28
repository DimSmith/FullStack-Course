//Array of events
var events = [];

//Create a new event
const addEvent = () => {
    //Create a new event object
    var event = new Object();
    event.name = document.getElementById("eventName").value;
    event.min = document.getElementById("minPrice").value;
    event.max = document.getElementById("maxPrice").value;
    event.type = document.getElementById("eventType").value;
    event.date = document.getElementById("date").value;
    event.url = document.getElementById("url").value;
    var id = events.length +1;
    event.id = id;
    console.log(id);

    //Checking Min and Max
    if(event.min > event.max){
        alert("The Minimum is bigger than the Maximum");
        return;
    }

    //Checking Date
    if(new Date(event.date)< new Date()){
        alert("You can't choose date in past");
        return;
    }

    //Pushing the new event to array
    events.push(event);

    //Adding event to table
    createTable();

    //Clear Form Inputs
    resetForm();

    console.log(events);

};

//Create Table Function
const createTable = () => {
    var listBody= "";
    var listHeader =`
    <tr>
        <th>Name</th>
        <th>Min Price</th>
        <th>Max Price</th>
        <th>Type</th>
        <th>Date</th>
        <th>Picture</th>
    </tr>
    `;
    for(var index=0; index<events.length; index++) {
        listBody +=`
            <tr>
                <td>${events[index].name}</td>
                <td>${events[index].min}</td>
                <td>${events[index].max}</td>
                <td>${events[index].type}</td>
                <td>${events[index].date}</td>
                <td><img src="${events[index].url}" width="100px"></td>
                <td><input type="button" value="Done" onclick="deleteRow(${events[index].id})"/></td>
            </tr>
        `;
    }
    document.getElementById("eventList").innerHTML = listHeader+listBody;   
}

//Rest Function
const resetForm = () => {
    document.getElementById("formList").reset();
};

//Deleting Specific Event
const deleteRow = (row) => {
    var clear = events.filter((array,index)=>{
        if(array.id === row){
            events.splice(index, 1);
            createTable();
        }
    })
}
