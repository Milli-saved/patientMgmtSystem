import React from "react";

const CountsLabel = ({ cx, cy, total }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan
      x={cx}
      y={cy}
      className="fill-foreground text-3xl font-bold text-gray-700"
    >
      {total.toLocaleString()}
    </tspan>
    <tspan x={cx} y={cy + 24} className="fill-muted-foreground text-gray-700">
      Members
    </tspan>
  </text>
);

export default CountsLabel;
