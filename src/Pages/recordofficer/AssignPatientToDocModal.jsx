import React, { useState } from "react";

const AssignPatientToDocModal = ({ onClose, selectedPatient }) => {
  const [patientDetails, setPatientDetails] = useState(selectedPatient);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 font-work-sans">
      <div className="relative p-4 w-[50%] max-w-[80%] max-h-screen overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Assign Patient To Doctor
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
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
                  name="fullName"
                  value={patientDetails.name}
                  onChange={changeHandler}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Patient Id
                </label>
                <input
                  id="healtcenterName"
                  name="fullName"
                  value={patientDetails.name}
                  onChange={changeHandler}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Description
                </label>
                <input
                  id="healtcenterName"
                  name="fullName"
                  value={patientDetails.name}
                  onChange={changeHandler}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  Assign To Doctor:
                </label>
                <input
                  id="healtcenterName"
                  name="fullName"
                  value={patientDetails.name}
                  onChange={changeHandler}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
            </div>
          </form>
        </div>{" "}
      </div>
    </div>
  );
};

export default AssignPatientToDocModal;
