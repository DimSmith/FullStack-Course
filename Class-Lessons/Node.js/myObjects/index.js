var http = require('http');
var fs = require('fs');

http.createServer((request,response)=>{
    fs.readFile('html/index.html',(err,data)=>{
    //write header , 200 OK code
        response.writeHead(200, {'Content-Type':'text/html'});
        let myInfo = {
            "name":"Zeev",
            "age":50,
            "address" : "qiryat yam",
            "password" : "ssshhhhhh",
        };
        // Create a new object with only name and address
        let infoForLogging = {
            "name": myInfo.name,
            "address": myInfo.address
        };
        let myInfoJSON = JSON.stringify(infoForLogging);
        myLogger2(myInfoJSON,"\n"); // Pass the modified object for logging
        myLogger((fileData)=>{
            response.write("Log file content: "+"\n"+fileData);
            response.end();
        })
    })
}).listen(8080);
console.log("server at: http://localhost:8080");

const myLogger=(callBack)=>{
    fs.readFile("log/myLogger.log",'utf8', (err,fileData)=>{
        if (err) {
            console.error(err);
            return;
            }
        callBack(fileData);
    });
};

const myLogger2=(data)=>{
    fs.appendFile('log/myLogger.log',data + "\n",(err,file)=>{ // Added "\n" here for newline after each log
        if (err){
            //handle write error to error.log
            console.log(err);
            return;
        }
        console.log('Added new record!');
    })
}