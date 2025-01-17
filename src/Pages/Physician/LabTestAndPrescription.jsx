import React, { useState } from "react";
import Table from "../../components/Table";
import AddNewLabTestModal from "./AddNewLabTestModal";

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
  const [createNewLabTestReq, setCreateNewLabTestReq] = useState(false);

  const closeNewLabReqModal = () => {
    setCreateNewLabTestReq(false);
  };
  return (
    <>
      <div className="mx-10 flex items-center justify-between">
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Lab Test And Prescriptions
        </h1>
        <div>
          <button
            onClick={() => setCreateNewLabTestReq(true)}
            className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-sm p-5 h-8 ms-auto inline-flex justify-center items-center"
          >
            Create New Lab Test Request
          </button>
        </div>
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
            <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">
              List of Patients
            </h1>
            <Table data={data} />
          </div>
        ) : (
          <div>
            <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">
              Prescription List
            </h1>
            <Table data={data} />
          </div>
        )}
      </div>
      {createNewLabTestReq && (
        <AddNewLabTestModal
          isOpen={createNewLabTestReq}
          onClose={closeNewLabReqModal}
        />
      )}
    </>
  );
};

export default LabTestAndPrescription;
