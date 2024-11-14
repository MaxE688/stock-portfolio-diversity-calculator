import { StockCardData, StockData } from "../lib/definitions";
import StockCard from "./stock-card";

interface Props {
  stocks: Array<StockCardData>,
  handleClick: (s: StockData) => void,
  handleQtyChange: (n: number, s:string) => void
}

export default function SelectedStocks({ stocks, handleClick, handleQtyChange }: Props){

  
  return (
    <>
      <h3>Selected Stocks</h3>
      <div className="selected-stocks container">
        { // if there are selected stock, display stocks, else display empty container
          stocks.length !== 0 ? 
            stocks.map((item, i) => (
              <StockCard 
                key={i} 
                stock={item} 
                handleClick={handleClick}
                handleQtyChange={handleQtyChange}  
              />
            ))
            :
            <div className="card-placeholder">
            </div> 
        }
      </div>
    </>
  );
}