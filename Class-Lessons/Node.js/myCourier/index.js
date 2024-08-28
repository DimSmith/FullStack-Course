var http = require('http');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const LOGGER_FILE_URL = 'logger/deliveryLog.log';

const PORT = 8080;


const deliveryStatus = {
	Call: "CourierCall",
	Out: "CourierOut",
	Arrived: "CourierArrived",
	Delivered: "PackageDelivered",
    Return: "CourierReturned"
}

http.createServer((request,response)=>{
    response.end("Sending our courier");
    eventEmitter.emit(deliveryStatus.Call);
}).listen(PORT);

console.log(`server was started: http://localhost:${PORT}`);

const callHandler = () => {
    console.log("The Courier was called");
    eventEmitter.emit(deliveryStatus.Out);
    setTimeout(outHandler, 5000); // Schedule next event
};

const outHandler = () => {
    console.log("The Courier is out for delivery");
    eventEmitter.emit(deliveryStatus.Arrived);
    setTimeout(arriveHandler, 5000); // Schedule next event
};

const arriveHandler = () => {
    console.log("The Courier has arrived at the destination");
    eventEmitter.emit(deliveryStatus.Delivered);
    setTimeout(deliverHandler, 5000); // Schedule next event
};

const deliverHandler = () => {
    console.log("The Courier has delivered the package");
    eventEmitter.emit(deliveryStatus.Return);
    setTimeout(returnHandler, 5000); // Schedule next event
};

const returnHandler = () => {
    console.log("The Courier has returned");
};
// Register event handlers
eventEmitter.on(deliveryStatus.Call, callHandler);
eventEmitter.on(deliveryStatus.Out, outHandler);
eventEmitter.on(deliveryStatus.Arrived, arriveHandler);
eventEmitter.on(deliveryStatus.Delivered, deliverHandler);
eventEmitter.on(deliveryStatus.Return, returnHandler);

// Start the process
setTimeout(callHandler, 5000);