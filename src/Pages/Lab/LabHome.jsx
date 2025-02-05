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
  Divider,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";

const LabTest = () => {
  const [patients, setPatients] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [data, setLabData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState(""); // Additional notes for the lab test
  const [result, setResult] = useState(""); // Result of the lab test

  useEffect(() => {
    fetchPatients();
    fetchData();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/labtest/getLabTestRequestLB`);
      if (response.status)
        setPatients(response.data);
      else setPatients([]);
    } catch (err) {
      console.log('errorrrrr', err);
      setError("Unable to fetch patients");
    }
  };

  const fetchPatientLabTests = async (testId) => {
    try {
      const response = await apiUtility.get(`/labtest/getLabTest/${testId}`);
      console.log('pendingsssssss', response);
      if (response.status) setLabTests(response.data);
    } catch (err) {
      setError("Unable to fetch lab tests for the selected patient");
    }
  };

  const handlePatientChange = (e) => {
    const testId = e.target.value;
    setSelectedPatient(testId);
    fetchPatientLabTests(testId);

  };

  const handleSubmit = async () => {
    try {
      const postData = {
        Notes: notes,
        Results: result,
        CreatedBy: user.userName,
        status: "Completed"
      }
      const requests = await apiUtility.post(`/labtest/createLabTest/${selectedPatient}`, postData);
      console.log('requests', requests);

      if (requests.status) {
        setError("Lab tests updated successfully");
        fetchPatientLabTests();
        fetchPatients();
        setNotes("");
        setResult("");
        setLabTests([]);
        fetchData();
        setSelectedPatient();
      } else {
        setError("Unable to update lab tests");
      }
    } catch (err) {
      setError("Unable to update lab tests");
    }
  };

  const columns = [
    { label: "Patient ID", field: "_id" },
    { label: "lab Tests", field: "Type" },
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
    { label: "Test ID", field: "TestID" },
  ];

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setError("");
  };
  const handleResultChange = (e) => {
    setResult(e.target.value);
    setError("");
  };

  const fetchData = async () => {
    try {
      const response = await apiUtility.get(`/labtest/getLabTestRequestApproved/${user.userName}`);
      if (response.status) setLabData(response.data);
    } catch (err) {
      setError("Unable to fetch lab tests for the selected patient");
    }
  }

  return (
    <>
      <Box mx={5} my={3}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Lab Test Management
        </Typography>
        <Box display="flex" justifyContent="start" mx={5} my={3}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="select-patient-label">Select Patient</InputLabel>
            <Select
              labelId="select-patient-label"
              value={selectedPatient}
              onChange={handlePatientChange}
              label="Select Patient"
            >
              {patients.map((patient) => (
                <MenuItem key={patient.TestID} value={patient.TestID}>
                  {patient.patientName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />
        <Box my={3}>
          <Paper>
            <Typography variant="h5" fontWeight="bold" mb={3} p={3}>Lab Tests</Typography>
            {labTests.length > 0 ? (
              <>
                <AdminTable data={labTests} columns={columns} />
              </>
            ) : (
              <Typography className="text-center p-5">No Lab test found</Typography>
            )}
          </Paper>
        </Box>
        <Box>
          {error && error}
        </Box>
        {/* Additional Notes */}
        <Grid item xs={12} sx={{ pb: 4 }}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={4}
            value={notes}
            onChange={handleNotesChange}
          />
        </Grid>
        {/* Additional Notes */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Result"
            multiline
            rows={4}
            value={result}
            onChange={handleResultChange}
          />
        </Grid>
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Lab Tests
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}> Updated Lab Test</Typography>
        <AdminTable data={data} columns={columns} />
      </Box>
    </>
  );
};

export default LabTest;
