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
  const [selectedLabTest, setSelectedLabTest] = useState(""); // Selected lab test
  const [notes, setNotes] = useState(""); // Additional notes for the lab test
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const { user } = useContext(AuthContext); // Authenticated user (doctor)

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllActivePatient/${user.healthCenterId}`);
      if (response.status) setPatients(response.data);
    } catch (err) {
      setError("Unable to fetch patients");
    }
  };

  // Fetch lab tests (assuming an endpoint exists)
  const fetchLabTests = async () => {
    try {
      const response = await apiUtility.get("/billService/getAll");
      if (response.status) setLabTests(response.data);
    } catch (err) {
      setError("Unable to fetch lab tests");
    }
  };

  // Handle patient selection
  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  // Handle lab test selection
  const handleLabTestChange = (e) => {
    setSelectedLabTest(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedLabTest) {
      setError("Please select a patient and a lab test");
      return;
    }
    try {
      const response = await apiUtility.post("/lab-test-request/create", {
        patientId: selectedPatient,
        labTestId: selectedLabTest,
        notes,
        requestedBy: user.userId, // Assuming the doctor's ID is stored in `userId`
      });
      if (response.status) {
        setSuccessMessage("Lab test request submitted successfully");
        setSelectedPatient("");
        setSelectedLabTest("");
        setNotes("");
      } else {
        setError(response.message || "Failed to submit lab test request");
      }
    } catch (err) {
      setError("Unable to submit lab test request");
    }
  };

  const columns = [
    { label: "Patient ID", field: "patientId" },
    { label: "Record ID", field: "recordId" },
    { label: "Full Name", field: "patientName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "subCity", field: "subCity" },
    { label: "Woreda", field: "Woreda" },
    { label: "House Number", field: "houseNumber" },
    { label: "Emergency Contact", field: "EmergencyContact" },
    { label: "Email", field: "Email" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Description", field: "Description" },
    { label: "Treatment", field: "Treatment" },
    { label: "Note", field: "Note" },
    { label: "Allergies", field: "Allergies" },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
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
                  value={selectedLabTest}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={notes}
                onChange={handleNotesChange}
              />
            </Grid>
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
        <Tab label="Pending lab test request" />
        <Tab label="Updated Lab test" />
      </Tabs>
      {tabIndex === 0 &&
        <Box sx={{ m: "16", p: 5 }}>
          <Typography variant="h5">
            Pending lab test requests
          </Typography>
          <Typography>
            <ExportTable data={[]} fileName="Pending lab test request"></ExportTable>
          </Typography>
          <AdminTable data={[]} columns={columns} />
        </Box>}
      {tabIndex === 1 &&
        <Box sx={{ m: "16", p: 5 }}>
          <Typography variant="h5">
            Updated lab test requests
          </Typography>
          <Typography>
            <ExportTable data={[]} fileName="Updated lab test request"></ExportTable>
          </Typography>
          <AdminTable data={[]} columns={columns} />
        </Box>}
    </>
  );
};

export default LabTestRequest;