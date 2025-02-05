import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import ExportTable from "../utils/ExportTable";
import AdminTable from "../admin/AdminTable";

const UpdateCardBill = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [labTests, setLabTests] = useState(null);
    const [billData, setBillData] = useState([]);
    const [status, setStatus] = useState("unpaid");
    const { user } = useContext(AuthContext);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPatients();
        fetchBillData();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await apiUtility.get(`/patient/getCardIssuePatient/${user.healthCenterId}`);
            if (response.status) setPatients(response.data);
        } catch (err) {
            setError("Unable to fetch patients");
        }
    };

    const fetchLabTests = async (patientId) => {
        try {
            const response = await apiUtility.get(`/bill/getBillByPatient/${patientId}`);
            console.log('lab test', response.data[0].TypeDetails);

            if (response.status) setLabTests(response.data[0]);
        } catch (err) {
            setError("Unable to fetch lab test records");
        }
    };

    const fetchBillData = async () => {
        try {
            const response = await apiUtility.get(`/bill/getAllBillByHealthCenter/${user.healthCenterId}`);
            if (response.status) setBillData(response.data);
        } catch (err) {
            setError("Unable to fetch bill data");
        }
    };



    const handlePatientChange = (e) => {
        const patientId = e.target.value;
        setSelectedPatient(patientId);
        fetchLabTests(patientId);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleUpdateStatus = async () => {
        try {
            const updatedBill = { patientId: selectedPatient, status: status, physician: user.userName };
            const result = await apiUtility.post("/bill/updateBillPayment", updatedBill);
            if (result && result.status) {
                setError("Status updated successfully");
                fetchBillData();
                fetchPatients();
                setLabTests(null);
                setSelectedPatient("");
            } else {
                setError("Unable to update status");
            }
        } catch (err) {
            setError("Unable to update status");
        }
    };

    const totalAmount = labTests
        && labTests.Amount;

    const columns = [
        { label: "Patient ID", field: "_id" },
        { label: "billAmount", field: "billAmount" },
        { label: "billStatus", field: "billStatus" },
        { label: "Full Name", field: "patientName" },
        { label: "Phone Number", field: "patientPhone" },
        { label: "Email", field: "patientEmail" },
        { label: "Sub city", field: "patientSubCity" },
        { label: "Woreda", field: "patientWoreda" },
        { label: "House Number", field: "patientHouseNumber" },
        { label: "Emergency Contact", field: "patientEmergencyContact" },
    ];

    return (
        <>
            <Box mx={5} my={3}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Bill Record
                </Typography>

                <FormControl fullWidth>
                    <InputLabel>Select Patient</InputLabel>
                    <Select value={selectedPatient} onChange={handlePatientChange}>
                        {patients.map((patient) => (
                            <MenuItem key={patient._id} value={patient._id}>
                                {patient.patientName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {labTests && (
                    <>
                        <Typography variant="h6" mt={3}>Bill Service Records</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Bill Service</TableCell>
                                        {/* <TableCell>Amount</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {labTests.TypeDetails.map((test) => (
                                        <TableRow key={test.typeId}>
                                            <TableCell>{test.typeName}</TableCell>
                                            {/* <TableCell>{test.Amount}</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography mt={2} variant="h6" className="float-end pr-20">Total Amount to pay: {totalAmount}</Typography>
                    </>
                )}
                <Divider sx={{ p: 1 }} />

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={status} onChange={handleStatusChange}>
                        <MenuItem value="paid">Paid</MenuItem>
                        {/* <MenuItem value="unpaid">Unpaid</MenuItem> */}
                        <MenuItem value="tenaMedhin">TenaMedhin</MenuItem>
                        <MenuItem value="refunded">Refunded</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleUpdateStatus} sx={{ mt: 3 }}>
                    Bill Record Udpated
                </Button>
            </Box>

            <Divider />
            {error && <Typography variant="h6">{error}</Typography>}
            <Divider />
            <Box sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Bill Records
                </Typography>
                <ExportTable data={billData} fileName="Bill Records" />
                <AdminTable data={billData} columns={columns} />
            </Box>
        </>
    );
};

export default UpdateCardBill;
