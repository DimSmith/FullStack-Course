function turnOn(){
    console.log("Light is on");
}

function turnOff(){
    console.log("Light is off");
}

function lightCommand(state){
    console.log("Light is ",state?"On":"Off");
}

//zigbee,zwave,wifi

//Arrow functions

/*
var zigbee = (state)=>{
    console.log("zigbeb Light is ",state?"On":"Off");
}

var zwave = (state)=>{
    console.log("zwave Light is ",state?"On":"Off");
}

var wifi = (state)=>{
    console.log("wifi Light is ",state?"On":"Off");
}
*/

//in backtick we trust
var zigbee = (state,nodeId)=>{
    console.log(`zigbee>node id:${nodeId} is turned ${state?"On":"Off"}`);
}

var zwave = (state,nodeId)=>{
    console.log(`zwave>node id:${nodeId} is turned ${state?"On":"Off"}`);
}

var wifi = (state,nodeId)=>{
    console.log(`wifi>node id:${nodeId} is turned ${state?"On":"Off"}`);
}

lightCommand=zigbee;
lightCommand(false,5);

wifi(true,3);