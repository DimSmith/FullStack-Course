import { useEffect } from "react";
import "./MainPage.css";
import { checkJWT } from "../../Utils/JWT";

export function MainPage(): JSX.Element {
    useEffect(()=>{
        checkJWT();
    },[])
    
    return (
        <div className="MainPage">
			<div className="MainPage">
			    <h1>Class 48 - the best that lecturer can get...</h1>
            </div>
        </div>
    );
}
