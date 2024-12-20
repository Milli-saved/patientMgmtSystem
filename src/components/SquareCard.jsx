import React from "react";

const SquareCard = ({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div className="flex flex-row items-center justify-evenly bg-white hover:border-blue-400 shadow-md rounded-md p-4 border-2 border-gray-200 ">
      <div className="text-gray-500 text-5xl ">
        <Icon className="text-5xl" />
      </div>
      <div>
        <p className="text-3xl font-semibold text-gray-700"> {value}</p>
        <h1 className="text-lg font-bold mt-2 text-gray-700">{label}</h1>
        {/* <button className="rounded-lg p-2 text-green-800">Details </button> */}
      </div>
    </div>
  );
};

export default SquareCard;
