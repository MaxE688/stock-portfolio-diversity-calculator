import { StockCardData } from "../../lib/definitions";
import DiversityScore from "./diversity-score";
import PortfolioAverage from "./portfolio-average";
import PortfolioValue from "./portfolio-value";

interface Props {
  stocks: Array<StockCardData>
}


export default function PortfolioData({ stocks }: Props ) {

  

  
  return (
    <>
      <div>
        <DiversityScore stocks={stocks} />
      </div>
      <div>
        <PortfolioValue stocks={stocks} />
      </div>
      <div>
        <PortfolioAverage stocks={stocks} />
      </div>
    </>
    
  );
}