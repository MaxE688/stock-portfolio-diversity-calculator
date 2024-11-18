import { StockCardData } from "../../lib/definitions";
import DiversityScore from "./diversity-score";
import PortfolioValue from "./portfolio-value";

interface Props {
  stocks: Array<StockCardData>
}


export default function PortfolioData({ stocks }: Props ) {

  

  
  return (
    <>
      <DiversityScore stocks={stocks} />
      <PortfolioValue stocks={stocks} />
    </>
    
  );
}