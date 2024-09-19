
import { TradeInfo } from "./definitions";

let unprocessedMessages: Array<any> = [];

let send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
export const setSend = (s: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) => {
  send = s;
}

export const subscribe = (stocks: string[]) => {
  stocks.forEach( ( symbol ) => {
    send(JSON.stringify({
      'type':'subscribe',
      'symbol':symbol
    }));
  });
}

export const startTick = (setTrades: (t: Array<TradeInfo>) => void) => {
  setInterval( () => {
    if(unprocessedMessages.length > 0){
      const symbols: Array<TradeInfo> = [];

      unprocessedMessages.forEach((item) => {
        if(symbols.findIndex((element) => element.s === item.s) < 0){
          symbols.push(item);
        }
      });

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


  try {
    const socket = new WebSocket(url);
    socketRef.current = socket;
    
    socketRef.current.onopen = () => {
      console.log("Socket opened");
      subscribe(symbols);
      startTick(setTrades);
      
    };
    socketRef.current.onclose = () => {
    console.log("Socket closed");
    };
    socketRef.current.onmessage = (event) => {
      messageRecieved(event);
      console.log("onmessage: ");
    };
  
    if(socketRef.current){
      send = socketRef.current.send.bind(socketRef.current);
    }
    return send;
      
  } catch (error) {
    console.log("WebSocket Error:", error);
  }
}
