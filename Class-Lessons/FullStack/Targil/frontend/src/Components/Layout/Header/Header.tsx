import "./Header.css";
import Image from '../../Assets/Logo.jpg';

export function Header(): JSX.Element {
    return (
        <div className="Header">
                <img src={Image} alt="Steimatzky_Logo"></img>
        </div>
    );
}
