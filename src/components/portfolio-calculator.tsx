import { useEffect, useRef, useState } from "react";
import { StockData, TradeInfo, dow30, quoteData } from "../lib/definitions";
import useStocks from "../lib/use-stocks";
import AllStocks from "./all-stocks";
import SelectedStocks from "./selected-stocks";
import DiversityCalculator from "./diversity-calculator";
import { messageRecieved, openWebSocket, setSend, startTick, subscribe } from "../lib/ws-operations";
import SelectPool from "./select-pool";


// export const websocketContext = createContext(false, null, () => {});
// export const websocketContext = createContext();


export default function PortfolioCalculator(){

  // stocks array used to populate All Stocks section
  // selectedStocks array used to populate Selected Stocks section
  const [ stocks, setStocks ] = useState<Array<StockData>>([]);
  const [ selectedStocks, setSelectedStocks ] = useState<Array<StockData>>([]);
  const [ trades, setTrades ] = useState<Array<TradeInfo>>([])
  const [ stockPool, setStockPool ] = useState("DOW 30");

  const [ dow30Stocks, setDow30Stocks ] = useState<Array<StockData>>([]);
  const [ customStocks, setCustomStocks ] = useState<Array<StockData>>([]);

  //Websocket Context states
  const [ reconnect, setReconnect ] = useState(true);
  const [ value, setValue ] = useState(null);
  // const [ send, setSend ] = useState<(data: string | ArrayBufferLike | Blob | ArrayBufferView) => void>(()=>{});
  const socketRef = useRef<WebSocket | null>(null);
  const sendRef = useRef<(data: string | ArrayBufferLike | Blob | ArrayBufferView) => void | undefined>();

  // get initial stock data before websocket starts updating
  useEffect(() => {
    // const url = import.meta.env.BACKEND_URL;
    // fetch(url)
    // fetch("https://one-off-backends.onrender.com")
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((resData) => {
        console.log(JSON.parse(resData));
        const parsedData = JSON.parse(resData);
        const formattedStocks: StockData[] = parsedData.map((stock: {data: quoteData, symbol: string, sector: string}) => {
          return{
            price: stock.data.c,
            sector: stock.sector,
            symbol: stock.symbol
          };
        }); 

        setStocks(formattedStocks);
        setDow30Stocks(formattedStocks);
        return formattedStocks;
      })
      .then( (formatedStocks) => {
        // const socket = 
        const sendFunc = openWebSocket(
          `wss://ws.finnhub.io?token=${import.meta.env.VITE_API_TOKEN}`, 
          formatedStocks.map( s => s.symbol),
          // [],
          socketRef,
          setTrades 
        )
        sendRef.current = sendFunc;
        // setSend(sendFunc? sendFunc : ()=>{});
  
        // socket? socketRef.current = socket : socketRef.current = null;
        // if(socketRef.current != null)
        //   setSend(socketRef.current?.send.bind(socketRef.current));
  
        // return () => {
        //   if(socket?.readyState === socket?.OPEN) {
        //     console.log("Closing socket");
        //     setReconnect(false);
        //     socket?.close()
        //   }
        // };
      });

      return () => {
        if(socketRef.current?.readyState === socketRef.current?.OPEN) {
          console.log("Closing socket");
          // setReconnect(false);
          socketRef.current?.close();
        }
      };


  }, []);


  // update stocks array when new trade data comes in
  useEffect(() => {
    if( trades.length > 0 ){
      // TODO: change to filter new data by the list it belongs to
      
      trades.forEach(( trade ) => {
        //create datum to push to appropriete list(s)
        //if trade symbol belongs to dow30 add to dow30stocks
        //if trade symbol belongs to customlist add to custom list
        const stockDatum = {
          Symbol: trade.s, 
          sector:  ""
        }
        const dowTradeIndex = dow30Stocks.findIndex(element => element.symbol === trade.s);
        const customTradeIndex = customStocks.findIndex(element => element.symbol === trade.s);

        if( dowTradeIndex > 0){
          setStocksList(setDow30Stocks, dowTradeIndex, trade.p);
        }
        if( customTradeIndex > 0 ){
          setStocksList(setCustomStocks, customTradeIndex, trade.p);
          console.log("Updated price of custom entry: ", customStocks[customTradeIndex].symbol);
        }
      });

    }
  }, [trades]);


  const setStocksList = (set: (value:React.SetStateAction<StockData[]>) => void, index: number, newPrice: number) => {
    set(( prev ) => {
      const newStocks = [...prev];
      newStocks[index].price = newPrice;
      return newStocks;
    });
  }

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


  // event listener: changes the active list of stocks
  const handleStockPoolChange = (pool: string) => {
    setStockPool(pool);
    if(pool === "DOW 30"){
      setStocks(dow30Stocks)
    }
    else{
      setStocks(customStocks);
    }
  }


  // event listener: adds new stock to custom list
  const handleNewStock = (stock: StockData) => {
    // create stock obj and add obj to customlist 
    // subscribe to the symbol on websocket
    // prevent function from running if stock is already in custom list
    const newArr = customStocks;
    newArr.push(stock)
    setCustomStocks(newArr);
    const sendObj = {
      'type': 'subscribe',
      'symbol': stock.symbol
    }
    // let res = socketRef.current?.send(JSON.stringify(sendObj));
    if(sendRef.current){
      let res = sendRef.current(JSON.stringify(sendObj));
      console.log();
    }
    // subscribe([stock.symbol]);
  }

  return (
    // <websocketContext.Provider value={context}>
      <div>
        <SelectPool pool={stockPool} setPool={handleStockPoolChange} handleNewStock={handleNewStock}/>
        {/* <button onClick={() => subscribe(["GME"])}>Click me, bro</button> */}
        <div className="portfolio-container">
          <div>
            <SelectedStocks stocks={selectedStocks} handleClick={handleUnselectStock}/>
          </div>
          <div className="calculator-container">
            <DiversityCalculator stocks={selectedStocks} />
          </div>
        </div>
        <AllStocks 
          stocks={stocks} 
          selectedStocks={selectedStocks} 
          stockPool={stockPool}
          handleClick={handleSelectStock}/>
      </div>
    // </websocketContext.Provider>
  );
}





