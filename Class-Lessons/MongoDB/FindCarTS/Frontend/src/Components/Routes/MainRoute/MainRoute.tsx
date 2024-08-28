import { Route, Routes } from "react-router-dom";
import { MainPage } from "../../layout/MainPage/MainPage";
import { Page404 } from "../../Pages/page404/page404";
import SearchPage from '../../Pages/SearchPage/SearchPage';
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Hacker from "../../Pages/hacker/hacker";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
            <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/search/:vechileType" element={<SearchPage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/hacker" element={<Hacker/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
