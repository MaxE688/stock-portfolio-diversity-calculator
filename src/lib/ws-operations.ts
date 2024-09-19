import { useEffect, useRef } from "react";
import { dow30, TradeInfo } from "./definitions";

let unprocessedMessages: Array<any> = [];
// let processedMessages: Array<any> = [];


// let socket: WebSocket;
let send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
export const setSend = (s: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) => {
  send = s;
}



export const subscribe = (stocks: string[]) => {
// export const subscribe = (stocks: string[], socket: WebSocket) => {
  // while(socket.readyState === socket.CONNECTING){}
  stocks.forEach( ( symbol ) => {
    
    const res = send(JSON.stringify({
    // socket.send(JSON.stringify({
      'type':'subscribe',
      'symbol':symbol
    }));

    console.log(res);
  });
}

export const startTick = (setTrades: (t: Array<TradeInfo>) => void) => {
  setInterval( () => {
    if(unprocessedMessages.length > 0){
      const symbols: Array<TradeInfo> = [];

      unprocessedMessages.forEach((item) => {
        if(symbols.findIndex((element) => element.s === item.s) < 0){
          // if(item.s === "GME") console.log("********************************\nGME FOUND!!!\n*********************************")
          symbols.push(item);
        }
      });

      // processedMessages = symbols;
      setTrades(symbols);
      unprocessedMessages = []; 
    }
  }, 1000);
}

export const messageRecieved = (event: MessageEvent) => {
  try {
    let parsed = JSON.parse(event.data);

    switch(event.type){
      case 'message':
        parsed.data.forEach((d: TradeInfo) => {
          unprocessedMessages.push(d);
        });
        break;
    }

  } catch (error) {
    console.log("Handle Message Error:", error);
  }
}

export function openWebSocket ( 
  url: string, 
  symbols: Array<string>,
  socketRef: React.MutableRefObject<WebSocket | null>, 
  setTrades: (a: Array<TradeInfo>)=>void 
){
  // const socketRef = useRef<WebSocket | null>(null);


  try {
    //const socket = openWebSocket(url, dow30.keys, )
    const socket = new WebSocket(url);
    socketRef.current = socket;
    
    
    //this is where the listeners are configured, add custom functions to get expected behavior
    socketRef.current.onopen = () => {
      console.log("Socket opened");
      // setIsReady(true);
      let abc = socketRef;
      subscribe(symbols);
      startTick(setTrades);
      
    };
    socketRef.current.onclose = () => {
    // setIsReady(false);
    console.log("Socket closed");
    };
    socketRef.current.onmessage = (event) => {
      // setValue(event.data);
      messageRecieved(event);
      console.log("onmessage: ");
    };
    
  
  
    if(socketRef.current){
      send = socketRef.current.send.bind(socketRef.current);
    }
    return send;
    // return socket;
  
  // socketRef.current = socket;
  // 
  
  
    // return () => {
    //   if(socketRef.current?.readyState === socket.OPEN) {
    //     console.log("Closing socket");
    //     // setReconnect(false);
    //     socketRef.current.close();
    //   }
    // };
      
  } catch (error) {
    console.log("WebSocket Error:", error);
  }
  
}
