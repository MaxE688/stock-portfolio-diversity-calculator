import { StockCardData, StockData } from "./definitions";

// used to store value of each industry from selected stocks
// const sectors: {name: string, value: number}[] = [ 
//   {
//     name: "Industrials",
//     value: 0.0
//   },
//   {
//     name: "Financials",
//     value: 0.0
//   },
//   {
//     name: "Health Care",
//     value: 0.0
//   },
//   {
//     name: "Information Technology",
//     value: 0.0
//   },
//   {
//     name: "Energy", 
//     value: 0.0                
//   },
//   {
//     name: "Consumer Staples",  
//     value: 0.0      
//   },
//   {
//     name: "Materials", 
//     value: 0.0              
//   },
//   {
//     name: "Consumer Discretionary", 
//     value: 0.0 
//   },
//   {
//     name: "Communication Services", 
//     value: 0.0 
//   },
//   {
//     name: "Utilities", 
//     value: 0.0              
//   },
//   {
//     name: "Real Estate",
//     value: 0.0
//   }
// ];


export default function getScore(stocks: StockCardData[]){

  const sectors: {name: string, value: number}[] = getSectors(stocks);

  // reset sector values
  sectors.forEach( sector => sector.value = 0.0);


  


  // get weight of each sector, the sum of those weights, and the score according to the score formula
  const weights = calculateWeights(stocks, sectors);
  const sum = calculateSum(weights);
  const score = Math.round((1 - sum) * 100);
  
  return score;
}


const getSectors = (stocks: StockCardData[]) => {
  const sectors: {name: string, value: number}[] = [];
  
  stocks.forEach( (stock: StockCardData) => {
    const sectorIndex = sectors.findIndex( sector => sector.name === stock.sector);

    if( sectorIndex < 0){
      sectors.push({name: stock.sector, value: 0.0});
    }
  });

  return sectors;
}


// returns array of weights for each sector
const calculateWeights = (stocks: StockCardData[], sectors: {name: string, value: number}[]) => {

  // total portfolio value
  // value of each sector
  // w = value of sector / total portfolio value
  const weights: number[] = [];

  //get total value
  const totalValue = getTotalValue(stocks);
  calculateSectorValue(stocks, sectors);

  sectors.forEach((sector: {name: string, value: number}) => {
    weights.push(sector.value / totalValue);
  });

  return weights;
} 
  
// returns total value of all selected stocks
const getTotalValue = (stocks: StockCardData[]) => {
  let sum = 0;
  stocks.forEach((stock) => {
    const total = stock.price * stock.quantity;
    sum += total;
  });

  return sum;
};

// calculates the price of each sector in selected stocks
const calculateSectorValue = (stocks: StockCardData[], sectors: {name: string, value: number}[]) => {
  stocks.forEach((stock) => {
    const index = sectors.findIndex((sector) => sector.name === stock.sector)
    sectors[index].value += (stock.price * stock.quantity);
  });
}


// returns the sum of all weights squared
const calculateSum = (weights: number[]) => {
  let sum = 0;
  weights.forEach((w) => {
    sum += (w**2);
  });
  return sum;
}