import React from "react";

const PatientSettings = () => {
  return (
    <>
      <div>
        <h1 className="m-5 text-5xl font-semibold text-gray-800">Settings</h1>
      </div>
      <div>
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
          <h1 className="text-4xl text-gray-800 mt-5">Personal Information</h1>
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
          <h1 className="text-4xl text-gray-800 mt-5">Change Password</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col items-start mt-5">
              <label
                htmlFor="userId"
                className="block mb-2 text-lg text-blue-700 font-medium"
              >
                Current Password
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
                New Password
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
                Confirm Password
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

          <div className="flex justify-evenly mt-10">
            <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
              Create
            </button>
            <button
              // onClick={handleAddNewPatient}
              className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PatientSettings;
