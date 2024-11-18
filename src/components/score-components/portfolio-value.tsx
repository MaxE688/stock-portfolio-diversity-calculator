import { useEffect, useState } from "react";
import { StockCardData } from "../../lib/definitions";

interface Props {
  stocks: Array<StockCardData>
}

export default function PortfolioValue({ stocks }: Props){

  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    let value = 0; 
    stocks.forEach(stock => {
      value += (stock.quantity * stock.price);
    })

    setTotal(value);
  }, [stocks]);


  return (
    <>
      <h3>Total Value</h3>
      <div className="score-container container">
        <div className={`price-card`}>
          <h2>{'$' + Number(total).toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
}