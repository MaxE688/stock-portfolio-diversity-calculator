import { useCallback, useEffect, useState } from "react";
import { TradeInfo, dow30 } from "./definitions";


let unprocessedMessages: Array<any> = [];

export default function useStocks(url: string){

  const [ socket, setSocket ] = useState<undefined | WebSocket>();
  const [ trades, setTrades ] = useState<Array<TradeInfo>>([])
  


  // Handles messages to/from websocket 
  const handleMessage = useCallback(() => {

    
    if(socket){
      // Request data when the socket is open
      socket.onopen = () => {
        console.log("socket opened")

        dow30.forEach( ( _sector, symbol ) => {
          socket.send(JSON.stringify({
            'type':'subscribe',
            'symbol':symbol
          }));
        });

        startTick()
      }


      
      // message from websocket are processed here
      socket.onmessage = (message) => {
        try {
          let parsed = JSON.parse(message.data);

          switch(message.type){
            case "message":
              
              parsed.data.forEach(( d: TradeInfo ) => {
                unprocessedMessages.push(d)
              })

              break;
          }

        } catch (error) {
          console.log("Handle Message Error:", error);
        }
      }
    }
  }, [socket]);


  // sets interval to process data recieved from websocket
  const startTick = useCallback(() => {
    setInterval(() => {

      if(unprocessedMessages.length !== 0){

        const symbols: Array<TradeInfo> = [];

        unprocessedMessages.forEach(( item ) => {

          if( symbols.findIndex((element) => element.s === item.s) < 0 ){
            symbols.push(item)//add to list
          }
          
        });
        
        setTrades(symbols);

        // clear array after all messages have been processed
        unprocessedMessages = [];
        console.log("Values Updated")

      }
    }, 1000);
  } ,[socket]);



  // Establish websocket connection
  useEffect(() => {
    if(url.length !== 0){
      try {
        
        setSocket(new WebSocket(url))

      } catch (error) {
        console.log("WebSocket Error:",error)
      }
    }
  }, [url]);



  // Begin listening to websocket
  useEffect(() => {
    if(socket){
      handleMessage();
      console.log("handle message");
    }
  }, [socket]);



  return trades;
}

