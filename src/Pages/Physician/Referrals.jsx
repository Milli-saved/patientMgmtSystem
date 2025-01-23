// import React, { useState } from "react";
// import Table from "../../components/Table";
// import AddNewRefferal from "./AddNewRefferal";

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

// const Referrals = () => {
//   const [addNewRefferalModal, setAddNewRefferalModal] = useState(false);

//   const closeModal = () => {
//     setAddNewRefferalModal(false);
//   };
//   return (
//     <>
//       <div className="mx-10 flex justify-between items-center">
//         <h1 className="m-5 text-5xl font-semibold text-gray-800">Referrals</h1>
//         <div>
//           <button
//             onClick={() => setAddNewRefferalModal(true)}
//             className="text-black bg-green-400 hover:bg-green-700 hover:text-white rounded-lg text-sm p-5 h-8 ms-auto inline-flex justify-center items-center"
//           >
//             Create New Refferal
//           </button>
//         </div>
//       </div>
//       <Table data={data} />
//       {addNewRefferalModal && (
//         <AddNewRefferal onClose={closeModal} isOpen={addNewRefferalModal} />
//       )}
//     </>
//   );
// };

// export default Referrals;

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Tab,
  Tabs,
  Paper,
  Grid,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";

const Referrals = () => {
  const { user } = useContext(AuthContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [incomingReferrals, setIncomingReferrals] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [error, setError] = useState("");

  const fetchInitialData = async () => {
    try {
      const patientResponse = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      const doctorResponse = await apiUtility.get(`/doctor/getAllDoctors`);
      const referralResponse = await apiUtility.get(`/referral/getOutgoingReferrals/${user.userName}`);
      const incomingReferralResponse = await apiUtility.get(`/referral/getIncomingReferrals/${user.userName}`);

      setPatients(patientResponse.data || []);
      setDoctors(doctorResponse.data || []);
      setReferrals(referralResponse.data || []);
      setIncomingReferrals(incomingReferralResponse.data || []);
    } catch (err) {
      setError("Error fetching initial data");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCreateReferral = async () => {
    try {
      const payload = {
        patientId: selectedPatient,
        referredToDoctorId: selectedDoctor,
        referredByDoctorId: user.userName,
      };
      const response = await apiUtility.post("/referral/create", payload);
      if (response.status) {
        setError("");
        setSelectedPatient("");
        setSelectedDoctor("");
        fetchInitialData();
      } else {
        setError("Failed to create referral");
      }
    } catch (err) {
      setError("Error creating referral");
    }
  };

  const referralColumns = [
    { label: "Referral ID", field: "referralId" },
    { label: "Patient Name", field: "patientName" },
    { label: "Referred To", field: "referredToDoctorName" },
    { label: "Referred By", field: "referredByDoctorName" },
    { label: "Date", field: "date" },
  ];

  const incomingReferralColumns = [
    { label: "Referral ID", field: "referralId" },
    { label: "Patient Name", field: "patientName" },
    { label: "Referred By", field: "referredByDoctorName" },
    { label: "Date", field: "date" },
  ];

  return (
    <Box>
      <Tabs value={tabIndex} centered onChange={handleTabChange}>
        <Tab label="Make Referral" />
        <Tab label="Get Referrals" />
      </Tabs>

      {tabIndex === 0 && (
        <Box mx={5} my={3}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Make Referral
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Patient</InputLabel>
                  <Select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
                    {patients.map((patient) => (
                      <MenuItem key={patient.patientId} value={patient.patientId}>
                        {patient.patientName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Doctor</InputLabel>
                  <Select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.doctorName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
            <Box display="flex" justifyContent="end" mt={3}>
              <Button variant="contained" onClick={handleCreateReferral}>
                Save Referral
              </Button>
            </Box>
          </Paper>

          <Box mt={3}>
            <Typography variant="h6">Outgoing Referrals</Typography>
            <AdminTable columns={referralColumns} data={referrals} />
          </Box>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box mx={5} my={3}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Incoming Referrals
          </Typography>
          <AdminTable columns={incomingReferralColumns} data={incomingReferrals} />
        </Box>
      )}
    </Box>
  );
};

export default Referrals;
