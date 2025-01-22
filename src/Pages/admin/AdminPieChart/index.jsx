import React from "react";
import PieDiagram from "./PieDiagram";
import StatusLegend from "./StatusLegend";
import processStatus from "./ProcessStatus";

const index = ({data}) => {
  console.log('data', data);
  
  let patient = 0;
  let total_health_center = 0;
  let total_user = 0;
  let active_patient = 0;
  let in_active_patient = 10;
  if(data){
    patient = data.total_patient,
    total_user = data.total_user,
    active_patient = data.active_patient,
    total_health_center = data.total_health_center,
    in_active_patient = data.in_active_patient;
  }

  const chartDataFilled = [
    { name: "Total Patients", counts: patient},
    { name: "Total Health Center", counts: total_health_center },
    { name: "Total User", counts: total_user },
    { name: "Active Patient", counts: active_patient },
    { name: "In Active Patient", counts: in_active_patient },
  ];

  // const total = chartDataFilled.reduce((acc, curr) => acc + curr.counts, 0);
  const total = chartDataFilled.reduce((sum, item) => {
    return sum + (item.counts || 0);
}, 0)

  const chartDataProcessed = Array.isArray(chartDataFilled)
    ? processStatus(chartDataFilled)
    : [];
  // console.log('chartDataProcessed', chartDataProcessed,total);
  
  return (
    <div className="flex flex-col shadow-lg shadow-gray-200">
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
