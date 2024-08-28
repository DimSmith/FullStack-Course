import { NavLink } from "react-router-dom";
import "./MainMenu.css";
import { useState } from "react";
import { store } from "../../Redux/store";

function MainMenu(): JSX.Element {
  const [isUser,setUser]= useState(false);
  const [isCompany,setCompany]= useState(false);
  const [isAdmin,setAdmin]= useState(false);

  store.subscribe(()=>{
    switch (store.getState().auth.role){
      case "Admin":
        setAdmin(true);
        break;
      case "Company":
          setCompany(true);
          break;
      case "User":
          setUser(true);
          break;
      default:
        setAdmin(false);
        setCompany(false);
        setUser(false);
    }
  })

  const showMainMenu = () => {
    return (
      <>
        <NavLink to={"/search/car"}>car locater</NavLink>
        <br />
        <NavLink to={"/search/bike"}>bike locater</NavLink>
        <br />
        <NavLink to={"/search/truck"}>truck locater</NavLink>
        <hr />
      </>
    );
  };

  const showAdminMenu =() =>
  {
    return(
      <>
        <NavLink to={"/"}>User List</NavLink>
        <br />
        <NavLink to={"/"}>Find User </NavLink>
        <br />
        <NavLink to={"/"}>Delete User</NavLink>
        <hr />
        <NavLink to={"/"}>Company List</NavLink>
        <br />
        <NavLink to={"/"}>Find Company </NavLink>
        <br />
        <NavLink to={"/"}>Delete Company</NavLink>
        <br />
        <NavLink to={"/hacker"}>Gabriel</NavLink>
        <hr />
    </>
    ) 
  };

  const showCompanyMenu =() =>
  {
    return(
      <>
        <NavLink to={"/"}>Vacation List</NavLink>
        <br />
        <NavLink to={"/"}>Find Vacation </NavLink>
        <br />
        <NavLink to={"/"}>Delete Vacation</NavLink>
        <br />
        <NavLink to={"/"}>Add Vacation</NavLink>
        <br />
        <NavLink to={"/"}>Update Vacation </NavLink>
        <hr />
    </>
    ) 
  }

  const showUserMenu =() =>
  {
    return(
      <>
        <NavLink to={"/"}>My vacations</NavLink>
        <br />
        <NavLink to={"/"}>Wish List</NavLink>
        <br />
        <NavLink to={"/"}>Delete Vacation</NavLink>
        <hr />        
    </>
    ) 
  }


  return (
    <div className="MainMenu">
      <h2>Main Menu</h2>
      <hr />
      {showMainMenu()}
      {isAdmin && showAdminMenu()}
      {isCompany && showCompanyMenu()}
      {isUser && showUserMenu()}
    </div>
  );
}

export default MainMenu;