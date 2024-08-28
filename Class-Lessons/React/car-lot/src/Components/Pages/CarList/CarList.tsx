import { useEffect, useState } from "react";
import "./CarList.css";
import { Car } from "../../modal/Car";
import { carLot } from "../../redux/store";
import { downloadCarAction } from "../../redux/CarReducer";
import { SingleCar } from "../SingleCar/SingleCar";

export function CarList(): JSX.Element {
    const [carList, setCarList] = useState<Car[]>([]);
    useEffect(() => {
        if (carLot.getState().cars.allCars.length < 1) {
            try{
                let myCars = JSON.parse(localStorage.getItem("myCars") || "")|| [];
                if (myCars.length > 0) {
                setCarList(myCars);
                carLot.dispatch(
                    downloadCarAction(myCars)
                    );
                }
            }catch(err){
                console.log("Error");
            }
        }
    },[]);


    return (
        <div className="CarList">
			<h1>The Cars in the lot are:</h1><hr/>
            {carLot.getState().cars.allCars.map((car,index) => (
            <SingleCar key={index} car={car} />))}
        </div>
    );
}
