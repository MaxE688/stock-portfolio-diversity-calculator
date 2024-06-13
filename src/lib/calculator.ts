import { StockData } from "./definitions";

// used to store value of each industry from selected stocks
const sectors: {name: string, value: number}[] = [ 
  {
    name: "Industrials",
    value: 0.0
  },
  {
    name: "Financials",
    value: 0.0
  },
  {
    name: "Health Care",
    value: 0.0
  },
  {
    name: "Information Technology",
    value: 0.0
  },
  {
    name: "Energy", 
    value: 0.0                
  },
  {
    name: "Consumer Staples",  
    value: 0.0      
  },
  {
    name: "Materials", 
    value: 0.0              
  },
  {
    name: "Consumer Discretionary", 
    value: 0.0 
  },
  {
    name: "Communication Services", 
    value: 0.0 
  },
  {
    name: "Utilities", 
    value: 0.0              
  },
  {
    name: "Real Estate",
    value: 0.0
  }
];


export default function getScore(stocks: StockData[]){

  // reset sector values
  sectors.forEach( sector => sector.value = 0.0);


  // get weight of each sector, the sum of those weights, and the score according to the score formula
  const weights = calculateWeights(stocks, sectors);
  const sum = calculateSum(weights);
  const score = Math.round((1 - sum) * 100);
  
  return score;
}


// returns array of weights for each sector
const calculateWeights = (stocks: StockData[], sectors: {name: string, value: number}[]) => {

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
const getTotalValue = (stocks: StockData[]) => {
  let sum = 0;
  stocks.forEach((stock) => {
    sum += stock.price;
  });

  return sum;
};

// calculates the price of each sector in selected stocks
const calculateSectorValue = (stocks: StockData[], sectors: {name: string, value: number}[]) => {
  stocks.forEach((stock) => {
    const index = sectors.findIndex((sector) => sector.name === stock.sector)
    sectors[index].value += stock.price;
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