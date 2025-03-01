import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Table from "../../components/Table";
import AssignPatientToDocModal from "./AssignPatientToDocModal";
import { Alert, Box, Container, Paper, Snackbar } from "@mui/material";
import AddNewPatient from "../admin/AddNewPatientModal";
import AdminTable from "../admin/AdminTable";
import { apiUtility } from "../../components/repo/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import AutohideSnackbar from "../utils/AutohideSnackbar";
import ExportTable from "../utils/ExportTable";
// import  SnackBarShow  from "../Physician/SnackBarShow";

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

const AssignPatientToDoctor = () => {
  const [assignPatientModal, setAssignPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const { token, user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [addNewPatient, setAddNewPatient] = useState(false);
  const detailsClicked = (patientDetail) => {
    setAssignPatientModal(true);
    setSelectedPatient(patientDetail);
  };

  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/patient/getUnAssignedPatient/" + user.healthCenterId);
      if (response.status == true)
        setData(response.data);
      // console.log('user: ', data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    assignedFetch();
  }, []);

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

  const actions = [
    {
      label: "Assign",
      color: "gray",
      onClick: (row) => {
        // console.log("Update clicked for:", row);
        setSelectedPatient(row);
        assignedFetch();
        setAssignPatientModal(true);
        { SnackBarShow("Assigned Successfully", false) }
      },
    },
  ];

  const closeAssignModal = () => {
    setAssignPatientModal(false);
    setSelectedPatient({});
    assignedFetch();
    fetchData();
  };

  // For assign page
  const [unassignedresponse, setUnAssignResponse] = useState("");

  const action1 = [
    {
      label: "Un Assign",
      color: "gray",
      onClick: async (row) => {
        // console.log("un assigned clicked for:", row);
        try {
          const response = await apiUtility.get("/patient/unAssignPatient/" + row.patientId);
          // <AutohideSnackbar message={response.message} />
          { SnackBarShow("message", true) }
          setUnAssignResponse(response.message);
          assignedFetch();
          fetchData();
        } catch (err) {
          setUnAssignResponse("Unable to un assign patient"); fetchData();
        }
      },
    },
  ];

  const assignColumns = [
    { label: "Patient ID", field: "patientId" },
    { label: "Full Name", field: "patientName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Physician Id", field: "physicianId" },
    { label: "Physician Name", field: "physicianName" },
    { label: "Assigned Date", field: "assignedDate" },
    { label: "Physician Phone Number", field: "physicianPhoneNumber" },
  ];

  const [assignData, setAssignData] = useState(null);
  const assignedFetch = async () => {
    try {
      const response = await apiUtility.get("/patient/getAllAssignedPatient/" + user.healthCenterId);
      if (response.status == true)
        setAssignData(response.data);
      // console.log('assigned data: ', data);
    } catch (err) {
      setError(err.message);
    }
  }
  // end of assign one
  return (
    <>
      <div className="mx-10">
        <Toaster position="top-right" richcolors />
        <div className="flex justify-center items-center">
          <h1 className="m-5 text-5xl font-semibold text-gray-800">
            Assign Patient To Doctors
          </h1>
        </div>
        <div>
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            Patient List
          </h1>
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            <ExportTable data={data} fileName="Un Assigned Patient" />
          </h1>
          <div>
            <AdminTable data={data} columns={columns} actions={actions} />
          </div>
        </div>
        <div className="grid-flow-row">
          <h1 className="m-5 text-3xl font-semibold text-gray-800">
            Assigned Patient List
          </h1>
          {unassignedresponse && unassignedresponse}
          {/* <Paper className="float-start">
            <ExportTable data={assignData} fileName="Assigned Patient" />
          </Paper>
          <Box>
            <div>
              <AdminTable data={assignData} columns={assignColumns} actions={action1} />
            </div>
          </Box> */}
          <div>
            <h1 className="m-5 text-3xl font-semibold text-gray-800">
              <ExportTable data={assignData} fileName="Assigned Patient" />
            </h1>
            <div>
              <AdminTable data={assignData} columns={assignColumns} actions={action1} />
            </div>
          </div>
        </div>
      </div >
      {assignPatientModal && (
        <AssignPatientToDocModal
          onClose={closeAssignModal}
          patientInfo={selectedPatient}
        />
      )}
    </>
  );
};
function SnackBarShow(message, error) {
  return <Snackbar className="float-end" open={!!message} autoHideDuration={6000}>
    <Alert severity={error ? "error" : "success"}>
      {message}
    </Alert>
  </Snackbar>;
}

export default AssignPatientToDoctor;
