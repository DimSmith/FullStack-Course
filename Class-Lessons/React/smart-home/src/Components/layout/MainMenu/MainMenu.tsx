import { NavLink } from "react-router-dom";
import "./MainMenu.css";

export function MainMenu(): JSX.Element {
    return (
        <div className="MainMenu">
			<h1>Main Menu</h1><hr/>
            Get Info From Server<br/>
            Show Devices<br/>
            Save Data<br/>
            Send To Controller<br/>
        </div>
    );
}
