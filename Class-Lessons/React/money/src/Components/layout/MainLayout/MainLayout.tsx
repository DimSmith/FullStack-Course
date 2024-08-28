import MainHeader from "../MainHeader/MainHeader";
import MainPage from "../MainPage/MainPage";
import "./MainLayout.css";
import MainFooter from '../MainFooter/MainFooter';
import MainMenu from "../MainMenu/MainMenu";
import MainRoute from "../../Routes/MainRoute/MainRoute";
import Login from "../Login/Login";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <MainHeader/>
            </header>

            <main>
                <MainRoute/>
            </main>

            <aside>
                <MainMenu/>
            </aside>

            <footer>
                <MainFooter/>
            </footer>
        </div>
    );
}

export default MainLayout;
