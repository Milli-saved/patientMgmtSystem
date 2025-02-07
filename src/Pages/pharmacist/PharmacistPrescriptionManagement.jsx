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
    Divider,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import GivePrescriptionByPharmacist from "./GivePrescriptionByPharmacist";
import ExportTable from "../utils/ExportTable";

const PharmacistPrescriptionManagement = () => {
    const [patients, setPatients] = useState([]); // List of patients
    const [selectedPatient, setSelectedPatient] = useState(null); // Selected patient
    const [prescriptions, setPrescriptions] = useState([]); // Prescriptions for the selected patient
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error message
    const { user } = useContext(AuthContext); // Authenticated user (pharmacist)
    const [assignPatientModal, setAssignPatientModal] = useState(false);
    const [data, setData] = useState(null);
    const [approvedPrescription, setApprovedPrescription] = useState([]);

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatients();
        fetchApprovedPrescription();
    }, []);

    // Fetch all patients
    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await apiUtility.get(`/prescription/getPatientForPharamcist/${user.healthCenterId}`);
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
            const response = await apiUtility.get(`/prescription/getAllPendingPatientForPrescriptionForPharmacist/${patientId}`);
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

    // get approved prescription
    const fetchApprovedPrescription = async () => {
        try {
            const result = await apiUtility.get(`/prescription/getApprovedPrescription/${user.healthCenterId}`);
            if (result && result.status)
                setApprovedPrescription(result.data);
            else
                setApprovedPrescription([])
        } catch (error) {
            setError("An error occurred while fetching approved prescriptions");
        }
    }

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
    const handleSave = async (PrescriptionID) => {
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

    const handlePatientChange = (e) => {
        const patientId = e.target.value;
        setSelectedPatient(patientId);
        fetchPrescriptions(patientId);
    };

    const columns = [
        { label: "Patient ID", field: "patientId" },
        { label: "Full Name", field: "patientName" },
        { label: "Date of birth", field: "DateOfBirth" },
        { label: "Gender", field: "Gender" },
        { label: "City", field: "City" },
        { label: "Phone Number", field: "phoneNumber" },
        { label: "Medication", field: "Medication" },
        { label: "Dosage", field: "Dosage" },
        { label: "Duration", field: "Duration" },
        { label: "Instructions", field: "Instructions" },
        { label: "Status", field: "Status" },
        { label: "PrescriptionID", field: "PrescriptionID" },
        { label: "Prescription By Doctor Name", field: "createrName" }
    ];
    const columns1 = [
        { label: "Patient ID", field: "_id" },
        { label: "Full Name", field: "patientName" },
        { label: "Gender", field: "Gender" },
        { label: "Phone Number", field: "patientPhone" },
        { label: "Sub City", field: "patientSubCity" },
        { label: "Medication", field: "Medication" },
        { label: "Dosage", field: "Dosage" },
        { label: "Duration", field: "Duration" },
        { label: "Instructions", field: "Instructions" },
        { label: "Status", field: "status" },
        { label: "PrescriptionID", field: "PrescriptionID" },
        { label: "Prescription By Doctor Name", field: "createrName" }
    ];
    const actions = [
        {
            label: "Issued",
            color: "green",
            onClick: (row) => {
                console.log("Update clicked for:", row);
                setData(row);
                setAssignPatientModal(true);
                fetchPrescriptions();
                fetchApprovedPrescription();
            },
        }
    ];
    const closeAssignModal = () => {
        setAssignPatientModal(false);
        setSelectedPatient({});
        fetchPrescriptions();
        fetchPatients();
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
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="select-patient-label">Select Patient</InputLabel>
                            <Select
                                labelId="select-patient-label"
                                value={selectedPatient}
                                onChange={handlePatientChange}
                                label="Select Patient"
                            >
                                {patients.map((patient) => (
                                    <MenuItem key={patient._id} value={patient._id}>
                                        {patient.patientName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {/* Prescription Table */}
                {(prescriptions &&
                    selectedPatient) ?
                    (
                        <AdminTable columns={columns} data={prescriptions} actions={actions} />
                    ) : <Typography className="m-auto text-center" variant="h6" sx={{ pt: 10 }}>Please select patient</Typography>}
            </Box>
            {assignPatientModal && <GivePrescriptionByPharmacist
                onClose={closeAssignModal}
                patientInfo={data}
            />}
            <Box sx={{ m: 2 }}>
                <Typography sx={{ p: 2 }} variant="h6">Issued Prescription</Typography>
                {/* <Divider /> */}
                <ExportTable data={approvedPrescription} fileName="Approved (Issued) prescription" />
                <Divider sx={{ p: 1 }} />
                <AdminTable columns={columns1} data={approvedPrescription && approvedPrescription} />
            </Box>
        </>
    );
};

export default PharmacistPrescriptionManagement;