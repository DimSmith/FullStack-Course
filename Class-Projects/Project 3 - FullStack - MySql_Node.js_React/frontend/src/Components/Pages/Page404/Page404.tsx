import { useNavigate } from "react-router-dom";
import "./Page404.css";

export function Page404(): JSX.Element {
    const navigate = useNavigate();

    const handleGoToMain = () => {
        navigate("/main");
    };

    return (
        <div className="Page404">
			<h1>You are in the wrong place</h1>
            <button onClick={handleGoToMain}>Go Back</button>
        </div>
    );
}