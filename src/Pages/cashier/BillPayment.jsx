import React, { useContext, useState } from "react";
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
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";

const BillPayment = () => {
  const [patient, setData] = useState(null);
  const [error, setError] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    PatientID: selectedPatient,
    createdBy: user.userName,
    UpdatedBy: "",
    Amount: "",
    Status: "unpaid",
    Type: [],
  });

  const fetchData = async () => {
    try {
      console.log('userName', user);
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status == true)
        setData(response.data);
      console.log('user: ', patient);
    } catch (err) {
      setError("Unable to get assigned patient");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      Type: prev.Type.includes(type)
        ? prev.Type.filter((item) => item !== type)
        : [...prev.Type, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('post data', selectedPatient);
      formData.PatientID = selectedPatient;
      console.log('post data', formData);
      // return;      
      if (!formData.PatientID) {
        setError("Please select patient")
      }
      const response = await apiUtility.post("/bill/createBill", {
        ...formData,
        CreatedAt: new Date(),
      });
      console.log("Bill saved:", response);
      if (response) {
        setError(response.message);
        if (response.status == true) {
          setFormData({
            Amount: "",
            Type: [],
          })
          console.log('form data', formData);

        }
      }
    } catch (error) {
      setError("Unable to save bill data");
    }
  };

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
              <Select labelId="select-patient-label" onChange={(e) => setSelectedPatient(e.target.value)}
                label="Select Patient">
                {patient && patient.map(items => {
                  return <MenuItem value={items.patientId}>{items.patientName}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Patient ID Selection */}
            {/* Amount */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                name="Amount"
                type="number"
                value={formData.Amount}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="tenaMedhin">TenaMedhin</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Type */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" mb={1}>
                Type
              </Typography>
              {["pharmacy", "lab", "consultation"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      // checked={formData && formData.Type.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                  }
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                />
              ))}
            </Grid>
          </Grid>
          {/* Submit Button */}
          {error && error}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Save Bill
            </Button>
          </Box>
        </form>
      </Box>
      <Box>
        <Paper>
              
        </Paper>
      </Box>
    </>
  );
};

export default BillPayment;
