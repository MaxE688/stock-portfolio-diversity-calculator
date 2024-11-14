
import { useEffect, useState } from "react";
import { StockData } from "../lib/definitions";
import Table from "./table";

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
  

  const handlePageChange = (direction: 'left' | 'right') => {

    let newPage = currentPageNumber;
    if(direction === 'left' && currentPageNumber > 1){
      newPage--;
    }
    else if(direction === 'right' && currentPageNumber < totalPages){
      newPage++;
    }

    setCurrentPageNumber(newPage);
  }


  const breakpoint = "here";

  return(
    <>
      <h3>{stockPool}</h3>
      <Table 
        stocks={dataToDisplay}
        selectedStocks={selectedStocks}
        stockPool={stockPool}
        handleClick={handleClick}
      />
      <div className='page-controls'>
        <PageArrow 
          handleClick={handlePageChange}
          direction="left"
          isDisabled={currentPageNumber <= 1? true : false}
        />
        <PageNumber 
          currentPage={currentPageNumber}
          totalPages={totalPages}
        />
        <PageArrow 
          handleClick={handlePageChange}
          direction="right"
          isDisabled={currentPageNumber >= totalPages? true : false}
        />
      </div>
    </>
  );
}



interface PageArrowProps {
  handleClick: (d: 'left' |'right') => void,
  direction: 'left' | 'right',
  isDisabled: boolean
}

function PageArrow({handleClick, direction, isDisabled}: PageArrowProps){

  const icon = direction === 'left'? '<-' : '->';

  return (
    <button className={`arrow-${direction} ` + (isDisabled? `disabled-arrow`: ` `)} onClick={() => handleClick(direction)} >
      {icon}
    </button>
  );

}

interface PageNumberProps {
  currentPage: number,
  totalPages: number
}

function PageNumber({ currentPage, totalPages }: PageNumberProps){

  return(
    <p>
      {currentPage + " / " + totalPages}
    </p>
  );
}