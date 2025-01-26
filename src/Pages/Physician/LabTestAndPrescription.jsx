// import React, { useState } from "react";
// import Table from "../../components/Table";
// import AddNewLabTestModal from "./AddNewLabTestModal";

// const data = [
//   {
//     name: "Cherry Delight",
//     id: "#KP267400",
//     branch: "Sheger",
//     email: "abdutolla@gmail.com",
//     type: "Super Admin",
//     status: "Pending",
//     color: "bg-yellow-100 text-yellow-700",
//   },
//   {
//     name: "Kiwi",
//     id: "#TL681535",
//     branch: "Sheger",
//     email: "abdutolla@gmail.com",
//     type: "Admin",
//     status: "Active",
//     color: "bg-green-100 text-green-700",
//   },
//   {
//     name: "Mango Magic",
//     id: "#GB651535",
//     branch: "Sheger",
//     email: "abdutolla@gmail.com",
//     type: "Super Admin",
//     status: "Inactive",
//     color: "bg-red-100 text-red-700",
//   },
// ];

// const LabTestAndPrescription = () => {
//   const [activeTab, setActiveTab] = useState("0");
//   const [createNewLabTestReq, setCreateNewLabTestReq] = useState(false);

//   const closeNewLabReqModal = () => {
//     setCreateNewLabTestReq(false);
//   };
//   return (
//     <>
//       <div className="mx-10 flex items-center justify-between">
//         <h1 className="m-5 text-5xl font-semibold text-gray-800">
//           Lab Test And Prescriptions
//         </h1>
//         <div>
//           <button
//             onClick={() => setCreateNewLabTestReq(true)}
//             className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-sm p-5 h-8 ms-auto inline-flex justify-center items-center"
//           >
//             Create New Lab Test Request
//           </button>
//         </div>
//       </div>
//       <div className="flex items-center">
//         <h1
//           className="m-5 text-2xl font-semibold text-gray-800 cursor-pointer p-5 bg-blue-200 rounded-lg "
//           onClick={() => setActiveTab(0)}
//         >
//           Lab Test
//         </h1>
//         <h1
//           className="m-5 text-2xl font-semibold text-gray-800 cursor-pointer p-5 bg-blue-200 rounded-lg "
//           onClick={() => setActiveTab(1)}
//         >
//           Prescriptions
//         </h1>
//       </div>
//       <div>
//         {activeTab == 0 ? (
//           <div>
//             <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">
//               List of Patients
//             </h1>
//             <Table data={data} />
//           </div>
//         ) : (
//           <div>
//             <h1 className="m-5 text-3xl underline font-semibold text-gray-800 ">
//               Prescription List
//             </h1>
//             <Table data={data} />
//           </div>
//         )}
//       </div>
//       {createNewLabTestReq && (
//         <AddNewLabTestModal
//           isOpen={createNewLabTestReq}
//           onClose={closeNewLabReqModal}
//         />
//       )}
//     </>
//   );
// };

// export default LabTestAndPrescription;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import { FaDownload } from "react-icons/fa";
import ExportTable from "../utils/ExportTable";

const LabTestAndPrescription = () => {
  const [patient, setData] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [labTests, setLabTests] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState(0); // Tab state

  const fetchData = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status == true) setData(response.data);
      // Fetch prescription data
      const prescriptionResponse = await apiUtility.get(`/doctor/getPrescriptions/${user.userName}`);
      if (prescriptionResponse.status == true) setPrescriptions(prescriptionResponse.data);

      // Fetch lab test data
      const labTestResponse = await apiUtility.get(`/doctor/getLabTests/${user.userName}`);
      if (labTestResponse.status == true) setLabTests(labTestResponse.data);

    } catch (err) {
      setError("Unable to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Prescription data
  const [prescriptionData, setPrescriptionData] = useState({
    PatientID: selectedPatient,
    Medication: "",
    Dosage: "",
    Duration: "",
    Instructions: "",
  });

  const handlePrescriptionChange = (key, value) => {
    setPrescriptionData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiUtility.post("/doctor/createPrescription", prescriptionData);
      if (response.status == true) {
        setPrescriptionData({
          PatientID: selectedPatient,
          Medication: "",
          Dosage: "",
          Duration: "",
          Instructions: "",
        });
        fetchData();
      }
    } catch (err) {
      setError("Unable to save prescription data");
    }
  };

  // Lab Test data
  const [labTestData, setLabTestData] = useState({
    PatientID: selectedPatient,
    CreatedBy: user.userName,
    Type: "",
    Results: "",
    Notes: "",
  });

  const handleLabTestChange = (key, value) => {
    setLabTestData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLabTestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiUtility.post("/doctor/createLabTest", labTestData);
      if (response.status == true) {
        setLabTestData({
          PatientID: selectedPatient,
          CreatedBy: user.userName,
          Type: "",
          Results: "",
          Notes: "",
        });
        fetchData();
      }
    } catch (err) {
      setError("Unable to save lab test data");
    }
  };

  return (
    <Box>
      {/* Patient Selection */}
      <Box display="flex" justifyContent="end" mx={5} my={3}>
        <Box maxWidth="auto">
          <FormControl sx={{width:300}}>
            <InputLabel id="select-patient-label">Select Patient</InputLabel>
            <Select labelId="select-patient-label" onChange={(e) => setSelectedPatient(e.target.value)} label="Select Patient">
              {patient && patient.map((item) => (
                <MenuItem value={item.patientId} key={item.patientId}>{item.patientName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tabs for different sections */}
      <Box mx={5} my={3}>
        <Tabs value={value} onChange={handleTabChange} aria-label="patient information tabs">
          <Tab label="Lab Test" />
        </Tabs>
        {/* Lab Test Tab */}
        {value === 0 && (
          <Box>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>Lab Test</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Test Type"
                    value={labTestData.Type}
                    variant="outlined"
                    onChange={(e) => handleLabTestChange("Type", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Results"
                    value={labTestData.Results}
                    variant="outlined"
                    onChange={(e) => handleLabTestChange("Results", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    value={labTestData.Notes}
                    variant="outlined"
                    onChange={(e) => handleLabTestChange("Notes", e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button sx={{ mt: 3 }} variant="contained" onClick={handleLabTestSubmit}>Create Lab Test</Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LabTestAndPrescription;
