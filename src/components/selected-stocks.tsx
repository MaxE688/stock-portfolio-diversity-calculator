import { StockData } from "../lib/definitions";
import StockCard from "./stock-card";

interface Props {
  stocks: Array<StockData>,
  handleClick: (s: StockData) => void
}

export default function SelectedStocks({ stocks, handleClick }: Props){

  
  return (
    <>
      <h3>Selected Stocks</h3>
      <div className="selected-stocks container">
        {
          stocks.length !== 0 ? 
            stocks.map((item, i) => (
              <StockCard key={i} stock={item} handleClick={handleClick}/>
            ))
            :
            <div className="card-placeholder">
            </div> 
        }
      </div>
    </>
  );
}