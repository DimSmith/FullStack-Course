import { Navigate, Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Page404 } from "../../Pages/Page404/Page404";
import { MainPage } from "../../Pages/MainPage/MainPage";
import { SignIn } from "../../Pages/SignIn/SignIn";
import { SignUp } from "../../Pages/SignUp/SignUp";
import { PrivacyPolicy } from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import { AddVacation } from "../../Pages/AddVacation/AddVacation";
import { Reports } from "../../Pages/Reports/Reports";


export function MainRoute(): JSX.Element {
    return (
			<Routes>
                <Route path="/" element={<Navigate to="/SignIn" replace />} />
                <Route path="/Main" element={<MainPage/>}/>
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp/>} />
                <Route path="/AddVacation" element={<AddVacation/>} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
                <Route path="/Reports" element={<Reports/>} />
                <Route path="*" element={<Page404/>}/>
            </Routes>
    );
}
