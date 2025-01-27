import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";

const PharmacistPrescriptionManagement = () => {
    const [patients, setPatients] = useState([]); // List of patients
    const [selectedPatient, setSelectedPatient] = useState(null); // Selected patient
    const [prescriptions, setPrescriptions] = useState([]); // Prescriptions for the selected patient
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error message
    const { user } = useContext(AuthContext); // Authenticated user (pharmacist)

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    // Fetch all patients
    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await apiUtility.get(`/patient/getAllActivePatient/${user.healthCenterId}`);
            if (response.status) {
                setPatients(response.data);
            } else {
                setError("Unable to fetch patients");
            }
        } catch (err) {
            setError("An error occurred while fetching patients");
        } finally {
            setLoading(false);
        }
    };

    // Fetch prescriptions for the selected patient
    const fetchPrescriptions = async (patientId) => {
        try {
            setLoading(true);
            const response = await apiUtility.get(`/prescription/getByPatient/${patientId}`);
            if (response.status) {
                setPrescriptions(response.data);
            } else {
                setError("Unable to fetch prescriptions");
            }
        } catch (err) {
            setError("An error occurred while fetching prescriptions");
        } finally {
            setLoading(false);
        }
    };

    // Handle patient selection
    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient.patientId); // Fetch prescriptions for the selected patient
    };

    // Handle prescription status change
    const handleStatusChange = (prescriptionId, newStatus) => {
        setPrescriptions((prev) =>
            prev.map((prescription) =>
                prescription.prescriptionId === prescriptionId
                    ? { ...prescription, status: newStatus }
                    : prescription
            )
        );
    };

    // Handle notes change
    const handleNotesChange = (prescriptionId, newNotes) => {
        setPrescriptions((prev) =>
            prev.map((prescription) =>
                prescription.prescriptionId === prescriptionId
                    ? { ...prescription, notes: newNotes }
                    : prescription
            )
        );
    };

    // Save updated prescriptions
    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await apiUtility.post("/prescription/updateMultiple", {
                prescriptions,
                updatedBy: user.userName,
            });
            if (response.status) {
                setError("Prescriptions updated successfully");
                fetchPrescriptions(selectedPatient.patientId); // Refresh prescriptions
            } else {
                setError(response.message || "Failed to update prescriptions");
            }
        } catch (err) {
            setError("An error occurred while updating prescriptions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box mx={5} my={3}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Pharmacist Prescription Management
                </Typography>
                {loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}
                {/* Patient List */}
               <Box display="flex" justifyContent="end" mx={5} my={3}>
                        <Box maxWidth="400">
                          <FormControl  sx={{ width: 300 }}>
                            <InputLabel  id="select-patient-label">Select Patient</InputLabel>
                            <Select 
                              labelId="select-patient-label"
                              value={selectedPatient}
                            //   onChange={handlePatientChange}
                              label="Select Patient"
                            >
                              {patients.map((patient) => (
                                <MenuItem  key={patient.patientId} value={patient.patientId}>
                                  {patient.patientName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                {/* Prescription Table */}
                {selectedPatient && (
                    <Box>
                        <Typography variant="h6" mb={2}>
                            Prescriptions for {selectedPatient.patientName}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Medication</TableCell>
                                        <TableCell>Dosage</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {prescriptions.map((prescription) => (
                                        <TableRow key={prescription.prescriptionId}>
                                            <TableCell>{prescription.medication}</TableCell>
                                            <TableCell>{prescription.dosage}</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        value={prescription.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(prescription.prescriptionId, e.target.value)
                                                        }
                                                    >
                                                        <MenuItem value="pending">Pending</MenuItem>
                                                        <MenuItem value="dispensed">Dispensed</MenuItem>
                                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    value={prescription.notes}
                                                    onChange={(e) =>
                                                        handleNotesChange(prescription.prescriptionId, e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default PharmacistPrescriptionManagement;