import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h2> Main Menu</h2>
            <hr/>
            <NavLink to="/">Main Page</NavLink><br/>
            <hr/>
            <NavLink to="/bookList">Book List</NavLink><br/>
            <NavLink to="/addBook">Add Book</NavLink><br/>
            <NavLink to="/deleteBook">Remove Book</NavLink><br/>
            <hr/>
            <NavLink to="/authorsList">Authors List</NavLink><br/>
        </div>
    );
}
