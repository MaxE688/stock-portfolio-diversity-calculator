import { useEffect, useState } from "react";
import { StockData } from "../lib/definitions";

interface Props {
  stock: StockData,
  handleClick: (stock: StockData) => void,
  isSelected?: boolean
}

export default function StockCard({ stock, handleClick, isSelected = false }: Props){

  // track price changes to assign color
  const [ price, setPrice ] = useState(0);
  const [ priceChange, setPriceChange ] = useState(0);
  
  useEffect(() => {
    setPriceChange( stock.price - price);
    setPrice(stock.price)
  }, [stock.price]);

  // handle click event  for each card
  const handleEvent = (stock: StockData) => {
    if(!isSelected){
      handleClick(stock);
    }
  }
  
  

  return (
    <div className={`${ isSelected? "disabled-card" : "card"}`} onClick={() => handleEvent(stock)}>
      <p className="symbol">{stock.symbol}</p>
      <p className={`${priceChange >= 0? "green" : "red"} price`}>${Number(stock.price).toFixed(2)}</p>
      <p className="sector">{stock.sector}</p>
    </div>
  );

}