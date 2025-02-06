import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

const FinancialReport = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error message
    const { user } = useContext(AuthContext); // Authenticated user

    // Fetch financial data on component mount
    // useEffect(() => {
    //     fetchFinancialData();
    // }, []);

    // // Fetch financial data from the API
    // const fetchFinancialData = async () => {
    //     try {
    //         const response = await apiUtility.get(`/financial/getAllByHealthCenter/${user.healthCenterId}`);
    //         if (response.status) {
    //             setFinancialData(response.data);
    //         } else {
    //             setError("Unable to fetch financial data");
    //         }
    //     } catch (err) {
    //         setError("An error occurred while fetching financial data");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const [billData, setBillData] = useState([]);

    const fetchBillData = async () => {
        try {
            const response = await apiUtility.get(`/bill/getAllBillByHealthCenter/${user.healthCenterId}`);
            if (response.status) setBillData(response.data);
        } catch (err) {
            setError("Unable to fetch bill data");
        }
    };
    useEffect(() => {
        fetchBillData();
    }, []);
    
    // Columns for the AdminTable
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
                    Financial Report
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                ) : (
                    <>
                        <Box mb={3}>
                            <ExportTable data={billData} fileName="Financial Report" />
                        </Box>
                        <Paper>
                            <AdminTable data={billData} columns={columns} />
                        </Paper>
                    </>
                )}
            </Box>
        </>
    );
};

export default FinancialReport;