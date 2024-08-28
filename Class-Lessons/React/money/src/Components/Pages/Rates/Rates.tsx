import { useEffect, useState } from "react";
import "./Rates.css";
import axios from "axios";
import SingleCoin from "../../rest/singleCoin/singleCoin";
import { Coin } from "../../model/coin/Coin";

function Rates(): JSX.Element {
    //useState = will render the component again ,once we will have a data
    //const [variable name,set method name] = useState<variable type>(variable init)
    const [coins,setCoins] = useState<Coin[]>([]);

    const coinURL ="http://api.coincap.io/v2/rates";

    /*
    const getCoinRateData = async()=>{
        const result =await axios.get(coinURL);
        console.log(result.data.data);
    }*/

    useEffect(() => {     
        axios.get(coinURL).then(result => {
            //console.log(result.data.data);
            setCoins(result.data.data);
        })
    },([]));

    return (
        <div className="MainPage">
			{coins.map((item,index)=><SingleCoin key={index} id={item.id} 
            symbol={item.symbol} rateUsd={item.rateUsd} 
            currencySymbol={item.currencySymbol} type={item.type}/>)}
        </div>
    );
}

export default Rates;
