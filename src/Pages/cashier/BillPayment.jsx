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
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

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
    fetchBillData();
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
          // console.log('form data', formData);
          fetchBillData();
        }
      }
    } catch (error) {
      setError("Unable to save bill data");
    }
  };

  const columns = [
    { label: "Patient ID", field: "_id" },
    { label: "Full Name", field: "patientName" },
    { label: "Phone Number", field: "patientPhone" },
    { label: "Email", field: "patientEmail" },
    { label: "Sub city", field: "patientSubCity" },
    { label: "Woreda", field: "patientWoreda" },
    { label: "House Number", field: "patientHouseNumber" },
    { label: "Emergency Contact", field: "patientEmergencyContact" },
    { label: "Bill Amount", field: "billAmount" },
    { label: "Bill Status", field: "billStatus" },
    { label: "Bill Type", field: "billType" },
  ];

  // const actions = [
  //   {
  //     label: "Assign",
  //     color: "gray",
  //     onClick: (row) => {
  //       // console.log("Update clicked for:", row);
  //       setSelectedPatient(row);
  //       assignedFetch();
  //       setAssignPatientModal(true);
  //       { SnackBarShow("Assigned Successfully", false) }
  //     },
  //   },
  // ];

  const [data, setBillDate] = useState(null);
  const fetchBillData = async () => {
    try {
      const response = await apiUtility.get("/bill/getAllBillByHealthCenter/" + user.healthCenterId);
      if (response.status == true)
        setBillDate(response.data);
    } catch (err) {
      setError(err.message);
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
        <Typography className="p-3" variant="h6" fontWeight="bold">Bill Records</Typography>
        <h1 className="m-5 text-3xl font-semibold text-gray-800">
          <ExportTable data={data} fileName="Bill Statement" />
        </h1>
        <Paper>
          <AdminTable data={data} columns={columns} />
        </Paper>
      </Box>
    </>
  );
};

export default BillPayment;
