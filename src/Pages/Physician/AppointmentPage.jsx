import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { apiUtility } from '../../components/repo/api';
import { AuthContext } from '../../contexts/auth';
import { FaDownload } from 'react-icons/fa';
import ExportTable from '../utils/ExportTable';
import AdminTable from '../admin/AdminTable';

const AppointmentPage = () => {
  const [patient, setData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [appoint, setAppointmentData] = useState(null);


  const fetchData = async () => {
    try {
      console.log('userName', user);
      const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
      if (response.status == true)
        setData(response.data);
      console.log('user: ', patient);
    } catch (err) { }
  }

  const fetchAppointmentData = async () => {
    try {

      const response = await apiUtility.get(`/appointment/getAppointmentByDoctor/${user.userName}`);
      if (response.status == true)
        setAppointmentData(response.data);
      console.log('setAppointmentData: ', patient);
    } catch (err) { }
  }

  useEffect(() => {
    fetchData();
    fetchAppointmentData();
  }, []);

  const handleCreateAppointment = async () => {
    if (!selectedPatient || !appointmentDate || !reason) {
      toast.error('Please fill all fields');
      return;
    }

    const appointmentData = {
      patientID: selectedPatient,
      appointmentDate,
      reason,
      status: 'scheduled',
      createdBy: user.userName,
      createdAt: new Date().toISOString(),
    };

    console.log('patient data', appointmentData);

    setLoading(true);

    try {
      const result = await apiUtility.post('/appointment/createAppointment', appointmentData); // Replace with your API endpoint
      if (result) {
        if (result.status == true) {
          toast.success('Appointment created successfully');
          // Optionally reset the form
          setSelectedPatient('');
          setAppointmentDate('');
          setReason('');
          fetchAppointmentData();
          fetchData();
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { label: "Patient ID", field: "_id" },
    { label: "Appointment ID", field: "appointmentID" },
    { label: "Full Name", field: "patientName" },
    { label: "Email", field: "patientEmail" },
    { label: "Woreda", field: "patientWoreda" },
    { label: "Sub City", field: "patientSubCity" },
    { label: "Phone Number", field: "patientPhone" },
    { label: "Appointment Date", field: "appointmentDate" },
    { label: "reason", field: "reason" },
    { label: "Status", field: "status" },
  ];

  return (
    <>
      <Container maxWidth="sm">
        <Toaster position="top-right" />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create Appointment
        </Typography>

        {/* Select Patient */}
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

        {/* Appointment Date */}
        <Box mb={3}>
          <TextField
            label="Appointment Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </Box>

        {/* Reason */}
        <Box mb={3}>
          <TextField
            label="Reason"
            fullWidth
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Box>

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAppointment}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Appointment'}
          </Button>
        </Box>
      </Container>
      <Divider sx={{pt:5}}/>
      <Container>
        <Box>
          <Box display="flex" justifyContent="start" my={3}>
            <Typography variant="h6">Appointments</Typography>
          </Box>
          <button className="py-3 text-white">
            <FaDownload className="mr-2" />
            <ExportTable data={appoint && appoint} fileName="Appointment List" />
          </button>
          <AdminTable columns={columns} data={appoint} />
        </Box>
      </Container>
    </>
  );
};

export default AppointmentPage;
