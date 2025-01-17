import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const addNewLabTest = async (labTestDetails) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/labtest/createLabTest`,
      labTestDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("res", response.data.data);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const AddNewLabTestModal = ({ isOpen, onClose }) => {
  const [labTestDetails, setLabTestDetails] = useState({
    PatientID: "",
    CreatedBy: "",
    Type: "",
    Results: "",
    Notes: "",
  });

  const AddNewLabReqMutation = useMutation({
    mutationFn: addNewLabTest,
    onSuccess: () => {
      toast.success("Added New Lab Req.");
      //   queryClient.invalidateQueries(["adminnewsList"]);
      onClose();
    },
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLabTestDetails({
      ...labTestDetails,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("the req: ", labTestDetails);
    AddNewLabReqMutation.mutate(labTestDetails);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 font-work-sans">
      <div className="relative p-4 w-[50%] max-w-[80%] max-h-screen overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Add New Lab Test Request
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
          <section className="w-full mb-36">
            <form onSubmit={submitHandler}>
              <h1 className="uppercase font-work-sans font-semibold text-center">
                New Referral
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-2 ml-10">
                <div className="mt-10 ">
                  <label className="text-gray-800">Patient Id</label>
                  <br />
                  <input
                    type="text"
                    name="PatientID"
                    onChange={changeHandler}
                    className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="Abebe"
                  />
                </div>
                <div className="mt-10 ">
                  <label className="text-gray-800">Created By</label>
                  <br />
                  <input
                    type="text"
                    name="CreatedBy"
                    onChange={changeHandler}
                    className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="Abebe"
                  />
                </div>

                <div className="mt-10">
                  <label className="text-gray-800">Type</label>
                  <br />
                  <input
                    name="Type"
                    onChange={changeHandler}
                    type="text"
                    className="col-span-2 w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="Kebede"
                  />
                </div>

                <div className="mt-10">
                  <label className="text-gray-800">Results</label>
                  <br />
                  <input
                    name="Results"
                    onChange={changeHandler}
                    type="text"
                    className="col-span-2 w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="Kebede"
                  />
                </div>
                <div className="mt-10">
                  <label className="text-gray-800">Notes</label>
                  <br />
                  <textarea
                    name="Notes"
                    onChange={changeHandler}
                    type="text"
                    className="col-span-2 w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-4"
                    placeholder="Kebede"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center px-4 mt-7">
                <button
                  type="submit"
                  className="bg-orange-500 w-1/3 p-3 mt-5 text-white font-normal rounded-lg hover:bg-orange-700 transition duration-300 mb-5"
                >
                  Create
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddNewLabTestModal;
