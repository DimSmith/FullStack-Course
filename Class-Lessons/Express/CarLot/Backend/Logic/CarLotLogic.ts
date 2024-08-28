import axios from "axios";
import { addCarToStorage, getCarsByManufacturer, getCarsByModel, getCarsByPrice, getSoldCars, updateCarSold } from "../Utils/storageUtil";
import CarData from "../Models/carData";

/*
    1.add car(get car info by lp)
    2.car sold
    3.search car by manufacture
    4.search car by price
    5.search car by model
    6.list all sold cars
*/

/*
const carInfo = async (id:string)=>{
    let carData = (await axios.get(CAR_URL+id)).data.result.records[0];
    console.log(carData);
    return carData;
}*/

//car number - 90645001
//endpoint -> data.gov.il
const CAR_URL = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=";

export const addCar = async(carNumber:string, price:number,yad:number,km:number)=>{
    //go to data gov.il

    let data = (await axios.get(CAR_URL+carNumber)).data.result.records[0];
    
    //create new object
    let carInfo = new CarData(
        carNumber,
        data["tozeret_nm"],
        data["tokef_dt"],
        data["tzeva_rechev"],
        data["sug_delek_nm"],
        data["kinuy_mishari"],
        price,
        yad,
        km,
        data["shnat_yitzur"],
    );

    //add car info to our local storage
    addCarToStorage(carInfo);
};

export const soldCar = (carNumber: string) => {
    return updateCarSold(carNumber);
};

export const searchCarByPrice = (lowPrice: number, highPrice: number) => {
    return getCarsByPrice(lowPrice,highPrice);
};

export const searchCarByManufacturer = (manufacturer: string) => {
    return getCarsByManufacturer(manufacturer);
};

export const searchCarByModel = (model: string) => {
    return getCarsByModel(model);
};

export const listSoldCar = () => {
    return getSoldCars();
};

//check methods

//check car 1
// check => addCar("90645001", 40000, 3, 420000);
// check => soldCar("90645001");
// check =>console.log(searchCarByManufacturer("מרצדס בנץ גרמנ"));
// check =>console.log(searchCarByModel("C200CDI"));

//check car 2
// check => addCar("2633430", 60000, 2, 420000);
//check => 
//console.log(searchCarByManufacturer("מזדה יפן"));
// check => console.log(searchCarByModel(MAZDA 3));

// check => 
//console.log(searchCarByPrice(35000,70000));
//console.log(listSoldCar());