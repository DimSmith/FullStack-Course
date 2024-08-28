import { Car } from "../../../modal/Car";
import "./SingleItem.css";

interface carProps{
    carItem:Car;
}

export function SingleItem(props:carProps): JSX.Element {
    return (
        <div className="SingleItem">
			<b><span className="carNumber">{props.carItem.mispar_rechev}</span></b><hr/>
            <div className="carInfo">
                {props.carItem.baalut}<br/>
                {props.carItem.tozeret_nm}<br/>
                {props.carItem.kinuy_mishari}<br/>
                {props.carItem.sug_delek_nm}<br/>
            </div>
        </div>
    );
}
