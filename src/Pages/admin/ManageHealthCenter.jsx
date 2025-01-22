import React, { useEffect, useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import Table from "../../components/Table";
import AddNewHealthCenter from "./AddNewHealthCenter";
import { apiUtility } from "../../components/repo/api";
import AdminTable from "./AdminTable";
import { Button } from "@mui/material";
import ExportTable from "../utils/ExportTable";
import UpdateHealthCenter from "./UpdateHealthCenter";

const ManageHealthCenter = () => {
  const [addNewCenter, setAddNewCenter] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);

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
    {
      label: "Update",
      color: "green",
      onClick: (row) => {
        console.log("Update clicked for:", row);
        setUpdateDate(row);
        setUpdate(true);
        setError("");
      },
    },
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
  const handleClose = () => {
    setUpdate(false);
    setError("");
    fetchData();
  };
  return (
    <>
      <div className="mx-20">
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Manage Health Center
        </h1>
        <div className="flex justify-between items-center mt-16">
          <div className="flex">
          </div>
          <div>
            <button
              onClick={() => setAddNewCenter(true)}
              className="px-5 py-3 text-white"
            >
              <Button variant="contained">New</Button>
            </button>
            <ExportTable data={data && data} fileName="Health Center List" />
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
      {update && <UpdateHealthCenter open={update} onClose={handleClose} data={updateDate} />}
    </>
  );
};

export default ManageHealthCenter;
