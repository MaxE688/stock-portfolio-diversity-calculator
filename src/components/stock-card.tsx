import { useEffect, useState } from "react";
import { StockCardData, StockData } from "../lib/definitions";

interface Props {
  handleClick: (stock: StockData) => void,
  handleQtyChange: (n: number, s: string) => void
  stock: StockCardData,
  isSelected?: boolean
}

export default function StockCard({ handleClick, handleQtyChange, stock, isSelected = false }: Props){

  // track price changes to assign color
  const [ price, setPrice ] = useState(0);
  const [ priceChange, setPriceChange ] = useState(0);
  const [ qty, setQty ] = useState(1);
  
  // update price values
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
  
  const handleQuantity = (val: string) => {
    // const qty = Number.parseInt(val);
    if(val !== ""){
      const q = Number.parseInt(val);
      setQty(q)
      handleQtyChange( q, stock.symbol );
      console.log(val)
    }
  }
  

  return (
    <div className={`${ isSelected? "disabled-card" : "card"}`} >
      <div className="unselect-stock" onClick={() => handleEvent(stock)}>
        <img src='./close-circle-svgrepo-com.svg' />
      </div>
      <div className="card-content">
        <p className="symbol">{stock.symbol}</p>
        <p className={`${priceChange >= 0? "green" : "red"} price`}>${Number(stock.price).toFixed(2)}</p>
        <p className="sector">{stock.sector}</p>
      </div>
      <div className="quantity-input-container">
        <label>QTY:</label>
        <input 
          className="quantity-input" 
          defaultValue={qty}
          onChange={ e => handleQuantity(e.target.value) }  
        ></input>
      </div>
    </div>
  );

}