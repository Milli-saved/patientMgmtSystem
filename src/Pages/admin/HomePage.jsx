import React from "react";
import SquareCard from "../../components/SquareCard";
import { FaHospital, FaUserCheck, FaUsers } from "react-icons/fa";
import AdminPieChart from "./AdminPieChart";
import BarChartDiagram from "./BarChartDiagram";

const HomePage = () => {
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full mx-10 border">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">
              Welcome to Your Patient Information Management Dashboard
            </h1>
            <button
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mt-4">
            This platform is designed to help you manage patient information
            quickly and securely. You can access and update patient details,
            schedule appointments, and review medical histories with ease.
            Everything you need is in one place to streamline your workflow and
            improve patient care. Let’s get started!
          </p>
          <div className="mt-6 flex justify-end ">
            <button className="bg-blue-600 text-white py-2 outline px-4 rounded-md hover:bg-blue-700">
              View detail
            </button>
          </div>
        </div>
      </div>
      <section className="mx-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SquareCard
            icon={FaUsers}
            label={"Total User"}
            value={2420}
            percentage={40}
            isPositive={true}
          />
          <SquareCard
            icon={FaHospital}
            label={"Total Health Care Center"}
            value={200}
            percentage={40}
            isPositive={true}
          />
          <SquareCard
            icon={FaUserCheck}
            label={"Total Patient"}
            value={23000}
            percentage={40}
            isPositive={true}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <SquareCard
            icon={FaUserCheck}
            label={"Active Patient"}
            value={20000}
            percentage={40}
            isPositive={true}
          />
          <SquareCard
            icon={FaUserCheck}
            label={"Inactive Patient"}
            value={3000}
            percentage={40}
            isPositive={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 p-4 bg-white shadow-md shadow-gray-200 rounded-lg">
          <AdminPieChart />
          <BarChartDiagram />
        </div>
      </section>
    </>
  );
};

export default HomePage;
