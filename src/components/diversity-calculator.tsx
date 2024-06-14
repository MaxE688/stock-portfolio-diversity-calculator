import clsx from "clsx";
import getScore from "../lib/calculator";
import { StockData } from "../lib/definitions";
import RollingNumbers from "./rolling-numbers";

interface Props {
  stocks: Array<StockData>
}


export default function DiversityCalculator({ stocks }: Props ) {

  const diversityScore = getScore(stocks);

 const diversityColor = clsx(
  {"low-score": diversityScore < 25},
  {"medium-score": diversityScore >= 25 && diversityScore <= 75},
  {"high-score": diversityScore > 75},
);

  
  return (
    <>
      <h3>Diversity Score</h3>
      <div className="score-container container">
        <div className={`score-card ${diversityColor}`}>
          {/* {
            Number.isNaN(diversityScore)?
              <h1 className="score">0</h1>
              :
              <h1 className="score">{diversityScore}</h1>
          } */}
          <RollingNumbers number={ diversityScore }/>
        </div>
      </div>
    </>
    
  );
}