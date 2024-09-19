
import { StockData } from "../lib/definitions";
import StockCard from "./stock-card";

interface Props {
  stocks: Array<StockData> | undefined,
  selectedStocks: Array<StockData>,
  stockPool: string,
  handleClick: (stock: StockData) => void
}


export default function AllStocks({ stocks, selectedStocks, stockPool, handleClick }: Props){

  return(
    <>
      <h3>{stockPool}</h3>
      <div className="all-stocks container">
        { // if there are stocks to display
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