import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "../../components/Table";
import { FaDownload, FaPlus } from "react-icons/fa";
import AddNewPatient from "./AddNewPatientModal";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "./AdminTable";
import { apiUtility } from "../../components/repo/api";
import { Button } from "@mui/material";
import ExportTable from "../utils/ExportTable";

const getPatients = async (token) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patient/getPatient/P100001`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching users");
  return response.json();
};

const ManagePatient = () => {
  const { token } = useContext(AuthContext);
  const [addNewPatient, setAddNewPatient] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/patient/getAllPatient");
      if (response.status == true)
        setData(response.data);
      console.log('user: ', data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNewPatient = () => {
    setAddNewPatient(false);
    setError("");
  };
  const columns = [
    { label: "Patient ID", field: "PatientID" },
    { label: "Full Name", field: "fullName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "Sub City", field: "subCity" },
    { label: "Woreda", field: "Woreda" },
    { label: "House Number", field: "houseNumber" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Emergency Contact", field: "EmergencyContact" },
    { label: "Email", field: "Email" },
  ]; 

  const handleModalOpen = () => {
    setUpdate(true);
    setError("");
  }

  const handleModalClose = () => {
    setUpdate(false);
    fetchData();
    setError("");
  };

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
        console.log("Delete clicked for:", row);
         return;
        try {
          const response = await apiUtility.get("/user/deleteUser/" + row.userName);
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


  return (
    <div className="mx-20">
      <h1 className="m-5 text-5xl font-semibold text-gray-800">
        Manage Patients
      </h1>
      <div className="flex justify-end items-center mt-16">
        <div>
          <button
            onClick={() => setAddNewPatient(true)}
            className="px-5 py-3 text-white"
          >
            <Button variant="contained">New</Button>
          </button>
          <button className="px-5 py-3 text-white">
            <FaDownload className="mr-2" />
            <ExportTable data={data && data} fileName="User List" />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <AdminTable data={data && data} columns={columns} actions={actions} />
      </div>
      {addNewPatient && (
        <AddNewPatient onClose={handleAddNewPatient} />
      )}
    </div>
  );
};

export default ManagePatient;
