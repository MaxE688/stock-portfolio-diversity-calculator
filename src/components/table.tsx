import { StockData } from "../lib/definitions"
import TableRow from "./table-row"

interface Props {
  stocks: Array<StockData> ,
  selectedStocks: Array<StockData>,
  stockPool: string,
  handleClick: (stock: StockData) => void
}

export default function Table({ stocks, selectedStocks, stockPool, handleClick }: Props){
  
  // console.log("");
  

  return (
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
          stocks.map((stock, i) => (
            
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
  )
}