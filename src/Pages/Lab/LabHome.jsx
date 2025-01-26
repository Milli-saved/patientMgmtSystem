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

const LabTest = () => {
  const [patients, setPatients] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    PatientID: "",
    CreatedBy: "",
    Type: "",
    Results: "",
    Notes: "",
  });
  const [labTestData, setLabTestData] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPatients();
    fetchTypes();
    fetchLabTestData();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status) setPatients(response.data);
    } catch (err) {
      setError("Unable to fetch patients");
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await apiUtility.get("/billService/getAll");
      if (response.status) setTypeList(response.data);
    } catch (err) {
      setError("Unable to fetch lab test types");
    }
  };

  const fetchLabTestData = async () => {
    try {
      const response = await apiUtility.get(`/labtest/getAllLabTest`);
      if (response.status) setLabTestData(response.data);
    } catch (err) {
      setError("Unable to fetch lab test data");
    }
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    setFormData((prev) => ({
      ...prev,
      PatientID: e.target.value,
      CreatedBy: user.userName,
    }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData((prev) => ({
      ...prev,
      Type: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('reach heree..... in lab test..');
    
    if (!formData.PatientID || !formData.Type) {
      setError("Please select both patient and a lab test type");
      return;
    }
    try {
      const response = await apiUtility.post("/labtest/createLabTest", {
        ...formData,
        CreatedAt: new Date().toISOString(),
      });
      console.log('response from lab test', response);
      
      if (response.status) {
        setError("Lab test created successfully");
        setFormData({
          PatientID: "",
          CreatedBy: user.userName,
          Type: "",
          Results: "",
          Notes: "",
        });
        setSelectedPatient("");
        setSelectedType("");
        fetchLabTestData();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Unable to create lab test");
    }
  };

  const columns = [
    { label: "Patient ID", field: "patientId" },
    { label: "Patient Name", field: "patientName" },
    { label: "DateOfBirth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "subCity", field: "subCity" },
    { label: "Woreda", field: "Woreda" },
    { label: "EmergencyContact", field: "EmergencyContact" },
    { label: "TestID", field: "TestID" },
    { label: "Type", field: "Type" },
    { label: "Results", field: "Results" },
    { label: "Notes", field: "Notes" },
  ];

  return (
    <>
      <Box mx={5} my={3}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Lab Test Management
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-type-label">Select Test Type</InputLabel>
                <Select
                  labelId="select-type-label"
                  value={selectedType}
                  onChange={handleTypeChange}
                  label="Select Test Type"
                >
                  {typeList.map((type) => (
                    <MenuItem key={type.typeId} value={type.typeId}>
                      {type.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Results"
                name="Results"
                value={formData.Results}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Results: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="Notes"
                multiline
                rows={4}
                value={formData.Notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, Notes: e.target.value }))
                }
              />
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Save Lab Test
            </Button>
          </Box>
        </form>
      </Box>
      <Divider />
      <Box>
        <Typography className="p-3" variant="h6" fontWeight="bold">
          Lab Test Records
        </Typography>
        <ExportTable data={labTestData} fileName="Lab Test Records" />
        <Paper>
          <AdminTable data={labTestData} columns={columns} />
        </Paper>
      </Box>
    </>
  );
};

export default LabTest;
