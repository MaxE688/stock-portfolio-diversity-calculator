import { dow30, TradeInfo } from "./definitions";

let unprocessedMessages: Array<any> = [];
// let processedMessages: Array<any> = [];



export const subscribe = (stocks: string[], send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) => {
// export const subscribe = (stocks: string[], socket: WebSocket) => {
  // while(socket.readyState === socket.CONNECTING){}
  stocks.forEach( ( symbol ) => {
    
    send(JSON.stringify({
    // socket.send(JSON.stringify({
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