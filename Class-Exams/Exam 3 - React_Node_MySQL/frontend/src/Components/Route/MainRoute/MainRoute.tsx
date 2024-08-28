import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Page404 } from "../../Pages/Page404/Page404";
import { MainPage } from "../../Layout/MainPage/MainPage";
import { TeamList } from "../../Pages/TeamList/TeamList";
import { MeetingsID } from "../../Pages/MeetingsID/MeetingsID";
import { AddMeeting } from "../../Pages/AddMeeting/AddMeeting";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/TeamList" element={<TeamList/>}/>
                <Route path="/MeetingsID" element={<MeetingsID/>}/>
                <Route path="/AddMeeting" element={<AddMeeting/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
