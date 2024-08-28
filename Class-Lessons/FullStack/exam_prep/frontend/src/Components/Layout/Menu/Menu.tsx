import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h2> Main Menu</h2>
            <hr/>
            <NavLink to="/">Server List</NavLink><br/>
        </div>
    );
}
