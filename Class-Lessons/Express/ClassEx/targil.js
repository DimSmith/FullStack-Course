var express = require('express');
const APP = express();
const PORT = 8080;
const HOST = 'localhost';

const studentGrades = [
    {"id":1,"name":"John","grade":95},
    {"id":2,"name":"Max","grade":100},
    {"id":3,"name":"Philip","grade":88},
    {"id":4,"name":"Carl","grade":72},
    {"id":5,"name":"Lorenzo","grade":55},
    {"id":6,"name":"Heinz","grade":68} 
];

APP.get('/list', (req,res)=>{
    res.send (studentGrades);
})

APP.get('/list/:id', (req,res)=>{
    res.send (studentGrades.find(singleStudent => singleStudent.id == req.params.id));
})

APP.listen(PORT,HOST,()=>
    console.log(`http://${HOST}:${PORT}`)
)