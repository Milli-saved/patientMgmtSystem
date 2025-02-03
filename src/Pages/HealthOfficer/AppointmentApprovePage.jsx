import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import AdminTable from '../admin/AdminTable';
import { apiUtility } from '../../components/repo/api';
import { AuthContext } from '../../contexts/auth';
import ExportTable from '../utils/ExportTable';

const AppointmentApprovePage = () => {
    const [appointment, setData] = useState(null);
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(""); // Error message
    const [isError, setIsError] = useState(false); // Error message

    const fetchData = async () => {
        try {
            console.log('userName', user);
            const response = await apiUtility.get(`/appointment/getPendingAppointment`);
            if (response.status == true)
                setData(response.data);
            console.log('user: ', appointment);
        } catch (err) { }
    }

    useEffect(() => {
        fetchData();
    }, []);


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

    const actions = [
        {
            label: "Approve",
            color: "green",
            onClick: async (row) => {
                console.log("Update clicked for:", row);
                try {
                    const response = await apiUtility.get("/appointment/approvePendingAppointment/" + row.appointmentID);
                    console.log('response', response);
                    if (response.status == true) {
                        await fetchData();
                        setError(response.message);
                        setIsError(false);
                    } else {
                        setError(response.message);
                        setIsError(true);
                    }
                } catch (err) {
                    setError(err.message);
                    setIsError(true);
                }
            },
        },
        {
            label: "Reject",
            color: "red",
            onClick: async (row) => {
                console.log("Update clicked for:", row);
                try {
                    const response = await apiUtility.get("/appointment/rejectPendingAppointment/" + row.appointmentID);
                    console.log('response', response);
                    if (response.status == true) {
                        await fetchData();
                        setError(response.message);
                        setIsError(false);
                    } else {
                        setError(response.message);
                        setIsError(true);
                    }
                } catch (err) {
                    setError(err.message);
                    setIsError(true);
                }
            },
        },
    ];

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Appointment Approve Page
            </Typography>
            {error && <Typography variant="h6" color={isError != true ? "success" : "error"}>{error}</Typography>}
            <ExportTable data={appointment} fileName="Pending Appointment Request from patient report" />
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <AdminTable data={appointment} actions={actions} columns={columns} />
            </Paper>
        </Container>
    );
};

export default AppointmentApprovePage;