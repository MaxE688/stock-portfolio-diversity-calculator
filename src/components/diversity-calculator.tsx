import getScore from "../lib/calculator";
import { StockData } from "../lib/definitions";

interface Props {
  stocks: Array<StockData>
}


export default function DiversityCalculator({ stocks }: Props ) {

  const diversityScore = getScore(stocks);
  
  return (
    <>
      <h3>Diversity Score</h3>
      <div className="score-container container">
        <div className="score-card">
          {
            Number.isNaN(diversityScore)?
              <h1 className="score">0</h1>
              :
              <h1 className="score">{diversityScore}</h1>
          }
        </div>
      </div>
    </>
    
  );
}