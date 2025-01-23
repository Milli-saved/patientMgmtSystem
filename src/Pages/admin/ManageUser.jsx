import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import { FaDownload, FaPlus } from "react-icons/fa";
import AddNewUser from "./AddNewUserModal";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/auth";
import { apiUtility } from "../../components/repo/api";
import AdminTable from "./AdminTable";
import UpdateUser from "./UpdateUser";
import ExportTable from "../utils/ExportTable";
import { Button } from "@mui/material";

const getUsers = async (token) => {
  // const response = await fetch(
  //   `${import.meta.env.VITE_API_URL}/user/getUser/Ermi`,
  //   // {
  //   //   headers: {
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   // }
  // );
  if (!response.ok) throw new Error("Error fetching users");
  return response.json();
};

const ManageUser = () => {
  const { token } = useContext(AuthContext);
  const [addNewUser, setAddNewUser] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/user/getAllUser");
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

  const handleAddNewUser = () => {
    setAddNewUser(false);
    setError("");
    fetchData();
  };
  const columns = [
    { label: "userName", field: "userName" },
    { label: "Full Name", field: "fullName" },
    { label: "Email", field: "email" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Department", field: "department" },
    { label: "Role", field: "role" },
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
        // return;
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
      <h1 className="m-3 text-5xl font-semibold text-gray-800">Manage User</h1>
      <div className="flex justify-end items-center mt-16">
        <div>
          <button
            onClick={() => setAddNewUser(true)}
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
      {error && error}
      <div className="mt-10">
        <AdminTable data={data && data} columns={columns} actions={actions} />
      </div>
      {addNewUser && <AddNewUser open={addNewUser} onClose={handleAddNewUser} />}
      {update && <UpdateUser open={update} onClose={handleModalClose} data={updateDate} />}
    </div>
  );
};

export default ManageUser;
