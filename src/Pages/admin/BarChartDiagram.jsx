import React, { PureComponent, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiUtility } from "../../components/repo/api";

    // const data = [
    //   {
    //     name: 'Page A',
    //     uv: 4000,
    //     pv: 2400,
    //     amt: 2400,
    //   },
    //   {
    //     name: 'Page B',
    //     uv: 3000,
    //     pv: 1398,
    //     amt: 2210,
    //   },
    //   {
    //     name: 'Page C',
    //     uv: 2000,
    //     pv: 9800,
    //     amt: 2290,
    //   },
    //   {
    //     name: 'Page D',
    //     uv: 2780,
    //     pv: 3908,
    //     amt: 2000,
    //   },
    //   {
    //     name: 'Page E',
    //     uv: 1890,
    //     pv: 4800,
    //     amt: 2181,
    //   },
    //   {
    //     name: 'Page F',
    //     uv: 2390,
    //     pv: 3800,
    //     amt: 2500,
    //   },
    //   {
    //     name: 'Page G',
    //     uv: 3490,
    //     pv: 4300,
    //     amt: 2100,
    //   },
    // ];
    
const BarChartDiagram = () => {
  
const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await apiUtility.get("/util/getDashboardInfoForHealthCenter");
          // console.log('response', response);
          setData(response.data);
          // console.log('datas', data);
  
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchData();
    }, []);


  return (
    <div className="flex flex-col">
      <div className="items-center pb-0">
        <div className="text-gray-800 text-center font-bold text-xl">
          Distribution
        </div>
      </div>
      {/* {error && <div className="">{error}</div>} */}
      <div className="flex-1 pb-0">
        {/* <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={730}
            height={250}
            data={data && data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="Male" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4184e1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4184e1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Female" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fc7edd" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fc7edd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="male"
              stroke="#4184e1"
              fillOpacity={1}
              fill="url(#male)"
            />
            <Area
              type="monotone"
              dataKey="female"
              stroke="#fc7edd"
              fillOpacity={1}
              fill="url(#female)"
            />
          </AreaChart>
        </ResponsiveContainer> */}
        {/* <PureComponent> */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data && data}>
              <Bar dataKey="name" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        {/* </PureComponent> */}

      </div>
      <div className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground text-center text-gray-800">
          Male & Female Breakdown
        </div>
      </div>
    </div>
  );
};

export default BarChartDiagram;
