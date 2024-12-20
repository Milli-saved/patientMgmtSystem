import React from "react";
import PieDiagram from "./PieDiagram";
import StatusLegend from "./StatusLegend";
import processStatus from "./ProcessStatus";

const index = () => {
  const chartDataFilled = [
    { name: "Patients", counts: 2400 },
    { name: "Doctors", counts: 250 },
    { name: "Admins", counts: 100 },
    { name: "Other Staff", counts: 80 },
  ];

  const total = chartDataFilled.reduce((acc, curr) => acc + curr.counts, 0);

  const chartDataProcessed = Array.isArray(chartDataFilled)
    ? processStatus(chartDataFilled)
    : [];

  return (
    <div className="flex flex-col shadow-lg shadow-gray-400">
      <div className="items-center pb-0">
        <div className="text-2xl text-gray-800 text-center font-bold">
          Total
        </div>
        <div className="text-gray-700 text-center ">Total Personal of PMIS</div>
      </div>
      <div className="flex-1 pb-0">
        <PieDiagram data={chartDataProcessed} total={total} />
      </div>
      <div className="flex justify-center items-center">
        <StatusLegend chartData={chartDataProcessed} />
      </div>
      <div className=" m-3 leading-none text-center text-muted-foreground text-gray-700">
        Organization Breakdown
      </div>
    </div>
  );
};

export default index;
