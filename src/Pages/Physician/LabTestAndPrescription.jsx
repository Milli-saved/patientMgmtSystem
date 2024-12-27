import React, { useState } from "react";
import Table from "../../components/Table";

const data = [
  {
    name: "Cherry Delight",
    id: "#KP267400",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Super Admin",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Kiwi",
    id: "#TL681535",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Admin",
    status: "Active",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Mango Magic",
    id: "#GB651535",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Super Admin",
    status: "Inactive",
    color: "bg-red-100 text-red-700",
  },
];

const LabTestAndPrescription = () => {
  const [activeTab, setActiveTab] = useState("0");
  return (
    <>
      <div>
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Lab Test And Prescriptions
        </h1>
      </div>
      <div className="flex items-center">
        <h1
          className="m-5 text-2xl font-semibold text-gray-800 cursor-pointer p-5 bg-blue-200 rounded-lg "
          onClick={() => setActiveTab(0)}
        >
          Lab Test
        </h1>
        <h1
          className="m-5 text-2xl font-semibold text-gray-800 cursor-pointer p-5 bg-blue-200 rounded-lg "
          onClick={() => setActiveTab(1)}
        >
          Prescriptions
        </h1>
      </div>
      <div>
        {activeTab == 0 ? (
          <div>
            <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">List of Patients</h1>
            <Table data={data} />
          </div>
        ) : (
          <div>
            <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">Prescription List</h1>
            <Table data={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default LabTestAndPrescription;
