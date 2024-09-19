// type for data revieved from websocket
export type TradeInfo = {
  
  c: any[],
  p: number,
  s: string,
  t: number,
  v: number
  
}

// type for data of stock cards
export interface StockData {
  symbol: string,
  sector: string,
  price: number
}

// type for data returned by quote call
export type quoteData = {
  "c": number,
  "h": number,
  "l": number,
  "o": number,
  "pc": number,
  "t": number 
}

// Map of DOW 30 companies with their respective sectors
// export const dow30: Map<string, string> = new Map([
//   [ "MMM", "Industrials" ],
//   [ "AXP", "Financials" ],
//   [ "AMGN", "Health Care" ],
//   [ "AAPL", "Information Technology"],
//   [ "BA", "Industrials"],
//   [ "CAT", "Industrials"],
//   [ "CVX", "Energy"],
//   [ "CSCO", "Information Technology"],
//   [ "KO", "Consumer Staples"],
//   [ "DOW", "Materials"],
//   [ "GS", "Financials"],
//   [ "HD", "Consumer Discretionary"],
//   [ "HON", "Industrials"],
//   [ "IBM", "Information Technology"],
//   [ "INTC", "Information Technology"],
//   [ "JNJ", "Health Care"],
//   [ "JPM", "Financials"],
//   [ "MCD", "Consumer Discretionary"],
//   [ "MRK", "Health Care"],
//   [ "MSFT", "Information Technology"],
//   [ "NKE", "Consumer Discretionary"],
//   [ "PG", "Consumer Staples"],
//   [ "CRM", "Information Technology"],
//   [ "TRV", "Financials"],
//   [ "UNH", "Health Care"],
//   [ "VZ", "Communication Services"],
//   [ "V", "Financials"],
//   [ "WBA", "Consumer Staples"],
//   [ "WMT", "Consumer Staples"],
//   [ "DIS", "Communication Services"]
// ]);

