import React, { useState } from "react";
import { Toaster } from "sonner";
import Table from "../../components/Table";
import AssignPatientToDocModal from "./AssignPatientToDocModal";

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

const AssignPatientToDoctor = () => {
  const [assignPatientModal, setAssignPatientModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState({});

  const detailsClicked = (patientDetail) => {
    setAssignPatientModal(true);
    setSelectedPatient(patientDetail);
  };

  const closeAssignModal = () => {
    setAssignPatientModal(false);
    setSelectedPatient({});
  };

  return (
    <>
      <div className="mx-10">
        <Toaster position="top-right" richcolors />
        <div className="flex justify-center items-center">
          <h1 className="m-5 text-5xl font-semibold text-gray-800">
            Assign Patient To Doctors
          </h1>
          {/* <button
            // onClick={() => setCreateNewPatientModal(true)}
            className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-lg p-5 h-8 ms-auto inline-flex justify-center items-center"
          >
            Create New patient Record
          </button> */}
        </div>
        <div>
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            Patient List
          </h1>
          <Table data={data} onEditClicked={detailsClicked} />
        </div>
      </div>
      {assignPatientModal && (
        <AssignPatientToDocModal
          onClose={closeAssignModal}
          selectedPatient={selectedPatient}
        />
      )}
    </>
  );
};

export default AssignPatientToDoctor;
