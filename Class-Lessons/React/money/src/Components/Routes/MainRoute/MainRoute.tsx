import { Route,Routes } from "react-router-dom";
import Main from "../../Pages/Main/Main";
import Assets from "../../Pages/Assets/Assets";
import Rates from "../../Pages/Rates/Rates";
import Page404 from "../../Pages/Page404/Page404";
import Exchanges from "../../Pages/Exchanges/Exchanges";
import ExchangesID from "../../Pages/ExchangesID/ExchangesID";
import Login from "../../layout/Login/Login";
import NewLogin from "../../layout/Login/NewLogin/NewLogin";

//Remember to Install : npm install react-router-dom
//Remember to Install : npm install react-dom
function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path='/' element={<NewLogin/>}/>
                <Route path='/assets' element={<Assets/>}/>
                <Route path='/rates' element={<Rates/>}/>
                <Route path='/exchanges' element={<Exchanges/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MainRoute;
