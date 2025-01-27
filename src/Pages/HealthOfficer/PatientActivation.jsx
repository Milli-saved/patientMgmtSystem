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
  Modal,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import { Container } from "postcss";
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

const PatientActivation = () => {
  const [patients, setPatients] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPatients();
    fetchActivePatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllInactivePatient/${user.healthCenterId}`);
      if (response.status) setPatients(response.data);
    } catch (err) {
      setError("Unable to fetch patients");
    }
  };

  const fetchActivePatients = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllActivePatient/${user.healthCenterId}`);
      if (response.status) setActivePatients(response.data);
    } catch (err) {
      setError("Unable to fetch Active patients");
    }
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !password) {
      setError("Please select a patient and enter a password");
      return;
    }
    try {
      const response = await apiUtility.post("/patient/Activatepatient", {
        patientId: selectedPatient,
        password,
      });
      if (response.status) {
        setSuccessMessage("Patient activated successfully");
        setPassword("");
        setSelectedPatient("");
        fetchPatients();
        fetchActivePatients();
      } else {
        setError(response.message || "Failed to activate patient");
      }
    } catch (err) {
      setError("Unable to activate patient");
    }
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

  const [updateDate, setUpdateDate] = useState(null);
  const [update, setUpdate] = useState(false);
  const [newpassword, setNewPassword] = useState(null);

  const actions = [
    {
      label: "Reset Password",
      color: "green",
      onClick: (row) => {
        console.log("reset clicked for:", row.PatientID);
        setUpdateDate(row.PatientID);
        setUpdate(true);
        setError("");
      },
    },
    {
      label: "Deactivate",
      color: "red",
      onClick: async (row) => {
        try {
          const response = await apiUtility.get("/patient/deactivate/" + row.PatientID);
          console.log('deactivate response; ', response);
          if (response.status == true) {
            setSelectedPatient("");
            fetchPatients();
            fetchActivePatients();
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError(err.message);
        }
      },
    },
  ];
  const onclose = () => {
    setUpdate(false);
  }
  const handleReset = async (e) => {
    e.preventDefault();
    if (!updateDate || !newpassword) {
      alert("Please select a patient and enter a password");
      return;
    }
    try {
      const response = await apiUtility.post("/patient/resetPassword", {
        userName: updateDate,
        password: newpassword,
      });
      if (response.status) {
        alert("Patient activated successfully");
        setPassword("");
        setSelectedPatient("");
        fetchPatients();
        fetchActivePatients();
        setUpdate(false);
      } else {
        setError(response.message || "Failed to activate patient");
      }
    } catch (err) {
      setError("Unable to activate patient");
    }
  };
  return (
    <>
      <Box mx={5} my={3}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Patient Activation for patient dashboard.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Activate Patient
            </Button>
          </Box>
        </form>
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
      <Box>
        <ExportTable data={activePatients} fileName="Active Patient" />
      </Box>
      <Box>
        <AdminTable data={activePatients && activePatients} columns={columns} actions={actions} />
      </Box>
      {update &&
        <Modal open={update} onClose={onclose} aria-labelledby="add-health-center-title"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <form onSubmit={handleReset}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="newpassword"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box mt={4} p={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" type="submit">
                  Reset password
                </Button>
                <Button className="p-2"
                  onClick={onclose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>}
    </>
  );
};

export default PatientActivation;
