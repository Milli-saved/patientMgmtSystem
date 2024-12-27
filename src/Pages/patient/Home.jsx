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

const Home = () => {
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full mx-10 border">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">
              Welcome Ermiyas
            </h1>
            <button
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mt-4">
            Manage Your appointments and medical history easily and securely.
          </p>
        </div>
      </div>
      <h1 className="m-5 text-5xl font-semibold text-gray-800">
        Appointment Information
      </h1>
      <div className="mt-10">
        <Table data={data} />
      </div>
    </>
  );
};

export default Home;
