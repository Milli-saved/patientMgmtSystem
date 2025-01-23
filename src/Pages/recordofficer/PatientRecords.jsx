import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import AddNewPateintModal from "./AddNewPateintModal";
import { Toaster } from "sonner";
import UpdatePatientInfo from "./UpdatePatientInfoModal";
import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import AdminTable from "../admin/AdminTable";
import { apiUtility } from "../../components/repo/api";
import { Button, Snackbar } from "@mui/material";
import AddNewPatient from "../admin/AddNewPatientModal";
import AutohideSnackbar from "../utils/AutohideSnackbar";

const data = [
  {
    name: "Cherry Delight",
    id: "#KP267400",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Super Admin",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Kiwi",
    id: "#TL681535",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Admin",
    status: "Active",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Mango Magic",
    id: "#GB651535",
    branch: "Sheger",
    email: "abdutolla@gmail.com",
    type: "Super Admin",
    status: "Inactive",
    color: "bg-red-100 text-red-700",
  },
];

const PatientRecords = () => {

  const { token, user } = useContext(AuthContext);
  console.log('usersss', user);

  const [addNewPatient, setAddNewPatient] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [doneMessage, setDoneMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/patient/getAllPatientByHealth/" + user.healthCenterId);
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
  const onClose=()=>{
    console.log('onClose');
    setAddNewPatient(false);
    fetchData();
    setError("");
  }
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
    // {
    //   label: "Activate",
    //   color: "gray",
    //   onClick: async (row) => {
    //     console.log("Delete clicked for:", row);
    //     // return;
    //     try {
    //       const response = await apiUtility.get("/user/deleteUser/" + row.PatientID);
    //       console.log('response', response);
    //       if (response.status == true) {
    //         await fetchData();
    //         setError(response.message);
    //       } else {
    //         setError(response.message);
    //       }
    //     } catch (err) {
    //       setError(err.message);
    //     }
    //   },
    // },
  ];

  const [createNewPatientModal, setCreateNewPatientModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

  const closeAddNewPatientModal = (message,isDone) => {
    setCreateNewPatientModal(false);
    setIsDone(isDone);
    setDoneMessage(message)
  };

  const showPatientDetails = (patientInfo) => {
    setSelectedPatient(patientInfo);
    setShowDetailsModal(true);
  };

  const closePatientDetailsModal = () => {
    // console.log('message',message, isDone);    
    setUpdate(false);
    fetchData();
    // setIsDone(isDone);
    // setDoneMessage(message)
  };

  return (
    <>
      <div className="mx-10">
        <Toaster position="top-right" richcolors />
        <div className="flex justify-between items-center">
          <h1 className="m-5 text-5xl font-semibold text-gray-800">
            Patient Records
          </h1>
          <Button variant="contained" className="float-right"
            onClick={() => setCreateNewPatientModal(true)}
          >
            Create New patient Record
          </Button>
        </div>
        <div>
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            Patient List
          </h1>
          <AdminTable data={data && data} columns={columns} actions={actions} />
          </div>
      </div>
      {createNewPatientModal && (
        <AddNewPatient onClose={closeAddNewPatientModal} />
      )}
      {update && (
        <UpdatePatientInfo
          onClose={closePatientDetailsModal}
          data={updateDate}
        />
      )}
    {isDone && <AutohideSnackbar message={doneMessage} />}
    </>
  );
};

export default PatientRecords;
