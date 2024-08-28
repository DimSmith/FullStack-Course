import "./MainHeader.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../Redux/store";
import { logoutAction } from "../../Redux/AuthReducer";
import notify from "../../Utils/Notify";
import { checkJWT } from "../../Utils/JWT";


export  function MainHeader(): JSX.Element {
  const [isLogged, setLogged] = useState(false);
  const navigate = useNavigate();
  store.subscribe(() => {
    setLogged(store.getState().auth.jwt.length>10);
    //checkJWT();
  });
  useEffect(() => {
    const myJWT = localStorage.getItem("jwt") || "";
    setLogged(myJWT?.length > 10);
  }, []);
  const logoutButton = () => {
    return (
      <>
        <input
          type="button"
          value="logout"
          onClick={() => {
            store.dispatch(logoutAction());
            notify.success("Goodbye")
            localStorage.removeItem("jwt");
          }}
        />
      </>
    );
  };

  const loginButton = () => {
    return (
      <>
        <input
          type="button"
          value="login"
          onClick={() => {
            navigate("/login");
          }}
        />
        <input
          type="button"
          value="register"
          onClick={() => navigate("/register")}
        />
      </>
    );
  };
    return (
      <div className="Header">
      <div>
        <h2>Car Finder</h2>
        <div>Hello {store.getState().auth.name}</div>
        <div>{isLogged ? logoutButton() : loginButton()}</div>
      </div>
    </div>
    );
  }

export default MainHeader;