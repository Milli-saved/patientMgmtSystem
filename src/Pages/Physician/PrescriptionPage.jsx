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
import AdminTable from '../admin/AdminTable';
import ExportTable from '../utils/ExportTable';

const PrescriptionPage = () => {
    const [patient, setPatients] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [duration, setDuration] = useState('');
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchPatients = async () => {
        try {
            // console.log('userName', user);
            const response = await apiUtility.get(`/patient/getAllAssignPatient/${user.userName}`);
            if (response.status == true)
                setPatients(response.data);
            // console.log('user: ', patient);
        } catch (err) { }
    };
    const fetchAppointmentData = async () => {
        try {

            const response = await apiUtility.get(`/prescription/getPrescriptionByDoctor/${user.userName}`);
            if (response.status == true)
                setPrescription(response.data);
            // console.log('setPrescription: ', patient);
        } catch (err) { }
    }

    useEffect(() => {
        fetchPatients();
        fetchAppointmentData();
    }, []);

    const handleCreatePrescription = async () => {
        if (!selectedPatient || !medication || !dosage || !duration || !instructions) {
            toast.error('Please fill all fields');
            return;
        }

        const prescriptionData = {
            PatientID: selectedPatient,
            CreatedBy: user.userName,
            CreatedAt: new Date().toISOString(),
            Medication: medication,
            Dosage: dosage,
            Duration: duration,
            Instructions: instructions,
        };
        setLoading(true);
        try {
            const response = await apiUtility.post('/prescription/createPrescription', prescriptionData); // Replace with your API endpoint
            if (response)
                if (response.status == true) {
                    toast.success('Prescription created successfully');
                    // Optionally reset the form
                    setSelectedPatient('');
                    setMedication('');
                    setDosage('');
                    setDuration('');
                    setInstructions('');
                    fetchAppointmentData();
                }
                else {
                    toast.error(response.message);
                }

        } catch (error) {
            toast.error('Failed to create prescription');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { label: "Patient ID", field: "_id" },
        { label: "Prescription ID", field: "PrescriptionID" },
        { label: "Full Name", field: "patientName" },
        { label: "Email", field: "patientEmail" },
        { label: "Woreda", field: "patientWoreda" },
        { label: "Sub City", field: "patientSubCity" },
        { label: "Phone Number", field: "patientPhone" },
        { label: "Medication", field: "Medication" },
        { label: "Dosage", field: "Dosage" },
        { label: "Duration", field: "Duration" },
        { label: "Instructions", field: "Instructions" },
    ];

    return (
        <>
            <Container maxWidth="sm">
                <Toaster position="top-right" />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Create Prescription
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

                {/* Medication */}
                <Box mb={3}>
                    <TextField
                        label="Medication"
                        fullWidth
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                    />
                </Box>

                {/* Dosage */}
                <Box mb={3}>
                    <TextField
                        label="Dosage"
                        fullWidth
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                    />
                </Box>

                {/* Duration */}
                <Box mb={3}>
                    <TextField
                        label="Duration"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Box>

                {/* Instructions */}
                <Box mb={3}>
                    <TextField
                        label="Instructions"
                        fullWidth
                        multiline
                        rows={3}
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </Box>

                {/* Submit Button */}
                <Box textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreatePrescription}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Prescription'}
                    </Button>
                </Box>
            </Container>
            <Divider />
            <Container>
                <Box>
                    <Box display="flex" justifyContent="start" my={3}>
                        <Typography variant="h6">Prescription</Typography>
                    </Box>
                    <button className="py-3 text-white">
                        <FaDownload className="mr-2" />
                        <ExportTable data={prescription && prescription} fileName="prescription List" />
                    </button>
                    <AdminTable columns={columns} data={prescription} />
                </Box>
            </Container>
        </>
    );
};

export default PrescriptionPage;
