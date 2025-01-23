/*
// import React from "react";

// const PhysicianHome = () => {
//   return (
//     <>
//       <div className="flex justify-end mx-20 my-10">
//         <div className="flex flex-col items-end max-w-xl">
//           <label
//             htmlFor="userId"
//             className="block mb-2 text-lg font-medium text-blue-700"
//           >
//             Select Patient
//           </label>
//           <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
//             <option>Patient one</option>
//             <option>Patient Two</option>
//             <option>Patient Three</option>
//           </select>
//         </div>
//       </div>
//       <div>
//         <h1 className="m-5 text-5xl font-semibold text-gray-800">
//           Medical Information
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <div className="flex flex-col items-start mt-5">
//             <label
//               htmlFor="userId"
//               className="block mb-2 text-lg font-medium text-blue-700"
//             >
//               Blood Group
//             </label>
//             <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
//               <option>A</option>
//               <option>B</option>
//               <option>AB</option>
//               <option>O</option>
//             </select>
//           </div>
//           <div className="flex flex-col items-start mt-5">
//             <label
//               htmlFor="userId"
//               className="block mb-2 text-lg text-blue-700 font-medium"
//             >
//               Current Medications
//             </label>
//             <input
//               id="healtcenterName"
//               name="healtcenterName"
//               type="text"
//               autoComplete="Current Password"
//               placeholder="Health Center Name"
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             />
//           </div>
//           <div className="flex flex-col items-start mt-5">
//             <label
//               htmlFor="userId"
//               className="block mb-2 text-lg text-blue-700 font-medium"
//             >
//               Primary Doctor
//             </label>
//             <input
//               id="healtcenterName"
//               name="healtcenterName"
//               type="text"
//               autoComplete="Current Password"
//               placeholder="Health Center Name"
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <div className="flex flex-col items-start mt-5">
//             <label
//               htmlFor="userId"
//               className="block mb-2 text-lg font-medium text-blue-700"
//             >
//               Admission Date
//             </label>
//             <input
//               id="healtcenterName"
//               name="healtcenterName"
//               type="date"
//               autoComplete="Current Password"
//               placeholder="Health Center Name"
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             />
//           </div>
//           <div className="flex flex-col items-start mt-5">
//             <label
//               htmlFor="userId"
//               className="block mb-2 text-lg text-blue-700 font-medium"
//             >
//               Discharge Date
//             </label>
//             <input
//               id="healtcenterName"
//               name="healtcenterName"
//               type="date"
//               autoComplete="Current Password"
//               placeholder="Health Center Name"
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end m-20">
//           <button className="py-2 px-5 bg-blue-900 text-white rounded-xl mx-5 ">
//             Save
//           </button>
//           <button
//             className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl mx-5 "
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PhysicianHome;

*/
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
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import { FaDownload } from "react-icons/fa";
import ExportTable from "../utils/ExportTable";

const PhysicianHome = () => {
  // fetch patient info. 
  const [patient, setData] = useState(null);
  const [medical, setMedialData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [error, setError] = useState("");
  // const { token, user } = useContext(AuthContext);
  // const userName = user.userName;
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      console.log('userName', user);
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status == true)
        setData(response.data);
      console.log('user: ', patient);

      const result = await apiUtility.get(`/doctor/getMedicalRecordByDoctor/${user.userName}`);
      if (result.status == true)
        setMedialData(result.data);
      console.log('setMedialData: ', patient);

    } catch (err) {
      setError("Unable to get assigned patient");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [patientData, setPatientData] = useState({
    "PatientId": selectedPatient,
    "PhysicianId": user.userName,
    "Description": "",
    "Treatment": "",
    "Note": "",
    "Allergies": ""
  });

  const handleChange = (key, value) => {
    setPatientData((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('patientData: ', patientData);
    try {
      const response = await apiUtility.post("/doctor/createMedicalRecord", patientData);
      if (response) {
        setError(response.message);
        if (response.status == true) {
          setPatientData({
            "PatientId": selectedPatient,
            "PhysicianId": user.userName,
            "Description": "",
            "Treatment": "",
            "Note": "",
            "Allergies": ""
          });
          setSelectedPatient();
          fetchData();
        }
      } else {
        setError("Unable to save patient medical history");
      }
    } catch (e) {
      setError("Unable to create patient medical history");
    }
  }

  const columns = [
    { label: "Patient ID", field: "patientId" },
    { label: "Record ID", field: "recordId" },
    { label: "Full Name", field: "patientName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Description", field: "Description" },
    { label: "Treatment", field: "Treatment" },
    { label: "Note", field: "Note" },
    { label: "Allergies", field: "Allergies" },
  ];

  const actions = [
    // {
    //   label: "Update",
    //   color: "green",
    //   onClick: (row) => {
    //     console.log("Update clicked for:", row);
    //     setUpdateDate(row);
    //     setUpdate(true);
    //     setError("");
    //   },
    // },
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
    <Box>
      {/* Patient Selection */}
      <Box display="flex" justifyContent="end" mx={5} my={3}>
        <Box maxWidth="400">
          <FormControl  sx={{width:300}}>
            <InputLabel id="select-patient-label">Select Patient</InputLabel>
            <Select labelId="select-patient-label" onChange={(e) => setSelectedPatient(e.target.value)}
              label="Select Patient">
              {patient && patient.map(items => {
                return <MenuItem value={items.patientId}>{items.patientName}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box mx={5} my={3}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Medical Information
          </Typography>
          <Grid container spacing={3}>
            {/* Patient ID */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Patient ID"
                value={selectedPatient && selectedPatient}
                variant="outlined"
                disabled="true"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                value={patientData.Description}
                variant="outlined"
                onChange={(e) => handleChange('Description', e.target.value)}
              />
            </Grid>

            {/* Treatment */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Treatment"
                value={patientData.Treatment}
                variant="outlined"
                onChange={(e) => handleChange('Treatment', e.target.value)}
              />
            </Grid>

            {/* Note */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Note"
                value={patientData.Note}
                variant="outlined"
                onChange={(e) => handleChange('Note', e.target.value)}
              />
            </Grid>

            {/* Allergies */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Allergies"
                value={patientData.Allergies}
                variant="outlined"
                onChange={(e) => handleChange('Allergies', e.target.value)}
              />
            </Grid>

          </Grid>
          {error && <Typography>{error}</Typography>}
          <Button sx={{ mt: 3 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Paper>
        <Box>
          <Box display="flex" justifyContent="start" my={3}>
            <Typography variant="h6">Medical Records</Typography>
          </Box>
          {/* <Box sx={{ height: 400, overflow: 'auto' }}> */}
          <button className="px-5 py-3 text-white">
            <FaDownload className="mr-2" />
            <ExportTable data={medical && medical} fileName="Medical Record List" />
          </button>
          {/* </Box> */}
          <AdminTable columns={columns}  data={medical} />
        </Box>
      </Box>
    </Box>
  );
};

export default PhysicianHome;
