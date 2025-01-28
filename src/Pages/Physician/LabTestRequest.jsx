// import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Modal,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { apiUtility } from "../../components/repo/api";
// import { AuthContext } from "../../contexts/auth";
// import AdminTable from "../admin/AdminTable";
// import ExportTable from "../utils/ExportTable";

// const LabTestRequest = () => {
//   const [patients, setPatients] = useState([]); // List of patients
//   const [selectedPatient, setSelectedPatient] = useState(""); // Selected patient
//   const [labTests, setLabTests] = useState([]); // List of lab tests
//   const [selectedLabTest, setSelectedLabTest] = useState(""); // Selected lab test
//   const [notes, setNotes] = useState(""); // Additional notes for the lab test
//   const [error, setError] = useState(""); // Error message
//   const [successMessage, setSuccessMessage] = useState(""); // Success message
//   const { user } = useContext(AuthContext); // Authenticated user (doctor)

//   // Fetch patients on component mount
//   useEffect(() => {
//     fetchPatients();
//     fetchLabTests();
//   }, []);

//   // Fetch all patients
//   const fetchPatients = async () => {
//     try {
//       const response = await apiUtility.get(`/labtest/getAllNotInLabTestPatient/${user.healthCenterId}`);
//       if (response.status) setPatients(response.data);
//     } catch (err) {
//       setError("Unable to fetch patients");
//     }
//   };

//   // Fetch lab tests (assuming an endpoint exists)
//   const fetchLabTests = async () => {
//     try {
//       const response = await apiUtility.get("/billService/getAll");
//       if (response.status) setLabTests(response.data);
//     } catch (err) {
//       setError("Unable to fetch lab tests");
//     }
//   };

//   // Handle patient selection
//   const handlePatientChange = (e) => {
//     setSelectedPatient(e.target.value);
//     setSuccessMessage("");
//     setError("");
//   };

//   // Handle lab test selection
//   const handleLabTestChange = (e) => {
//     setSelectedLabTest(e.target.value);
//     setSuccessMessage("");
//     setError("");
//   };

//   // Handle notes change
//   const handleNotesChange = (e) => {
//     setNotes(e.target.value);
//     setSuccessMessage("");
//     setError("");
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedPatient || !selectedLabTest) {
//       setError("Please select a patient and a lab test");
//       return;
//     }
//     try {
//       const response = await apiUtility.post("/labtest/testrequest", {
//         PatientID: selectedPatient,
//         Type: selectedLabTest,
//         RequestedBy: user.userName,
//       });
//       if (response.status) {
//         setSuccessMessage("Lab test request submitted successfully");
//         setSelectedPatient("");
//         setSelectedLabTest("");
//         setNotes("");
//         fetchLabTests();
//       } else {
//         setError(response.message || "Failed to submit lab test request");
//       }
//     } catch (err) {
//       setError("Unable to submit lab test request");
//     }
//   };

//   const columns = [
//     { label: "Patient ID", field: "_id" },
//     { label: "Record ID", field: "TestID" },
//     { label: "Full Name", field: "patientName" },
//     { label: "Date Of Birth", field: "DateOfBirth" },
//     { label: "Gender", field: "Gender" },
//     { label: "City", field: "City" },
//     { label: "subCity", field: "patientSubCity" },
//     { label: "Woreda", field: "patientWoreda" },
//     { label: "House Number", field: "patientHouseNumber" },
//     { label: "Emergency Contact", field: "patientEmergencyContact" },
//     { label: "Email", field: "patientEmail" },
//     { label: "Phone Number", field: "patientPhone" },
//     { label: "status", field: "status" },
//   ];
//   const [tabIndex, setTabIndex] = useState(0);
//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };
//   return (
//     <>
//       <Box mx={5} my={3}>
//         <Typography variant="h5" fontWeight="bold" mb={3}>
//           Lab Test Request
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Patient Selection */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="select-patient-label">Select Patient</InputLabel>
//                 <Select
//                   labelId="select-patient-label"
//                   value={selectedPatient}
//                   onChange={handlePatientChange}
//                   label="Select Patient"
//                 >
//                   {patients.map((patient) => (
//                     <MenuItem key={patient.PatientID} value={patient.PatientID}>
//                       {patient.fullName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Lab Test Selection */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="select-lab-test-label">Select Lab Test</InputLabel>
//                 <Select
//                   labelId="select-lab-test-label"
//                   value={selectedLabTest}
//                   onChange={handleLabTestChange}
//                   label="Select Lab Test"
//                 >
//                   {labTests.map((test) => (
//                     <MenuItem key={test.typeId} value={test.typeId}>
//                       {test.typeName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Additional Notes */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Notes"
//                 multiline
//                 rows={4}
//                 value={notes}
//                 onChange={handleNotesChange}
//               />
//             </Grid>
//           </Grid>

//           {/* Submit Button */}
//           <Box mt={4} display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" type="submit">
//               Submit Request
//             </Button>
//           </Box>
//         </form>

//         {/* Error and Success Messages */}
//         {error && (
//           <Typography color="error" mt={2}>
//             {error}
//           </Typography>
//         )}
//         {successMessage && (
//           <Typography color="success.main" mt={2}>
//             {successMessage}
//           </Typography>
//         )}
//       </Box>

//       <Tabs value={tabIndex} onChange={handleTabChange}>
//         <Tab label="Pending lab test request" />
//         <Tab label="Updated Lab test" />
//       </Tabs>
//       {tabIndex === 0 &&
//         <Box sx={{ m: "16", p: 5 }}>
//           <Typography variant="h5">
//             Pending lab test requests
//           </Typography>
//           <Typography>
//             <ExportTable data={[]} fileName="Pending lab test request"></ExportTable>
//           </Typography>
//           <AdminTable data={[]} columns={columns} />
//         </Box>}
//       {tabIndex === 1 &&
//         <Box sx={{ m: "16", p: 5 }}>
//           <Typography variant="h5">
//             Updated lab test requests
//           </Typography>
//           <Typography>
//             <ExportTable data={[]} fileName="Updated lab test request"></ExportTable>
//           </Typography>
//           <AdminTable data={[]} columns={columns} />
//         </Box>}
//     </>
//   );
// };

// export default LabTestRequest;

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
  Tabs,
  Tab,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

const LabTestRequest = () => {
  const [patients, setPatients] = useState([]); // List of patients
  const [selectedPatient, setSelectedPatient] = useState(""); // Selected patient
  const [labTests, setLabTests] = useState([]); // List of lab tests
  const [pendinglabTests, setPendingLabTests] = useState([]); // List of lab tests
  const [activelabTests, setActiveLabTests] = useState([]); // List of lab tests
  const [selectedLabTests, setSelectedLabTests] = useState([]); // Selected lab test types
  const [notes, setNotes] = useState(""); // Additional notes for the lab test
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const { user } = useContext(AuthContext); // Authenticated user (doctor)

  const [tabIndex, setTabIndex] = useState(0); // Tab index

  // Fetch data on component mount
  useEffect(() => {
    fetchPatients();
    fetchLabTests();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/labtest/getAllNotInLabTestPatient/${user.healthCenterId}`);
      if (response.status) setPatients(response.data);
    } catch (err) {
      setError("Unable to fetch patients");
    }
  };

  const fetchLabTests = async () => {
    try {
      const response = await apiUtility.get("/billService/getAll");
      const pending = await apiUtility.get("/labtest/getLabTestRequest/" + user.userName);
      const active = await apiUtility.get("/labtest/getLabTestRequestApproved/" + user.userName);
      if (response.status) setLabTests(response.data);
      if (pending.status) setPendingLabTests(pending.data);
      if (active.status) setActiveLabTests(active.data);
    } catch (err) {
      setError("Unable to fetch lab tests");
    }
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  const handleLabTestChange = (e) => {
    setSelectedLabTests(e.target.value); // For multiple selection
    setSuccessMessage("");
    setError("");
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || selectedLabTests.length === 0) {
      setError("Please select a patient and at least one lab test type");
      return;
    }
    try {
      const response = await apiUtility.post("/labtest/testrequest", {
        PatientID: selectedPatient,
        Type: selectedLabTests,
        RequestedBy: user.userName,
      });
      console.log('response', response);

      if (response.status) {
        setSuccessMessage("Lab test request submitted successfully");
        setSelectedPatient("");
        setSelectedLabTests([]);
        setNotes("");
        fetchLabTests();
        fetchPatients();
      } else {
        setError(response.message || "Failed to submit lab test request");
      }
    } catch (err) {
      setError("Unable to submit lab test request");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const columns = [
    { label: "Patient ID", field: "_id" },
    { label: "Record ID", field: "TestID" },
    { label: "Full Name", field: "patientName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "subCity", field: "patientSubCity" },
    { label: "Woreda", field: "patientWoreda" },
    { label: "House Number", field: "patientHouseNumber" },
    { label: "Emergency Contact", field: "patientEmergencyContact" },
    { label: "Email", field: "patientEmail" },
    { label: "Phone Number", field: "patientPhone" },
    { label: "Status", field: "status" },
  ];

  return (
    <>
      <Box mx={5} my={3}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Lab Test Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Patient Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-patient-label">Select Patient</InputLabel>
                <Select
                  labelId="select-patient-label"
                  value={selectedPatient}
                  onChange={handlePatientChange}
                  label="Select Patient"
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.PatientID} value={patient.PatientID}>
                      {patient.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Lab Test Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-lab-test-label">Select Lab Test</InputLabel>
                <Select
                  labelId="select-lab-test-label"
                  multiple

                  value={selectedLabTests}
                  onChange={handleLabTestChange}
                  label="Select Lab Test"
                >
                  {labTests.map((test) => (
                    <MenuItem key={test.typeId} value={test.typeId}>
                      {test.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Additional Notes */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={notes}
                onChange={handleNotesChange}
              />
            </Grid> */}
          </Grid>

          {/* Submit Button */}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Submit Request
            </Button>
          </Box>
        </form>

        {/* Error and Success Messages */}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="success.main" mt={2}>
            {successMessage}
          </Typography>
        )}
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Pending Lab Test Requests" />
        <Tab label="Updated Lab Test Requests" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ m: "16", p: 5 }}>
          <Typography variant="h5">Pending Lab Test Requests</Typography>
          <ExportTable data={[]} fileName="Pending_Lab_Test_Requests" />
          <AdminTable data={pendinglabTests} columns={columns} />
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ m: "16", p: 5 }}>
          <Typography variant="h5">Updated Lab Test Requests</Typography>
          <ExportTable data={[]} fileName="Updated_Lab_Test_Requests" />
          <AdminTable data={activelabTests} columns={columns} />
        </Box>
      )}
    </>
  );
};

export default LabTestRequest;
