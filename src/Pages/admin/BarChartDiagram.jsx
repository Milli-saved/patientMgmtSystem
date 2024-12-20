import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "Kolfe Keranio",
    male: 170,
    female: 158,
  },
  {
    name: "Akaki Kality",
    male: 100,
    female: 110,
  },
  {
    name: "NefasSilk Lafto",
    male: 180,
    female: 142,
  },
  {
    name: "Arada",
    male: 58,
    female: 70,
  },
  {
    name: "Kirkos",
    male: 130,
    female: 160,
  },
];

const BarChartDiagram = () => {
  return (
    <div className="flex flex-col">
      <div className="items-center pb-0">
        <div className="text-gray-800 text-center font-bold text-xl">
          Distribution
        </div>
      </div>
      <div className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="male" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4184e1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4184e1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="female" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fc7edd" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fc7edd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
        </ResponsiveContainer>
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
