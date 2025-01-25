import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { apiUtility } from '../../components/repo/api';

const AddParameter = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [billServices, setBillServices] = useState([]); // Bill service data
    const [openModal, setOpenModal] = useState(false); // Modal state
    const [formData, setFormData] = useState({
        typeId: '',
        typeName: '',
        amount: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Fetch bill service data
    const fetchBillServices = async () => {
        try {
            const response = await apiUtility.get('/billService/getAll');
            if (response.status === true) {
                setBillServices(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch bill services:', error);
        }
    };

    useEffect(() => {
        fetchBillServices();
    }, []);

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Open modal
    const handleOpenModal = () => {
        setFormData({ typeId: '', typeName: '', amount: '' });
        setIsEditing(false);
        setOpenModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission (Add/Update)
    const handleSubmit = async () => {
        try {
            if (isEditing) {
                // Update existing bill service
                await apiUtility.post(`/billService/update/${selectedId}`, formData);
            } else {
                // Add new bill service
                await apiUtility.post('/billService/create', formData);
            }
            fetchBillServices();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving bill service:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await apiUtility.delete(`/bill/deleteBillService/${id}`);
            fetchBillServices();
        } catch (error) {
            console.error('Error deleting bill service:', error);
        }
    };

    // Handle edit
    const handleEdit = (row) => {
        setFormData(row);
        setSelectedId(row.typeId);
        setIsEditing(true);
        setOpenModal(true);
    };

    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="System Parameter" />
                <Tab label="Manage Invoices" />
            </Tabs>
            <Box sx={{ p: 3 }}>
                {tabIndex === 0 && (
                    <Typography variant="h6">Patient Management Placeholder</Typography>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h6">Bill Service Management</Typography>
                            <Button
                                variant="contained"
                                startIcon={<FaPlus />}
                                onClick={handleOpenModal}
                            >
                                Add Bill Service
                            </Button>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type ID</TableCell>
                                        <TableCell>Type Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {billServices.map((row) => (
                                        <TableRow key={row.typeId}>
                                            <TableCell>{row.typeId}</TableCell>
                                            <TableCell>{row.typeName}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleEdit(row)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(row.typeId)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Add/Edit Modal */}
                        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                            <DialogTitle>{isEditing ? 'Edit Bill Service' : 'Add New Bill Service'}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Type ID"
                                    name="typeId"
                                    value={formData.typeId}
                                    onChange={handleInputChange}
                                    disabled={isEditing}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Type Name"
                                    name="typeName"
                                    value={formData.typeName}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseModal}>Cancel</Button>
                                <Button variant="contained" onClick={handleSubmit}>
                                    {isEditing ? 'Update' : 'Add'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AddParameter;
