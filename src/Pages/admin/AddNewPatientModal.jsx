import React from "react";

const AddNewPatient = ({ handleAddNewPatient }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 overflow-auto">
      <div className="relative p-4 w-[60%] max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg p-5">
          <div className="flex bg-blue-900 items-center justify-between p-4 md:p-5 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-white">
              Create New Patient
            </h3>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleAddNewPatient}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="flex flex-col items-start mt-5">
              <label
                htmlFor="userId"
                className="block mb-2 text-lg font-medium text-blue-700"
              >
                Health Center
              </label>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[40%] p-2.5">
                <option>Health care one</option>
                <option>Health care Two</option>
                <option>Health care Three</option>
              </select>
            </div>
            <h1 className="text-4xl text-gray-800 mt-5">
              Personal Information
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Full Name
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
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  Gender
                </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Date Of Birth
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
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  Phone Number
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
                  Nationality
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
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  Martial Status
                </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>
            </div>
            <h1 className="text-4xl text-gray-800 mt-5">Contact Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Email
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
                  Address
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
                  Emergency Contact
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
            <h1 className="text-4xl text-gray-800 mt-5">Other Information</h1>
            <div className="flex flex-col items-start mt-5">
              <label
                htmlFor="userId"
                className="block mb-2 text-lg text-blue-700 font-medium"
              >
                Emergency Contact
              </label>
              <textarea
                id="healtcenterName"
                name="healtcenterName"
                type="textarea"
                autoComplete="Current Password"
                placeholder="Health Center Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex justify-evenly mt-10">
              <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
                Create
              </button>
              <button
                onClick={handleAddNewPatient}
                className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPatient;
