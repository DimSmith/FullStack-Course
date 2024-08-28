const express = require('express');
const axios = require("axios")

const APP = express();
const PORT = 3001;
const HOST = 'localhost';

const API_CAR_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=`;

const API_TRUCK_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=`;

const API_TWO_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=`;

const API_OFF_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=`;

const API_HANDI_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=`;

const API_RECALL_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=2c33523f-87aa-44ec-a736-edbb0a82975e&q=`;


//Car
APP.get('/car/:lp', (req,res)=>{
    axios.get(API_CAR_ENDPOINT + req.params.lp).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})

//Truck
APP.get('/truck/:lp', (req,res)=>{
    axios.get(API_TRUCK_ENDPOINT + req.params.lp).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})

//Two Wheels
APP.get('/two/:lp', (req,res)=>{
    axios.get(API_TWO_ENDPOINT + req.params.lp).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})
//Off Road
APP.get('/off/:lp', (req,res)=>{
    axios.get(API_OFF_ENDPOINT + req.params.lp).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})

//Handi
APP.get('/handi/:lp', (req,res)=>{
    axios.get(API_HANDI_ENDPOINT + req.params.lp).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})

//Recall
APP.get('/recall/:recallId', (req,res)=>{
    axios.get(API_RECALL_ENDPOINT + req.params.recallId).then((response) => {
        let carData = response.data.result.records[0];
        res.send(JSON.stringify(carData));
    })
})

APP.listen(PORT,HOST,()=>
    console.log(`http://${HOST}:${PORT}`)
)