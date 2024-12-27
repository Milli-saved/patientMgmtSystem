import React from "react";

const PhysicianHome = () => {
  return (
    <>
      <div className="flex justify-end mx-20 my-10">
        <div className="flex flex-col items-end max-w-xl">
          <label
            htmlFor="userId"
            className="block mb-2 text-lg font-medium text-blue-700"
          >
            Select Patient
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
            <option>Patient one</option>
            <option>Patient Two</option>
            <option>Patient Three</option>
          </select>
        </div>
      </div>
      <div>
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Medical Information
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col items-start mt-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-lg font-medium text-blue-700"
            >
              Blood Group
            </label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </select>
          </div>
          <div className="flex flex-col items-start mt-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-lg text-blue-700 font-medium"
            >
              Current Medications
            </label>
            <input
              id="healtcenterName"
              name="healtcenterName"
              type="text"
              autoComplete="Current Password"
              placeholder="Health Center Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col items-start mt-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-lg text-blue-700 font-medium"
            >
              Primary Doctor
            </label>
            <input
              id="healtcenterName"
              name="healtcenterName"
              type="text"
              autoComplete="Current Password"
              placeholder="Health Center Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col items-start mt-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-lg font-medium text-blue-700"
            >
              Admission Date
            </label>
            <input
              id="healtcenterName"
              name="healtcenterName"
              type="date"
              autoComplete="Current Password"
              placeholder="Health Center Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col items-start mt-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-lg text-blue-700 font-medium"
            >
              Discharge Date
            </label>
            <input
              id="healtcenterName"
              name="healtcenterName"
              type="date"
              autoComplete="Current Password"
              placeholder="Health Center Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="flex justify-end m-20">
          <button className="py-2 px-5 bg-blue-900 text-white rounded-xl mx-5 ">
            Save
          </button>
          <button
            className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl mx-5 "
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PhysicianHome;
