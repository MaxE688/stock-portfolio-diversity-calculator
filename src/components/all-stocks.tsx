
import { StockData } from "../lib/definitions";
import StockCard from "./stock-card";

interface Props {
  stocks: Array<StockData> | undefined,
  selectedStocks: Array<StockData>,
  handleClick: (stock: StockData) => void
}


export default function AllStocks({ stocks, selectedStocks, handleClick }: Props){

  return(
    <>
      <h3>All Stocks</h3>
      <div className="all-stocks container">
        {
          stocks && stocks.map((item, i) => (
            <StockCard 
              key={i} 
              stock={item}
              isSelected={ selectedStocks.includes(item) } 
              handleClick={handleClick} 
            />
            
          )) 
        }
      </div>
    </>
  );
}