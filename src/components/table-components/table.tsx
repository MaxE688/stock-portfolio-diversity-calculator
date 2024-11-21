import { useEffect } from "react";
import { StockData } from "../../lib/definitions"
import TableRow from "./table-row"

interface Props {
  stocks: Array<StockData> ,
  selectedStocks: Array<StockData>,
  stockPool: string,
  handleClick: (stock: StockData) => void
}

export default function Table({ stocks, selectedStocks, stockPool, handleClick }: Props){
  
  // const breakpoint = "here";

  

  return (
    <table id="stocks-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Current Price</th>
          <th>Sector</th>
          <th>{"Remove"}</th>
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
              isSelected={ selectedStocks.findIndex((s) => stock.symbol === s.symbol) > -1 } 
            />
          ))
        }
      </tbody>
    </table>
  )
}