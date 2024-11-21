import { useEffect, useState } from "react";
import { getSectors } from "../../lib/calculator";
import { StockCardData } from "../../lib/definitions";

interface Props {
  stocks: StockCardData[]
}


export default function PortfolioAverage({ stocks }: Props){

  // const [ sectors, setSectors] = useState(getSectors(stocks));
  const [ avg, setAvg ] = useState(0.00); 

  useEffect(() => {
    const sects = getSectors(stocks);
    // setSectors(sects);

    let total = 0; 
    stocks.forEach(stock => {
      total += (stock.quantity * stock.price);
    })

    let average = total / sects.length;
    if(Number.isNaN(average)){
      average = 0.00;
    }

    setAvg(average);
  }, [stocks]);

  return (
    <>
      <h3>Average Value</h3>
      <div className="score-container container">
        <div className={`price-card `}>
          <h2>{`$` + Number(avg).toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
}