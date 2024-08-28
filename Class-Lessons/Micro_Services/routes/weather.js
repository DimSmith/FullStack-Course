const express = require('express');
const http = require('http');
const path = require('path')

const weatherRouter = express.Router();

// weatherRouter.get("/",(req,res)=>{
//         console.log(__dirname+"/index.html");
//         res.sendFile(__dirname + "/index.html");
//         //res.sendFile("./index.html");
//     }
// );

weatherRouter.get("/:city",(req,res)=>{
    const city = req.params.city;
    const apiKey = "d7d6743da6a8498c89d160840240608";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    http.get(url, (response)=>{
        response.on("data", (myData)=>{
            const responseData = JSON.parse(myData);
            res.json(responseData);
        });
    });
});

weatherRouter.post("/",(req,res)=>{
    const city = req.body.cityName;
    const apiKey = "d7d6743da6a8498c89d160840240608";

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    http.get(url, (response)=>{
        response.on("data", (myData)=>{
            const responseData = JSON.parse(myData);
            console.log(responseData);
            const temperature = responseData.current.temp_c;
            const weatherDes = responseData.current.condition.text;
            const icon = "https:"+responseData.current.condition.icon;
            // res.write(`<h1>the wather is ${temperature} degree celisuis in ${city} and it's ${weatherDes}</h1>`);
            // res.write(`<img src="${icon}"/>`);
            // res.send();
            res.json(responseData);
        });
    });
})

module.exports = weatherRouter;