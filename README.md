# Stock Portfolio Diversity Calculator

A React.js webapp that connects to a websocket from finnhub's API to display real-time stock data. Users may select any combination of stocks from the DOW 30 to calculate the diversity score of thier selected stocks using the formula: 
( 1 - $$\sum_{n=1}^{11} (w^2)$$ ) * 100  

## Diversity Score

The diversity score is calculated using the weight of each sector in the selected stocks list. The range from 1-11 is to account for the 11 different sectors. The weight of a sector is the percentage of the total value of the sector compared to the total value of the Selected stocks.


