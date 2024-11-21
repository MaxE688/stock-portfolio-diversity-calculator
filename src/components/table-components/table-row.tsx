import { useEffect, useState } from "react";
import { StockData } from "../../lib/definitions";

interface Props {
  stock: StockData,
  handleClick: (stock: StockData) => void,
  stockPool: string
  isSelected?: boolean,
}

export default function TableRow({ stock, handleClick, stockPool, isSelected = false }: Props){

  const [ price, setPrice ] = useState(0);
  const [ priceChange, setPriceChange ] = useState(0);

  useEffect(() => {
    setPriceChange( stock.price - price);
    setPrice(stock.price);
  }, [stock.price]);

  const handleEvent = (stock: StockData) => {
    if(!isSelected){
      handleClick(stock);
    }
  }

  return (
    // rename card classes
    <tr className={`${isSelected? "disabled-row" : "row"}`} onClick={() => handleEvent(stock)}>
      <td className="symbol">{stock.symbol }</td>
      <td className={`${priceChange >= 0? "green" : "red"} price`} >{Number(stock.price).toFixed(2)}</td>
      <td className="sector">{stock.sector }</td>
      <td ><button className="remove-stock">X</button></td>
        
    </tr>
  )
}