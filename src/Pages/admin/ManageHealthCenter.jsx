import React, { useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import AddNewHealthCenter from "./AddNewHealthCenter";

const ManageHealthCenter = () => {
  const [addNewCenter, setAddNewCenter] = useState(false);
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
  const handleAddNewHealthCenter = () => {
    setAddNewCenter(false);
  };
  return (
    <>
      <div className="mx-20">
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Manage Health Center
        </h1>
        <div className="flex justify-between items-center mt-16">
          <div className="flex">
            <input
              placeholder="Search"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <button className="py-2 bg-blue-900 rounded-r-xl text-white px-5">
              Search
            </button>
          </div>
          <div>
            <button
              onClick={() => setAddNewCenter(true)}
              className="px-5 py-3 text-white bg-blue-900 mx-5 rounded-xl"
            >
              <span className="flex items-center justify-evenly">
                <FaPlus className="mr-2" />
                New
              </span>
            </button>
            <button className="px-5 py-3 text-white bg-blue-400 mx-5 rounded-xl">
              <span className="flex items-center justify-evenly">
                <FaDownload className="mr-2" />
                Export
              </span>
            </button>
          </div>
        </div>
        <div className="mt-10">
          <Table data={data} />
        </div>
      </div>
      {addNewCenter && (
        <AddNewHealthCenter
          handleAddNewHealthCenter={handleAddNewHealthCenter}
        />
      )}
    </>
  );
};

export default ManageHealthCenter;
