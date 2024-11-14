
import { useEffect, useState } from "react";
import { StockData } from "../lib/definitions";
import Table from "./table";
import PageControls from "./page-controls";

interface Props {
  stocks: Array<StockData>,
  selectedStocks: Array<StockData>,
  stockPool: string,
  handleClick: (stock: StockData) => void
}

export default function AllStocks({ stocks, selectedStocks, stockPool, handleClick }: Props){

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState<StockData[]>([]);

  const TOTAL_STOCKS_PER_PAGE = 10;
  const totalPages = Math.ceil(stocks.length / TOTAL_STOCKS_PER_PAGE);

  useEffect(() => {

    setDataToDisplay(stocks?.slice(0, TOTAL_STOCKS_PER_PAGE));

  }, []);

  useEffect(() => {

    let stocksPerPage = TOTAL_STOCKS_PER_PAGE;
    if(stocks.length < stocksPerPage){
      stocksPerPage = stocks.length ;
    }

    const start = (currentPageNumber-1) * stocksPerPage;
    const end = currentPageNumber * stocksPerPage;
    setDataToDisplay(stocks.slice(start, end));

  }, [currentPageNumber, stocks]);
  

  const breakpoint = "here";

  return(
    <>
      <h3>{stockPool}</h3>
      <PageControls 
        setCurrentPageNumber={setCurrentPageNumber}
        currentPageNumber={currentPageNumber}
        totalPages={totalPages}
      />
      <Table 
        stocks={dataToDisplay}
        selectedStocks={selectedStocks}
        stockPool={stockPool}
        handleClick={handleClick}
      />
      <PageControls 
        setCurrentPageNumber={setCurrentPageNumber}
        currentPageNumber={currentPageNumber}
        totalPages={totalPages}
      />
    </>
  );
}

