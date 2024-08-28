import { Coin } from "../../model/coin/Coin";
import "./singleCoin.css";

/*
interface SingleCoinProps {
    id:String;
    symbol:String;
    rateUsd:String;
    currencySymbol:String;
    type:String
}
*/
                //(props: SingleCoinProps)
function SingleCoin(props: Coin): JSX.Element {
    return (
        <div className="singleCoin Box">
            <b><div>{props.id}</div></b><hr/>
            <div>{props.symbol}</div><hr/>
            <div>{props.rateUsd}</div><hr/>
            <div>{props.currencySymbol}</div><hr/>
            <div>{props.type}</div><hr/>
        </div>
    );
}

export default SingleCoin;
