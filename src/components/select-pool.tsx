import { useState } from "react";
import useDebouncedCallback from "../lib/useDebounceCallback";
import { StockData } from "../lib/definitions";

interface Props {
  pool: string,
  setPool: (s: string) => void,
  handleNewStock: (s: StockData) => void
}

export default function SelectPool({ pool, setPool, handleNewStock }: Props) {

  const [ suggestionData, setSuggestionData ] = useState<Array<any>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPool(e.target.value);
  }

  const handleQuery = useDebouncedCallback( async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = `http://localhost:3000/suggestions?` + new URLSearchParams({stock: String(e.target.value)}).toString();
    const fetched = await fetch(q);
    const responseData = await fetched.json();
    setSuggestionData(JSON.parse(responseData));

  }, 500);

  const getStockData = async (data: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const q = `http://localhost:3000/query?` + new URLSearchParams({stock: data}).toString();
    const fetched = await fetch(q);
    const responseData = await fetched.json();
    const stockData = JSON.parse(responseData);

    handleNewStock(stockData);

    setSuggestionData([]);
  }

  return(
    <div className="select-pool-container">
      {/* <form action="https://one-off-backends.onrender.com" method="post"> */}
        <select onChange={handleChange}>
          <option value="DOW 30">DOW 30</option>
          <option value="Custom List">Custom</option>
        </select>
        <div className={(pool === "DOW 30"? "hidden" : "block")}>
          <input placeholder="Search Symbol" onChange={handleQuery}></input>
          <div className="query-suggestions">
            {
              suggestionData.length > 0?
                suggestionData.map( d => (
                  <div onClick={(e) => getStockData(d, e)}>
                    <p>{d}</p>
                  </div>
                ))
              :
              ""
            }
          </div>
        </div>
      {/* </form> */}
    </div>
  );
}