import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const createPatient = async (patientDetails) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/patient/createPatient`,
      patientDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("the res: ", response.data);
    return response.data;
  } catch (error) {
    console.log("I got this error: ", error);
  }
};

const UpdatePatientInfo = ({ onClose, selectedPatient }) => {
  const [patientDetails, setPatientDetails] = useState(selectedPatient);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  const addPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Patient created successfully");
      onClose();
    },
    onError: () => {
      toast.error("Error adding Patient");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("%%%: ", patientDetails);
    // try {
    addPatientMutation.mutate(patientDetails);
    // } catch (error) {
    //   console.log("got this error");
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 font-work-sans">
      <div className="relative p-4 w-[50%] max-w-[80%] max-h-screen overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Add New Patient Record
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
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                  value={patientDetails.fullName}
                  onChange={changeHandler}
                  type="text"
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
                <select
                  name="Gender"
                  value={selectedPatient.Gender}
                  onChange={changeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  name="DateOfBirth"
                  value={selectedPatient.DateOfBirth}
                  onChange={changeHandler}
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
                  name="phoneNumber"
                  value={patientDetails.phoneNumber}
                  onChange={changeHandler}
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
                  <option>Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
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
                  name="Email"
                  value={selectedPatient.Email}
                  onChange={changeHandler}
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
                  City
                </label>
                <input
                  id="healtcenterName"
                  onChange={changeHandler}
                  name="City"
                  value={selectedPatient.City}
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
                  SubCity
                </label>
                <input
                  id="healtcenterName"
                  onChange={changeHandler}
                  name="subCity"
                  value={selectedPatient.subCity}
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
                  Woreda
                </label>
                <input
                  id="healtcenterName"
                  onChange={changeHandler}
                  name="Woreda"
                  value={selectedPatient.Woreda}
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
                  House Number
                </label>
                <input
                  id="healtcenterName"
                  onChange={changeHandler}
                  name="houseNumber"
                  value={selectedPatient.houseNumber}
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
              <input
                id="healtcenterName"
                name="EmergencyContact"
                value={selectedPatient.EmergencyContact}
                onChange={changeHandler}
                type="text"
                autoComplete="Current Password"
                placeholder="Health Center Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex justify-evenly mt-10">
              <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
                Update
              </button>
              <button
                onClick={onClose}
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

export default UpdatePatientInfo;
