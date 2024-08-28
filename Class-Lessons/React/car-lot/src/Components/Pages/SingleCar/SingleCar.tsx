import { Car } from "../../modal/Car";
import "./SingleCar.css";

interface carProps{
    car:Car;
}

export function SingleCar(props:carProps): JSX.Element {
    return (
        <div className="SingleCar">
            <div className="Box">
                <div className="Grid-Parent">
                    <div className="Grid-Child">
                        {props.car.mispar_rechev}<br/>
                        {props.car.tozeret_nm}<br/>
                        {props.car.kinuy_mishari}<br/>
                        {props.car.degem_manoa}<br/>
                        {props.car.tzeva_rechev}<br/>
                        {props.car.moed_aliya_lakvish}<br/>
                    </div>
                </div>
            </div>
        </div>
    );
}
