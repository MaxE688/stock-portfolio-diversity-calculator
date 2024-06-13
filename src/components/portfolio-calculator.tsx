import { useEffect, useState } from "react";
import { StockData, TradeInfo, dow30 } from "../lib/definitions";
import useStocks from "../lib/use-stocks";
import AllStocks from "./all-stocks";
import SelectedStocks from "./selected-stocks";
import DiversityCalculator from "./diversity-calculator";


export default function PortfolioCalculator(){

  // stocks array used to populate All Stocks section
  // selectedStocks array used to populate Selected Stocks section
  const [ stocks, setStocks ] = useState<Array<StockData>>([]);
  const [ selectedStocks, setSelectedStocks ] = useState<Array<StockData>>([]);



  // trades array stores data from the websocket connection 
  const trades: Array<TradeInfo> = useStocks(`wss://ws.finnhub.io?token=${import.meta.env.VITE_API_TOKEN}`);



  // update stocks array when new trade data comes in
  useEffect(() => {
    if( trades.length > 0 ){
      setStocks((prevStocks) => {
        const newStocks = [...prevStocks];

        // for each trade, update stocks array
        trades.forEach((trade) => {
          const index = prevStocks.findIndex((stock) => stock.symbol === trade.s );
          
          // if traded symbol is already in stocks array, update value of price
          // else add new stock to array
          if(index >= 0){

            newStocks[index].price = trade.p;

          }
          else{

            newStocks.push({ symbol: trade.s, sector: String(dow30.get(trade.s)), price:trade.p });
            
          }
        });

        return newStocks;
      });

    }

  }, [trades]);



  // event listener: adds clicked stock card to selectedStocks array
  const handleSelectStock = (stock: StockData) => {
    console.log("Clicked:", stock.symbol)
    setSelectedStocks((prev) => { 

      if(prev.find((prevItem) => stock.symbol === prevItem.symbol )) {
        return prev;
      }
      
      return [ ...prev, stock];
    });
  }



  // event listener: removes clicked stock card from selectedStocks array
  const handleUnselectStock = (stock: StockData) => {
    console.log("Clicked:", stock.symbol)
    setSelectedStocks((prev) => {

      const index = prev.findIndex((item) => stock.symbol === item.symbol );
      const temp = [...prev];
      
      temp.splice(index,1);
      
      return temp;
    });
  }



  return (
    <div>
      <div className="portfolio-container">
        <div>
          <SelectedStocks stocks={selectedStocks} handleClick={handleUnselectStock}/>
        </div>
        <div className="calculator-container">
          <DiversityCalculator stocks={selectedStocks} />
        </div>
      </div>
      <AllStocks stocks={stocks} selectedStocks={selectedStocks} handleClick={handleSelectStock}/>
    </div>
  );
}





