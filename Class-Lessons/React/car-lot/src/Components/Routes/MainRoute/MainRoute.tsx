import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { CarList } from "../../Pages/CarList/CarList";
import { AddCar } from "../../Pages/AddCar/AddCar";
import { RemoveCar } from "../../Pages/RemoveCar/RemoveCar";
import { Page404 } from "../../Pages/Page404/Page404";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<CarList/>}/>
                <Route path="/addCar" element={<AddCar/>}/>
                <Route path="/removeCar" element={<RemoveCar/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
