import { useEffect, useState } from "react";
import { Exchange } from "../../model/coin/Excange";
import "./ExchangesID.css";
import { useParams } from "react-router-dom";
import axios from "axios";

interface SingleItem {
  item?: Exchange;
}

function ExchangesID(props: SingleItem): JSX.Element {
  const [excange, setItem] = useState<Exchange>();
  const EXCHANGE_ID_URL = "http://api.coincap.io/v2/exchanges/";
  const params = useParams();
  const nFormat = new Intl.NumberFormat();

  console.log(excange);
  if (params.id?.length !== undefined && excange === undefined) {
    axios.get(EXCHANGE_ID_URL + params.id).then((result) => {
      setItem(result.data.data);
      console.log("repeat");
    });
  }
  // useEffect(()=>{
  //     axios.get(EXCHANGE_ID_URL+params.id).then(result=>{
  //         setItem(result.data.data);
  //     })
  // },[])

  return (
    <div className="ExchangesID Box">
      {props.item ? props.item.id : excange?.id}
      <br />
      {props.item ? props.item.name : excange?.name}
      <br />
      {props.item ? props.item.rank : excange?.rank}
      <br />
      {props.item
        ? nFormat.format(Number(props.item.percentTotalVolume))
        : nFormat.format(Number(excange?.percentTotalVolume))}
      <br />
      {props.item
        ? nFormat.format(Number(props.item.volumeUsd))
        : nFormat.format(Number(excange?.volumeUsd))}
      <br />
      {props.item ? props.item.tradingPairs : excange?.tradingPairs}
      <br />
      <a
        href={
          props.item
            ? props.item.exchangeUrl.toString()
            : excange?.exchangeUrl.toString()
        }
      >
        visit site
      </a>
    </div>
  );
}

export default ExchangesID;