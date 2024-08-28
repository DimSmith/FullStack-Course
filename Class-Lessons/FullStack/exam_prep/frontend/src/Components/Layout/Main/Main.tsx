import { MainRoute } from "../../Route/MainRoute/MainRoute";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import "./Main.css";

export function Main(): JSX.Element {
    return (
        <div className="Main">
			<header>
                <Header/>
            </header>

            <aside>
                <Menu/>
            </aside>

            <main>
                <MainRoute/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}
