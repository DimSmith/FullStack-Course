var express = require('express');
const APP = express();
const PORT = 8080;
const HOST = 'localhost';

APP.get('/', (req,res)=>{
    res.send ("Hello Express");
})

APP.listen(PORT,HOST,()=>
    console.log(`http://${HOST}:${PORT}`)
)