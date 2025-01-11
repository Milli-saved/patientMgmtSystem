import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const createNewUser = async (userData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/users/add_employee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

const AddNewUser = ({ handleAddNewUser }) => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    fullName: "",
    email: "",
    specialist: [],
    department: "",
    role: "",
    phoneNumber: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const addUserMutation = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => {
      toast.success("user created successfully");
      queryClient.invalidateQueries(["allUsers"]);
      closeModal();
    },
    onError: () => {
      toast.error("Error adding Patient");
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("the user dtails: ", userDetails);
    addUserMutation.mutate(userDetails);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 overflow-auto">
      <div className="relative p-4 w-[60%] max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg p-5">
          <div className="flex bg-blue-900 items-center justify-between p-4 md:p-5 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-white">
              Create New User
            </h3>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleAddNewUser}
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
          <form onSubmit={submitHandler} className="p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg font-medium text-blue-700"
                >
                  Health Center
                </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                  <option>Health care one</option>
                  <option>Health care Two</option>
                  <option>Health care Three</option>
                </select>
              </div>
              <div className="flex flex-col items-start mt-5">
                <label
                  htmlFor="userId"
                  className="block mb-2 text-lg text-blue-700 font-medium"
                >
                  User Name
                </label>
                <input
                  id="healtcenterName"
                  name="userName"
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
                  Full Name
                </label>
                <input
                  id="healtcenterName"
                  name="fullName"
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
                  Phone Number
                </label>
                <input
                  id="healtcenterName"
                  name="phoneNumber"
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
                  Role
                </label>
                <input
                  id="healtcenterName"
                  name="role"
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
                  Email
                </label>
                <input
                  id="healtcenterName"
                  name="email"
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
                  Specialist
                </label>
                <input
                  id="healtcenterName"
                  name="specialist"
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
                  Password
                </label>
                <input
                  id="healtcenterName"
                  name="password"
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
                  Department
                </label>
                <input
                  id="healtcenterName"
                  name="department"
                  onChange={changeHandler}
                  type="text"
                  autoComplete="Current Password"
                  placeholder="Health Center Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
            </div>
            <div className="flex justify-evenly mt-10">
              <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
                Create
              </button>
              <button
                onClick={handleAddNewUser}
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

export default AddNewUser;
