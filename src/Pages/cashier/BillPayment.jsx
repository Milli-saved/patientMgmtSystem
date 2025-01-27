// // import React, { useContext, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   TextField,
// //   Button,
// //   Grid,
// //   Checkbox,
// //   FormControlLabel,
// //   Paper,
// // } from "@mui/material";
// // import axios from "axios";
// // import { useEffect } from "react";
// // import { apiUtility } from "../../components/repo/api";
// // import { AuthContext } from "../../contexts/auth";
// // import AdminTable from "../admin/AdminTable";
// // import ExportTable from "../utils/ExportTable";

// // const BillPayment = () => {
// //   const [patient, setData] = useState(null);
// //   const [error, setError] = useState(false);
// //   const [selectedPatient, setSelectedPatient] = useState("");
// //   const { user } = useContext(AuthContext);
// //   const [formData, setFormData] = useState({
// //     PatientID: selectedPatient,
// //     createdBy: user.userName,
// //     UpdatedBy: "",
// //     Amount: "",
// //     Status: "unpaid",
// //     Type: [],
// //   });

// //   const fetchData = async () => {
// //     try {
// //       console.log('userName', user);
// //       const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
// //       if (response.status == true)
// //         setData(response.data);
// //       console.log('user: ', patient);
// //     } catch (err) {
// //       setError("Unable to get assigned patient");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     fetchBillData();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleTypeChange = (type) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       Type: prev.Type.includes(type)
// //         ? prev.Type.filter((item) => item !== type)
// //         : [...prev.Type, type],
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       console.log('post data', selectedPatient);
// //       formData.PatientID = selectedPatient;
// //       console.log('post data', formData);
// //       // return;      
// //       if (!formData.PatientID) {
// //         setError("Please select patient")
// //       }
// //       const response = await apiUtility.post("/bill/createBill", {
// //         ...formData,
// //         CreatedAt: new Date(),
// //       });
// //       console.log("Bill saved:", response);
// //       if (response) {
// //         setError(response.message);
// //         if (response.status == true) {
// //           setFormData({
// //             Amount: "",
// //             Type: [],
// //           })
// //           // console.log('form data', formData);
// //           fetchBillData();
// //         }
// //       }
// //     } catch (error) {
// //       setError("Unable to save bill data");
// //     }
// //   };

// //   const columns = [
// //     { label: "Patient ID", field: "_id" },
// //     { label: "Full Name", field: "patientName" },
// //     { label: "Phone Number", field: "patientPhone" },
// //     { label: "Email", field: "patientEmail" },
// //     { label: "Sub city", field: "patientSubCity" },
// //     { label: "Woreda", field: "patientWoreda" },
// //     { label: "House Number", field: "patientHouseNumber" },
// //     { label: "Emergency Contact", field: "patientEmergencyContact" },
// //     { label: "Bill Amount", field: "billAmount" },
// //     { label: "Bill Status", field: "billStatus" },
// //     { label: "Bill Type", field: "billType" },
// //   ];

// //   // const actions = [
// //   //   {
// //   //     label: "Assign",
// //   //     color: "gray",
// //   //     onClick: (row) => {
// //   //       // console.log("Update clicked for:", row);
// //   //       setSelectedPatient(row);
// //   //       assignedFetch();
// //   //       setAssignPatientModal(true);
// //   //       { SnackBarShow("Assigned Successfully", false) }
// //   //     },
// //   //   },
// //   // ];

// //   const [data, setBillDate] = useState(null);
// //   const fetchBillData = async () => {
// //     try {
// //       const response = await apiUtility.get("/bill/getAllBillByHealthCenter/" + user.healthCenterId);
// //       if (response.status == true)
// //         setBillDate(response.data);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <>
// //       <Box mx={5} my={3}>
// //         <Typography variant="h4" fontWeight="bold" mb={3}>
// //           Bill Payment Generation
// //         </Typography>
// //         <Box display="flex" justifyContent="end" mx={5} my={3}>
// //           <Box maxWidth="400">
// //             <FormControl sx={{ width: 300 }}>
// //               <InputLabel id="select-patient-label">Select Patient</InputLabel>
// //               <Select labelId="select-patient-label" onChange={(e) => setSelectedPatient(e.target.value)}
// //                 label="Select Patient">
// //                 {patient && patient.map(items => {
// //                   return <MenuItem value={items.patientId}>{items.patientName}</MenuItem>
// //                 })}
// //               </Select>
// //             </FormControl>
// //           </Box>
// //         </Box>
// //         <form onSubmit={handleSubmit}>
// //           <Grid container spacing={3}>
// //             {/* Patient ID Selection */}
// //             {/* Amount */}
// //             <Grid item xs={12} md={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Amount"
// //                 name="Amount"
// //                 type="number"
// //                 value={formData.Amount}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </Grid>
// //             {/* Status */}
// //             <Grid item xs={12} md={6}>
// //               <FormControl fullWidth>
// //                 <InputLabel id="status-label">Status</InputLabel>
// //                 <Select
// //                   labelId="status-label"
// //                   name="Status"
// //                   value={formData.Status}
// //                   onChange={handleChange}
// //                   required
// //                 >
// //                   <MenuItem value="paid">Paid</MenuItem>
// //                   <MenuItem value="unpaid">Unpaid</MenuItem>
// //                   <MenuItem value="tenaMedhin">TenaMedhin</MenuItem>
// //                   <MenuItem value="refunded">Refunded</MenuItem>
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             {/* Type */}
// //             <Grid item xs={12}>
// //               <Typography variant="subtitle1" mb={1}>
// //                 Type
// //               </Typography>
// //               {["pharmacy", "lab", "consultation"].map((type) => (
// //                 <FormControlLabel
// //                   key={type}
// //                   control={
// //                     <Checkbox
// //                       // checked={formData && formData.Type.includes(type)}
// //                       onChange={() => handleTypeChange(type)}
// //                     />
// //                   }
// //                   label={type.charAt(0).toUpperCase() + type.slice(1)}
// //                 />
// //               ))}
// //             </Grid>
// //           </Grid>
// //           {/* Submit Button */}
// //           {error && error}
// //           <Box mt={4} display="flex" justifyContent="flex-end">
// //             <Button variant="contained" color="primary" type="submit">
// //               Save Bill
// //             </Button>
// //           </Box>
// //         </form>
// //       </Box>
// //       <Box>
// //         <Typography className="p-3" variant="h6" fontWeight="bold">Bill Records</Typography>
// //         <h1 className="m-5 text-3xl font-semibold text-gray-800">
// //           <ExportTable data={data} fileName="Bill Statement" />
// //         </h1>
// //         <Paper>
// //           <AdminTable data={data} columns={columns} />
// //         </Paper>
// //       </Box>
// //     </>
// //   );
// // };

// // export default BillPayment;


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
//   Checkbox,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { apiUtility } from "../../components/repo/api";
// import { AuthContext } from "../../contexts/auth";
// import AdminTable from "../admin/AdminTable";
// import ExportTable from "../utils/ExportTable";

// const BillPayment = () => {
//   const [patients, setPatients] = useState([]);
//   const [typeList, setTypeList] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState("");
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [formData, setFormData] = useState({
//     PatientID: "",
//     createdBy: "",
//     UpdatedBy: "",
//     Amount: 0,
//     Status: "unpaid",
//     Type: [],
//   });
//   const [billData, setBillData] = useState([]);
//   const [error, setError] = useState("");
//   const { user } = useContext(AuthContext);
// console.log('bill data', billData);

//   useEffect(() => {
//     fetchPatients();
//     fetchTypes();
//     fetchBillData();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
//       if (response.status) setPatients(response.data);
//     } catch (err) {
//       setError("Unable to fetch patients");
//     }
//   };

//   const fetchTypes = async () => {
//     try {
//       const response = await apiUtility.get("/billService/getAll");
//       if (response.status) setTypeList(response.data);
//     } catch (err) {
//       setError("Unable to fetch bill types");
//     }
//   };

//   const fetchBillData = async () => {
//     try {
//       const response = await apiUtility.get(`/bill/getAllBillByHealthCenter/${user.healthCenterId}`);
//       if (response.status) setBillData(response.data);
//     } catch (err) {
//       setError("Unable to fetch bill data");
//     }
//   };

//   const handlePatientChange = (e) => {
//     setSelectedPatient(e.target.value);
//     setFormData((prev) => ({
//       ...prev,
//       PatientID: e.target.value,
//       createdBy: user.userName,
//     }));
//   };

//   const handleTypeChange = (e) => {
//     const selected = e.target.value;
//     const selectedAmounts = typeList
//       .filter((type) => selected.includes(type.typeId))
//       .reduce((total, type) => total + type.amount, 0);

//     setSelectedTypes(selected);
//     setFormData((prev) => ({
//       ...prev,
//       Type: selected,
//       Amount: selectedAmounts,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.PatientID || formData.Type.length === 0) {
//       setError("Please select both patient and at least one bill type");
//       return;
//     }
//     try {
//       console.log('post data', formData);

//       const response = await apiUtility.post("/bill/createBill", {
//         ...formData,
//         CreatedAt: new Date(),
//       });
//       if (response.status) {
//         setError("Bill created successfully");
//         setFormData({
//           PatientID: "",
//           createdBy: user.userName,
//           UpdatedBy: "",
//           Amount: 0,
//           Status: "unpaid",
//           Type: [],
//         });
//         setSelectedPatient("");
//         setSelectedTypes([]);
//         fetchBillData();
//       } else {
//         setError(response.message);
//       }
//     } catch (err) {
//       setError("Unable to create bill");
//     }
//   };

//   const columns = [
//     { label: "Patient ID", field: "_id" },
//     { label: "Patient Name", field: "patientName" },
//     { label: "Patient Email", field: "patientEmail" },
//     { label: "Patient Phone Number", field: "patientPhone" },
//     { label: "Amount", field: "billAmount" },
//     { label: "Status", field: "billStatus" },
//     { label: "Type", field: "billType" },
//     { label: "Created At", field: "patientCreatedAt" },
//   ];

//   return (
//     <>
//       <Box mx={5} my={3}>
//         <Typography variant="h4" fontWeight="bold" mb={3}>
//           Bill Payment Generation
//         </Typography>
//         <Box display="flex" justifyContent="end" mx={5} my={3}>
//           <Box maxWidth="400">
//             <FormControl sx={{ width: 300 }}>
//               <InputLabel id="select-patient-label">Select Patient</InputLabel>
//               <Select
//                 labelId="select-patient-label"
//                 value={selectedPatient}
//                 onChange={handlePatientChange}
//                 label="Select Patient"
//               >
//                 {patients.map((patient) => (
//                   <MenuItem key={patient.patientId} value={patient.patientId}>
//                     {patient.patientName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="select-type-label">Select Type(s)</InputLabel>
//                 <Select
//                   labelId="select-type-label"
//                   multiple
//                   value={selectedTypes}
//                   onChange={handleTypeChange}
//                   renderValue={(selected) =>
//                     selected
//                       .map((typeId) => {
//                         const type = typeList.find((t) => t.typeId === typeId);
//                         return type ? type.typeName : typeId;
//                       })
//                       .join(", ")
//                   }
//                 >
//                   {typeList.map((type) => (
//                     <MenuItem key={type.typeId} value={type.typeId}>
//                       <Checkbox checked={selectedTypes.includes(type.typeId)} />
//                       <ListItemText primary={type.typeName} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Amount"
//                 name="Amount"
//                 value={formData.Amount}
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//           </Grid>
//           <Box mt={4} display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" type="submit">
//               Save Bill
//             </Button>
//           </Box>
//         </form>
//       </Box>
//       <Divider />
//       <Box>
//         <Typography className="p-3" variant="h6" fontWeight="bold">
//           Bill Records
//         </Typography>
//         <ExportTable data={billData} fileName="Bill Records" />
//         <Paper>
//           <AdminTable data={billData} columns={columns} />
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default BillPayment;


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
  Checkbox,
  ListItemText,
  Divider,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

const BillPayment = () => {
  const [patients, setPatients] = useState([]); // List of patients
  const [selectedPatient, setSelectedPatient] = useState(""); // Selected patient
  const [labTests, setLabTests] = useState([]); // Lab test records for the selected patient
  const [formData, setFormData] = useState({
    PatientID: "",
    createdBy: "",
    UpdatedBy: "",
    Amount: 0,
    Status: "unpaid",
    Type: "lab", // Default type for lab tests
    Notes: "", // Notes field
  });
  const [billData, setBillData] = useState([]); // Saved bill records
  const [error, setError] = useState(""); // Error message
  const { user } = useContext(AuthContext); // Authenticated user (cashier)

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
    fetchBillData();
  }, []);

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status) setPatients(response.data);
    } catch (err) {
      setError("Unable to fetch patients");
    }
  };

  // Fetch lab test records for the selected patient
  const fetchLabTests = async (patientId) => {
    try {
      const response = await apiUtility.get(`/labtest/getLabTest/LBT100003`);//`/lab-test/getByPatient/${patientId}`);
      if (response.status) setLabTests(response.data);
    } catch (err) {
      setError("Unable to fetch lab test records");
    }
  };

  // Fetch bill data
  const fetchBillData = async () => {
    try {
      const response = await apiUtility.get(`/bill/getAllBillByHealthCenter/${user.healthCenterId}`);
      if (response.status) setBillData(response.data);
    } catch (err) {
      setError("Unable to fetch bill data");
    }
  };

  // Handle patient selection
  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setSelectedPatient(patientId);
    setFormData((prev) => ({
      ...prev,
      PatientID: patientId,
      createdBy: user.userName,
    }));
    fetchLabTests(patientId); // Fetch lab test records for the selected patient
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Status: e.target.value,
    }));
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Notes: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.PatientID || labTests.length === 0) {
      setError("Please select a patient with lab test records");
      return;
    }
    try {
      const totalAmount = labTests.reduce((sum, test) => sum + test.amount, 0);
      const response = await apiUtility.post("/bill/createBill", {
        ...formData,
        Amount: totalAmount,
        CreatedAt: new Date(),
      });
      if (response.status) {
        setError("Bill created successfully");
        setFormData({
          PatientID: "",
          createdBy: user.userName,
          UpdatedBy: "",
          Amount: 0,
          Status: "unpaid",
          Type: "lab",
          Notes: "",
        });
        setSelectedPatient("");
        setLabTests([]);
        fetchBillData(); // Refresh bill records
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Unable to create bill");
    }
  };

  // Columns for the AdminTable
  const columns = [
    { label: "Patient ID", field: "PatientID" },
    { label: "Patient Name", field: "patientName" },
    { label: "Amount", field: "Amount" },
    { label: "Status", field: "Status" },
    { label: "Type", field: "Type" },
    { label: "Notes", field: "Notes" },
    { label: "Created At", field: "CreatedAt" },
  ];

  return (
    <>
      <Box mx={5} my={3}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Bill Payment Generation
        </Typography>
        <Box display="flex" justifyContent="end" mx={5} my={3}>
          <Box maxWidth="400">
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="select-patient-label">Select Patient</InputLabel>
              <Select
                labelId="select-patient-label"
                value={selectedPatient}
                onChange={handlePatientChange}
                label="Select Patient"
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.patientId} value={patient.patientId}>
                    {patient.patientName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Lab Test Records */}
            <Grid item xs={12}>
              <Typography variant="h6" mb={2}>
                Lab Test Records
              </Typography>
              {labTests.length > 0 ? (
                labTests.map((test) => (
                  <Box key={test.TestID} mb={2}>
                    <Typography>
                      <strong>Test Name:</strong> {test.Results}
                    </Typography>
                    <Typography>
                      <strong>Amount:</strong> 100
                    </Typography>
                    <Typography>
                      <strong>Notes:</strong> {test.Notes}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ alignContent: "center" }} className="text-center">Select patient to see lab tests</Typography>
              )}
            </Grid>
            {/* Status */}
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={formData.Status}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="tenaMedhin">TenaMedhin</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Notes */}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={formData.Notes}
                onChange={handleNotesChange}
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Save Bill
            </Button>
          </Box>
        </form>
      </Box>
      <Divider />
      <Box sx={{ p: 4 }}>
        <Typography className="p-3" variant="h6" fontWeight="bold">
          Bill Records
        </Typography>
        <ExportTable data={billData} fileName="Bill Records" />
        <Paper>
          <AdminTable data={[]} columns={columns} />
        </Paper>
      </Box>
    </>
  );
};

export default BillPayment;