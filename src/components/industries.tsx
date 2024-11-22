import { useEffect, useRef, useState } from "react";
import { getSectors } from "../lib/calculator";
import { StockCardData } from "../lib/definitions";
import { Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  stocks: Array<StockCardData>
}

interface RenderProps {
  cx:number,
  cy:number,
  midAngle: number,
  innerRadius: number,
  outerRadius: number,
  percent: number,
  index: number
}

export default function Industries({ stocks }:Props){

  const s = getSectors(stocks);
  const [ sectors, setSectors ] = useState(s);
  const [ barGraphWidth, setBarGraphWidth] = useState(500);
  // const [ height, setHeight ] = useState(180)
  const height = 400;
  const width = 500;

  useEffect(() => {
    const sectors = getSectors(stocks)
    setSectors(sectors);
    if(sectors.length > 3){
      const barWidth = 135;
      let w = 0;
      for(let _ in sectors){
        w += barWidth;
      }
      setBarGraphWidth(w);
    }
    else{
      setBarGraphWidth(width);
    }
  }, [stocks]);


  const COLORS = ['#45322E', '#A5A5A5', '#CAC4B0', '#343B29', '#A65E2E', '#424632', '#C2B078', '#CB2821', '#317F43', '#5B3A29'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: RenderProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  


  return (
    <>
      <div className='industry-container'>
      <h2 id='pie-chart-title'>Sectors</h2>
        <div className="chart-container">
          <PieChart width={width} height={height}>
            <Pie
              data={sectors}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {sectors.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend align="center" />
          </PieChart>
        </div>
        <div className="bar-graph">
          <BarChart width={barGraphWidth} height={height} data={sectors}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey="name"  />
            <YAxis />
            <Legend /> 
            <Bar dataKey="value" fill="#8884d8" barSize={60}/>
          </BarChart>
        </div>
      </div>
    </>
  );
}