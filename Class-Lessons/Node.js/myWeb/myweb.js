var http = require("http");
var fs = require("fs");
var url = require('url');
const webPort=8080;

http.createServer(function(req,res){
    let query = url.parse(req.url,true).query;
    fs.readFile(query.lang=='heb'?'indexHeb.html':'./indexEng.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
        return res.end();
    });
    //הודעה למסך תרוץ קודם י קריאת הקובץ אסינכרונית
    //console.log("done reading index.html");
}).listen(webPort);
console.log(`http://localhost:${webPort}`);
