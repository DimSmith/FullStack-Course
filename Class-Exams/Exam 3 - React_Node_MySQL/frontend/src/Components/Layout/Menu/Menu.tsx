import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h2> Choose Your Option</h2>
            <hr/>
            <NavLink to="/">Main Page</NavLink><br/>
            <hr/>
            <NavLink to="/TeamList">Development Teams</NavLink><br/><br/>
            <NavLink to="/MeetingsID">Find Meetings By ID</NavLink><br/><br/>
            <NavLink to="/AddMeeting">Add New Meeting</NavLink><br/><br/>
        </div>
    );
}
