import React, { useState } from "react";
import Table from "../../components/Table";
import AddNewRefferal from "./AddNewRefferal";

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

const Referrals = () => {
  const [addNewRefferalModal, setAddNewRefferalModal] = useState(false);

  const closeModal = () => {
    setAddNewRefferalModal(false);
  };
  return (
    <>
      <div className="mx-10 flex justify-between items-center">
        <h1 className="m-5 text-5xl font-semibold text-gray-800">Referrals</h1>
        <div>
          <button
            onClick={() => setAddNewRefferalModal(true)}
            className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-sm p-5 h-8 ms-auto inline-flex justify-center items-center"
          >
            Create New Refferal
          </button>
        </div>
      </div>
      <Table data={data} />
      {addNewRefferalModal && (
        <AddNewRefferal onClose={closeModal} isOpen={addNewRefferalModal} />
      )}
    </>
  );
};

export default Referrals;
