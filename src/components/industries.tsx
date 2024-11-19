import { useEffect, useRef, useState } from "react";
import { getSectors } from "../lib/calculator";
import { StockCardData } from "../lib/definitions";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  stocks: Array<StockCardData>
}

export default function Industries({ stocks }:Props){

  const s = getSectors(stocks);
  const [ sectors, setSectors ] = useState(s);
  const [ width, setWidth] = useState(480);
  // const [ height, setHeight ] = useState(180)
  const height = 260;

  useEffect(() => {
    setSectors(getSectors(stocks));
  }, [stocks]);

  useEffect(() => {
    setWidth(sectors.length * 160);
  }, [sectors]);

  


  return (
    <>
      <div className='industry-container'>
      <h3>Industries</h3>
        {/* <div>
          <BarChart width={width} height={height} data={sectors}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend /> 
            <Bar dataKey="value" fill="#8884d8" />
            <Bar dataKey="weight" fill="#82ca9d" />
          </BarChart>
        </div> */}
        <div>
          <BarChart width={width} height={height} data={sectors}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <Legend /> 
            <Bar dataKey="value" fill="#8884d8" />
            {/* <Bar dataKey="weight" fill="#82ca9d" /> */}
          </BarChart>
        </div>
        
        
        {/* {
          sectors.map((sect, i) => (
            <div key={i} className="industry-card">
              <p className="symbol">{sect.name}</p>
              <p className={` price`}>${Number(sect.value).toFixed(2)}</p>
              <p className="sector">{Number(sect.weight * 100).toFixed(2) + '%'}</p>
            </div>
          ))
        } */}
      </div>
    </>
  );
}