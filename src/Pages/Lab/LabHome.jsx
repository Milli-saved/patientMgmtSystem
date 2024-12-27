import React from "react";
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

const LabHome = () => {
  return (
    <>
      <div>
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Lab Test And Prescriptions
        </h1>
      </div>
      <div>
        {/* <h1>List of patients</h1> */}
        <Table data={data} />
      </div>
    </>
  );
};

export default LabHome;
