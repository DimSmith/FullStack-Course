import { NavLink } from "react-router-dom";
import "./MainMenu.css";

export function MainMenu(): JSX.Element {
    return (
        <div className="MainMenu">
			<h2>Choose an option:</h2><hr/>
                <NavLink to="/">Cars List</NavLink><br/><br/>
                <NavLink to="/addCar">Add New Car</NavLink> <br/><br/>
                <NavLink to="/removeCar">Remove Car</NavLink>
        </div>
    );
}
