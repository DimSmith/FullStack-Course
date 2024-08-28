const inputTypes = () => {
    var form = `
    <form>
    <input type="number" placeholder="Plate Number" id="plateNumber"/><br /><br />
    <input type="number" placeholder="field1" name="field1"/><br /><br />
    <input type="number" placeholder="field2" name="field2"/><br /><br />
    <input type="number" placeholder="field3" name="field3"/><br /><br />
    <input type="number" placeholder="field4" name="field4"/><br /><br />
    <input type="number" placeholder="field5" name="field5"/><br /><br />
    <input type="number" placeholder="field6" name="field6"/><br /><br />
    <input type="number" placeholder="field7" name="field7"/><br /><br />
    </form>
    <input type="button" value="add Car" id="add" /><br /><br />
    `
    document.getElementById("mySite").innerHTML = form;
}
inputTypes();

function Cars(plateNumber,field1,field2,field3,field4,field5,field6,field7){
    this.plateNumber=plateNumber;
    this.field1=field1;
    this.field2=field2;
    this.field3=field3;
    this.field4=field4;
    this.field5=field5;
    this.field6=field6;
    this.field7=field7;
    
}

const addCar = ()=>{
    var plateNumber = document.getElementById("plateNumber").value;
    Cars.push(new Tasks(plateNumber,field1,field2,field3,field4,field5,field6,field7));
    createTable();
}
//var adding = document.getElementById("add").addEventListener("click", addCar);

function createTable(){
    var result = `<table border="1" cellSpacing="0" style="margin-left:auto;margin-right:auto">`;
    var cars = [];
    for (var index=0;index<cars.length;index++){       
        result += `
            <tr>
                <td>${cars[index].plateNumber}</td>
                <td>${cars[index].field1}</td>
                <td>${cars[index].field3}</td>
                <td>${cars[index].field4}</td>
                <td>${cars[index].field5}</td>
                <td>${cars[index].field6}</td>
                <td>${cars[index].field7}</td>
            </tr>
        `;
    }
    result+="</table>" 
    document.getElementById("mySite").innerHTML = result;
}








