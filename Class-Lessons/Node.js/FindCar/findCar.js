var fs = require("fs");
var axios = require("axios")

const API_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=`;
let carLot = [];

function loadCarLot(){
    try {
        const loadCars = fs.readFileSync('cars.json');
        const carsData = loadCars.toString();
        return JSON.parse(carsData);
    } catch (err) {
        return [];
    }
}
carLot = loadCarLot();

const carDataSearch = (carNumber) => {
    axios.get(API_ENDPOINT + carNumber).then((response) => {
        const carData = response.data.result.records[0];
        if (carData) {
            console.log(carData);
            carLot.push(carData);
            fs.writeFileSync("cars.json", JSON.stringify(carLot),'utf8');
        } else {
            console.log("No car found with that plate number.");
        }
    }).catch((error) => {
        console.error("Error fetching car data:", error);
    });
}

carDataSearch(8714538);