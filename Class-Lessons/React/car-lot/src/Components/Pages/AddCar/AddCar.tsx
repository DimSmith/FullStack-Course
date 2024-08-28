import { useNavigate } from "react-router-dom";
import "./AddCar.css";
import { useState } from "react";
import axios from "axios";
import { carLot } from "../../redux/store";
import { Car } from "../../modal/Car";
import { addCarAction } from "../../redux/CarReducer";

export function AddCar(): JSX.Element {
    const API_ENDPOINT = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=`;
    const [mispar_rechev,setMispar_rechev] = useState("");
    const [tozeret_nm,setTozeret_nm] = useState("");
    const [kinuy_mishari,setKinuy_mishari] = useState("");
    const [degem_manoa,setDegem_manoa] = useState("");
    const [tzeva_rechev,setTzeva_rechev] = useState("");
    const [moed_aliya_lakvish,setMoed_aliya_lakvish] = useState("");

    const navigate = useNavigate();

    const carDataSearch = ()=>{
        axios.get(API_ENDPOINT+mispar_rechev).then((res)=>{
            console.log(res.data.result.records[0]);
            let carData = res.data.result.records[0];
            setTozeret_nm(carData.tozeret_nm);
            setKinuy_mishari(carData.kinuy_mishari);
            setDegem_manoa(carData.degem_manoa);
            setTzeva_rechev(carData.tzeva_rechev);
            setMoed_aliya_lakvish(carData.moed_aliya_lakvish);
        })
    }
    const addNewCar = ()=>{
        let carList;
        try{
            carList = JSON.parse(localStorage.getItem("myCars")||"[]");
            carLot.dispatch(addCarAction(new Car(parseInt(mispar_rechev, 10),tozeret_nm,kinuy_mishari,degem_manoa,tzeva_rechev,moed_aliya_lakvish)));
        }catch(err){
            carList = [];
        }
            
        carList.push(new Car(parseInt(mispar_rechev, 10),tozeret_nm,kinuy_mishari,degem_manoa,tzeva_rechev,moed_aliya_lakvish));
        localStorage.setItem("myCars",JSON.stringify(carList))
        navigate("/");
    }


    return (
        <div className="AddCar">
			<h1>Add new Car</h1><hr/>
            <input type="text" placeholder="Enter please car number" onKeyUp={
                (args)=>{
                    setMispar_rechev(args.currentTarget.value);
                }
            }/>
            <input type="button" value="search" onClick={carDataSearch}/>
            <hr/>
            <div className="Box">
                <h2>Car Info</h2><hr/>
                <label>Car Number:</label>{mispar_rechev}<br/>
                <label>Type:</label>{tozeret_nm}<br/>
                <label>Model:</label>{kinuy_mishari}<br/>
                <label>Engine Type:</label>{degem_manoa}<br/>
                <label>Color:</label>{tzeva_rechev}<br/>
                <label>On-Road Date:</label>{moed_aliya_lakvish}<br/>
                <label>Owner:</label><input type="text" placeholder="Enter the owner count" /><br/>
                <label>KM:</label><input type="text" placeholder="Car's KM" /><br/>
                <label>Car Pictures:</label><br/>
                <input type="url" placeholder="Url 1" /><br/>
                <input type="url" placeholder="Url 2" /><br/>
                <input type="url" placeholder="Url 3" /><br/><br/>
                <input type="button" value="Add Car" onClick={addNewCar}/>
            </div>
        </div>
    );
}
