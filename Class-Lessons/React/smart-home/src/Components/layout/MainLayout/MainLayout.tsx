import { ShowComponents } from "../../Pages/ShowComponents/ShowComponents";
import { MainRoute } from "../../Routes/MainRoute/MainRoute";
import MainFooter from "../MainFooter/MainFooter";
import MainHeader from "../MainHeader/MainHeader";
import { MainMenu } from "../MainMenu/MainMenu";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
    return (
        <div className="MainLayout">
			<header>
                <MainHeader/>
            </header>

            <aside>
                <MainMenu/>
            </aside>

            <main>
                <ShowComponents/>
            </main>

            <footer>
                <MainFooter/>
            </footer>
        </div>
    );
}

export default MainLayout;
