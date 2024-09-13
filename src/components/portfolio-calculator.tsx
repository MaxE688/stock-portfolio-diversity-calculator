import { useEffect, useRef, useState } from "react";
import { StockData, TradeInfo, dow30, quoteData } from "../lib/definitions";
import useStocks from "../lib/use-stocks";
import AllStocks from "./all-stocks";
import SelectedStocks from "./selected-stocks";
import DiversityCalculator from "./diversity-calculator";
import { messageRecieved, startTick, subscribe } from "../lib/ws-operations";


// export const websocketContext = createContext(false, null, () => {});
// export const websocketContext = createContext();


export default function PortfolioCalculator(){

  // stocks array used to populate All Stocks section
  // selectedStocks array used to populate Selected Stocks section
  const [ stocks, setStocks ] = useState<Array<StockData>>([]);
  const [ selectedStocks, setSelectedStocks ] = useState<Array<StockData>>([]);
  const [ trades, setTrades ] = useState<Array<TradeInfo>>([])

  //Websocket Context states
  const [ reconnect, setReconnect ] = useState(true);
  const [ value, setValue ] = useState(null);
  const socketRef = useRef<WebSocket | null>(null);

  // get initial stock data before websocket starts updating
  useEffect(() => {
    // fetch("http://localhost:3000")
    fetch("https://one-off-backends.onrender.com")
      .then((res) => res.json())
      .then((resData) => {
        console.log(JSON.parse(resData));
        const parsedData = JSON.parse(resData);
        const formattedStocks: StockData[] = parsedData.map((stock: {data: quoteData, name: string}) => {
          return{
            price: stock.data.c,
            sector: dow30.get(stock.name),
            symbol: stock.name
          };
        }); 

        setStocks(formattedStocks);
      });

    // create and configure websocket
    // let socket: WebSocket;
    try {
      const socket = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_API_TOKEN}`);
      

      //this is where the listeners are configured, add custom functions to get expected behavior
      socket.onopen = () => {
        console.log("Socket opened");
        // setIsReady(true);
        
        if(sendToSocket !== undefined){
          subscribe(Array.from(dow30.keys()), sendToSocket);
        }
        startTick(setTrades);
        
      };
      socket.onclose = () => {
        // setIsReady(false);
        console.log("Socket closed");
      };
      socket.onmessage = (event) => {
        // setValue(event.data);
        messageRecieved(event);
        console.log("onmessage: ")
      };

      socketRef.current = socket;
      const sendToSocket= socketRef.current?.send.bind(socketRef.current);

      return () => {
        if(socket.readyState === socket.OPEN) {
          console.log("Closing socket");
          setReconnect(false);
          socket.close()
        }
      };

    } catch (error) {
      console.log("WebSocket Error:", error)
    }
  }, []);

  
  // const context = [isReady, value, sendToSocket];

  


  // // trades array stores data from the websocket connection 
  // const trades: Array<TradeInfo> = useStocks(`wss://ws.finnhub.io?token=${import.meta.env.VITE_API_TOKEN}`);



  // update stocks array when new trade data comes in
  useEffect(() => {
    if( trades.length > 0 ){
      setStocks((prevStocks) => {
        const newStocks = [...prevStocks];

        // for each trade, update stocks array
        trades.forEach((trade) => {
          const index = prevStocks.findIndex((stock) => stock.symbol === trade.s );
          
          // if traded symbol is already in stocks array, update value of price
          // else add new stock to array
          if(index >= 0){
            newStocks[index].price = trade.p;
          }
          else{
            newStocks.push({ symbol: trade.s, sector: String(dow30.get(trade.s)), price:trade.p });
          }
        });

        return newStocks;
      });
    }
  }, [trades]);



  // event listener: adds clicked stock card to selectedStocks array
  const handleSelectStock = (stock: StockData) => {
    console.log("Clicked:", stock.symbol)
    setSelectedStocks((prev) => { 

      if(prev.find((prevItem) => stock.symbol === prevItem.symbol )) {
        return prev;
      }
      
      return [ ...prev, stock];
    });
  }



  // event listener: removes clicked stock card from selectedStocks array
  const handleUnselectStock = (stock: StockData) => {
    console.log("Clicked:", stock.symbol)
    setSelectedStocks((prev) => {

      const index = prev.findIndex((item) => stock.symbol === item.symbol );
      const temp = [...prev];
      
      temp.splice(index,1);
      
      return temp;
    });
  }



  return (
    // <websocketContext.Provider value={context}>
      <div>
        <div className="portfolio-container">
          <div>
            <SelectedStocks stocks={selectedStocks} handleClick={handleUnselectStock}/>
          </div>
          <div className="calculator-container">
            <DiversityCalculator stocks={selectedStocks} />
          </div>
        </div>
        <AllStocks stocks={stocks} selectedStocks={selectedStocks} handleClick={handleSelectStock}/>
      </div>
    // </websocketContext.Provider>
  );
}





