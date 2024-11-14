
import { useEffect, useState } from "react";
import { StockData } from "../lib/definitions";
import Table from "./table-components/table";
import PageControls from "./table-components/page-controls";
import FilterBar from "./table-components/filter-bar";

interface Props {
  stocks: Array<StockData>,
  selectedStocks: Array<StockData>,
  stockPool: string,
  handleClick: (stock: StockData) => void
}

export default function AllStocks({ stocks, selectedStocks, stockPool, handleClick }: Props){
  
  const TOTAL_STOCKS_PER_PAGE = 8;
  const defaultPageCount = Math.ceil(stocks.length / TOTAL_STOCKS_PER_PAGE);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState<StockData[]>([]);
  const [filteredData, setFilteredData] = useState<StockData[]>([]);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(defaultPageCount);



  useEffect(() => {
    // setDataToDisplay(stocks.slice(0, TOTAL_STOCKS_PER_PAGE));
    updateDisplayData(stocks);
  }, []);

  useEffect(() => {
    if(filter === ""){
      setTotalPages(getTotalPages(stocks.length));
      updateDisplayData(stocks);
    }
    else{
      updateDisplayData(filteredData)
    }
  }, [currentPageNumber, stocks]);

  useEffect(() => {
    const newArr = stocks.filter((stock) => stock.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    setTotalPages(getTotalPages(newArr.length));
    setFilteredData(newArr)
    updateDisplayData(newArr);
  }, [filter]);



  const getTotalPages = (stockCount: number) => {
    return Math.ceil(stockCount / TOTAL_STOCKS_PER_PAGE);
  }

  const updateDisplayData = (data: StockData[]) => {
    let stocksPerPage = TOTAL_STOCKS_PER_PAGE;
    if(data.length < stocksPerPage){
      stocksPerPage = data.length ;
    }

    const start = (currentPageNumber-1) * stocksPerPage;
    const end = currentPageNumber * stocksPerPage;
    setDataToDisplay(data.slice(start, end));
  }
  

  const breakpoint = "here";

  return(
    <>
      <h3>{stockPool}</h3>
      <div className="page-controls-head">
        <FilterBar setFilter={setFilter} />
        <PageControls 
          setCurrentPageNumber={setCurrentPageNumber}
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
          />
      </div>
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

