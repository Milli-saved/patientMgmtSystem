import React, { useState } from "react";
import { apiUtility } from "../../components/repo/api";

const AddNewHealthCenter = ({ handleAddNewHealthCenter }) => {
  const [healthData, setHealthData] = useState({
    name: "",
    Type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log('changeHandler', name, value);

    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log("env:", import.meta.env.VITE_API_URL);
      const response = await apiUtility.post("/healthcenter/createHealthCenter",
        healthData);

      console.log('response:', response);
      if (response.status == true) {
        setLoading(false);
        setSuccess(response.message);
        setError("");
        setHealthData({ name: "", Type: "" })
      } else {
        setError(response.message);
        setSuccess("");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 overflow-auto">
      <div className="relative p-4 w-[60%] max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg p-5">
          <div className="flex bg-blue-900 items-center justify-between p-4 md:p-5 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-white">
              Add Health Center
            </h3>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => (handleAddNewHealthCenter(false))}
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
          <form className="p-4 md:p-5" onSubmit={submitHandler}>
            <div className="flex flex-col items-start">
              <label
                htmlFor="userId"
                className="block mb-2 text-lg font-medium text-blue-700"
              >
                Type
              </label>
              <select
                name="Type"
                id="Type"
                value={healthData.Type}
                onChange={changeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                <option value="0"> Select Type </option>
                <option value="Main Health Center"> Main Health Center </option>
                <option value="Branch Health Center"> Branch Health Center </option>
              </select>
            </div>
            <div className="flex flex-col items-start mt-5">
              <label
                htmlFor="userId"
                className="block mb-2 text-lg text-blue-700 font-medium"
              >
                Health Center Name
              </label>
              <input
                name="name"
                id="name"
                value={healthData.name}
                onChange={changeHandler}
                type="text"
                placeholder="Health Center Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="text-red-500">
              {error && error}
            </div>
            <div className="text-green-500">
              {success && success}
            </div>
            <div className="flex justify-evenly mt-10">
              <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
                Create
              </button>
              <button onClick={() => (handleAddNewHealthCenter(false))} className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl ">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewHealthCenter;
