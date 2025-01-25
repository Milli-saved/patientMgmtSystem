import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import AdminTable from './AdminTable';
import ExportTable from '../utils/ExportTable';
import { apiUtility } from '../../components/repo/api';

const DynamicReportPage = () => {
  const [reportType, setReportType] = useState(null); // Selected report type
  const [data, setData] = useState([]); // Data for the table
  const [loading, setLoading] = useState(false); // Loading state

  // Define table columns for different reports
  const columnsMap = {
    patient: [
      { label: 'Patient ID', field: 'PatientID' },
      { label: 'Full Name', field: 'fullName' },
      { label: 'Email', field: 'Email' },
      { label: 'Phone', field: 'phoneNumber' },
      { label: 'Gender', field: 'Gender' },
      { label: 'City', field: 'City' },
      { label: 'subCity', field: 'subCity' },
      { label: 'Woreda', field: 'Woreda' },
      { label: 'houseNumber', field: 'houseNumber' },
      { label: 'EmergencyContact', field: 'EmergencyContact' },
    ],
    healthcenter: [
      { label: 'Health center', field: 'healthCenterId' },
      { label: 'Name', field: 'name' },
      { label: 'Type', field: 'Type' },
      { label: 'Is Active', field: 'isActive' },
      { label: 'Create At', field: 'createdAt' },
    ],
    user: [
      { label: 'userName', field: 'userName' },
      { label: 'Name', field: 'fullName' },
      { label: 'Email', field: 'email' },
      { label: 'phoneNumber', field: 'phoneNumber' },
      { label: 'Department', field: 'department' },
      { label: 'Role', field: 'role' },
    ],
  };

  const routeMap = {
    patient: '/patient/getAllPatient',
    healthcenter: '/healthcenter/getHealthCenter',
    user: '/user/getAllUser',
  };

  
  const fetchData = async (selectedReportType) => {
    setLoading(true);
    try {
      const route = routeMap[selectedReportType];
      const response = await apiUtility.get(route);
      console.log('response', response.data);
      
      if (response && response.status === true) {
        setData(response.data);
      } else {
        setData([]); 
        toast.error('No data found for the selected report type.');
      }
    } catch (error) {
      toast.error('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleReportTypeChange = async (e) => {
    const newReportType = e.target.value;
    setReportType(newReportType); 
    await fetchData(newReportType); 
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dynamic Reports
      </Typography>
      <Container className='grid'>
        <Box>
          <FormControl sx={{ width: '400px' }} className="float-end">
            <InputLabel id="report-type-label">Select Report Type</InputLabel>
            <Select
              labelId="report-type-label"
              value={reportType || ''}
              onChange={handleReportTypeChange}
            >
              <MenuItem value="patient">Patient Data</MenuItem>
              <MenuItem value="healthcenter">Health Center Data</MenuItem>
              <MenuItem value="user">User Data</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Table and Export */}
          {reportType && data.length > 0 ? (
              <Container>
                <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
                  <Typography variant="h6">{`Report: ${reportType}`}</Typography>
                  <ExportTable data={data} fileName={`${reportType}_report`} />
                </Box>
                <Box>
                  <AdminTable columns={columnsMap[reportType]} data={data && data} />
                </Box>
              </Container>
          ) : (
            reportType && (
              <Typography variant="body1" color="textSecondary">
                No data available for the selected report.
              </Typography>
            )
          )}
        </>
      )}
    </Container>
  );
};

export default DynamicReportPage;