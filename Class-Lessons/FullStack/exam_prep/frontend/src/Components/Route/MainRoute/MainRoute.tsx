import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Page404 } from "../../Pages/Page404/Page404";
import { MainPage } from "../../Layout/MainPage/MainPage";



export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
