const calc = ()=> { 
    var uSalary = Number(document.getElementById("uSalary").value);
    var myResponse = `Masser 10%: ${maaser(uSalary)} Homesh 20%: ${homesh(uSalary)}`;
    document.getElementById("response").innerText = myResponse;
}

const maaser = (uSalary)=>{
    return uSalary*0.1;
}

const homesh = (uSalary)=>{
    return uSalary*0.2;
}