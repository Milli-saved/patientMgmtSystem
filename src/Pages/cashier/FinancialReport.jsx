import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import AdminTable from "../admin/AdminTable";
import ExportTable from "../utils/ExportTable";

const FinancialReport = () => {
    const [financialData, setFinancialData] = useState([]); // Financial data
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

    // Columns for the AdminTable
    const columns = [
        { label: "Date", field: "date" },
        { label: "Description", field: "description" },
        { label: "Amount", field: "amount" },
        { label: "Type", field: "type" },
        { label: "Balance", field: "balance11" },
        { label: "Paid By", field: "balance1" },
        { label: "Payment Date", field: "balance2" },
        { label: "Note", field: "balance3" },
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
                            <ExportTable data={financialData} fileName="Financial Report" />
                        </Box>
                        <Paper>
                            <AdminTable data={[]} columns={columns} />
                        </Paper>
                    </>
                )}
            </Box>
        </>
    );
};

export default FinancialReport;