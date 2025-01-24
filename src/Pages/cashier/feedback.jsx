import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Toaster } from "sonner";
import { AuthContext } from "../../contexts/auth";
import { apiUtility } from "../../components/repo/api";
import { useEffect } from "react";
import AdminTable from "../admin/AdminTable";
import { Typography, Box, Grid, Container } from '@mui/material';

const feedback = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await apiUtility.get("/feedback/getFeedback");
      console.log('response', response);

      if (response.status == true)
        setData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { label: "Feedback ID", field: "feedbackID" },
    { label: "Date", field: "date" },
    { label: "Content", field: "content" },
    { label: "To", field: "toWhom" },
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Toaster position="top-right" />

        {/* Title */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={5}>
          <Typography variant="h1" component="h1" fontSize="2.5rem" fontWeight="bold" color="text.primary">
            Feedbacks
          </Typography>
        </Box>

        <Box mb={5}>
          <Typography variant="h2" component="h2" fontSize="1.875rem" fontWeight="bold" color="text.primary" mb={2}>
            Feedback List
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdminTable data={data} columns={columns} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default feedback;
