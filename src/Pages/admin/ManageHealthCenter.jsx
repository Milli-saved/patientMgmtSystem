import React, { useEffect, useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import AddNewHealthCenter from "./AddNewHealthCenter";
import { apiUtility } from "../../components/repo/api";
import AdminTable from "./AdminTable";

const ManageHealthCenter = () => {
  const [addNewCenter, setAddNewCenter] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/healthcenter/getHealthCenter");
      setData(response.data);
      console.log('data', data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "Name", field: "name" },
    { label: "Health Care ID", field: "healthCenterId" },
    { label: "Type", field: "Type" },
  ];

  const actions = [
    // {
    //   label: "Update",
    //   onClick: (row) => {
    //     console.log("Update clicked for:", row);
    //   },
    // },
    {
      label: "Delete",
      color: "red",
      onClick: async (row) => {
        console.log("Delete clicked for:", row.healthCenterId);
        try {
          const response = await apiUtility.get("/healthcenter/deleteHealthCenter/" + row.healthCenterId);
          console.log('response', response);          
          if (response.status == true) {
            await fetchData();
            setError(response.message);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError(err.message);
        }
      },
    },
  ];

  const handleAddNewHealthCenter = (params) => {
    setAddNewCenter(params);
    fetchData();
    setError("");
  };
  return (
    <>
      <div className="mx-20">
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Manage Health Center
        </h1>
        <div className="flex justify-between items-center mt-16">
          <div className="flex">
            {/* <input
              placeholder="Search"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <button className="py-2 bg-blue-900 rounded-r-xl text-white px-5" >
              Search
            </button> */}
          </div>
          <div>
            <button
              onClick={() => setAddNewCenter(true)}
              className="px-5 py-3 text-white bg-blue-900 mx-5 rounded-xl"
            >
              <span className="flex items-center justify-evenly">
                <FaPlus className="mr-2" />
                New
              </span>
            </button>
            {/* <button className="px-5 py-3 text-white bg-blue-400 mx-5 rounded-xl">
              <span className="flex items-center justify-evenly">
                <FaDownload className="mr-2" />
                Export
              </span>
            </button> */}
          </div>
        </div>
        <div>
          {error && error}
        </div>
        <div className="mt-10">
          {/* <Table data={data && data} /> */}
          <AdminTable data={data && data} columns={columns} actions={actions} />
        </div>
      </div>
      {addNewCenter && (
        <AddNewHealthCenter
          handleAddNewHealthCenter={handleAddNewHealthCenter}
        />
      )}
    </>
  );
};

export default ManageHealthCenter;
