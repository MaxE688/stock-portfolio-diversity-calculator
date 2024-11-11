
import { StockData } from "../lib/definitions";
import StockCard from "./stock-card";
import TableRow from "./table-row";

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
      {/* <div className="all-stocks container">
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
      </div> */}
      
      {/* create table row component for stocks */}
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Sector</th>
            <th>{stockPool === "Custom List"? "Remove" : " "}</th>
          </tr>
        </thead>
        <tbody>
          {
            stocks && stocks.map((stock, i) => (
             
              <TableRow
                key={i} 
                stock={stock} 
                handleClick={handleClick} 
                stockPool={stockPool}                
                isSelected={ selectedStocks.includes(stock) } 
              />
            ))
          }
        </tbody>
      </table>
    </>
  );
}