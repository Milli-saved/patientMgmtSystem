import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    Autocomplete,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import { apiUtility } from '../../components/repo/api';

const roles = [
    'admin',
    'pharmacist',
    'cashier',
    'labtechnician',
    'physician',
    'healthofficer',
    'recordofficer',
  ];

const UpdateUser = ({ open, onClose, data }) => {
    // console.log('reach here...', data);

    const [formData, setFormData] = useState(data);
    const [healthCenters, setHealthCenters] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (open) {
                const response = await apiUtility.get("/healthcenter/getHealthCenter");
                console.log('health center', response);
                if (response.status == true) {
                    setHealthCenters(response.data);
                    console.log('health center', healthCenters);

                } else {
                    setHealthCenters(null);
                }
                //   axios
                //     .get('/api/healthcenters') // Replace with your API endpoint
                //     .then((response) => {
                //       setHealthCenters(response.data); // Assuming API returns a list of health centers
                //     })
                //     .catch((error) => console.error('Error fetching health centers:', error));
            }
        }
        fetch();
    }, [open]);

    const handleChange = (key, value) => {
        console.log('health center', value, key);

        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const response = await apiUtility.post(`/user/updateUser/${formData.userName}`, formData);
        console.log('update user', response);
        if (response.status == true) {
            alert('Data updated successfully!');
            onClose();
        }
        //     axios
        //         .put(`/api/users/${formData.userName}`, formData)
        //   .then(() => {
        //     alert('Data updated successfully!');
        //     onClose();
        //   })
        //   .catch((error) => console.error('Error updating data:', error));
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Update User
                </Typography>
                <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    margin="normal"
                />
                <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.specialist}
                    onChange={(e, value) => handleChange('specialist', value)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={index}
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Specialist"
                            margin="normal"
                        />
                    )}
                />
                <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    margin="normal"
                />
                {/* <TextField
                    fullWidth
                    label="Role"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    margin="normal"
                /> */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    margin="normal"
                />
                <Autocomplete
                    options={healthCenters}
                    getOptionLabel={(option) => option.name}
                    value={healthCenters.find(
                        (center) => center.healthCenterId === formData.healthCenterId
                    )}
                    onChange={(e, value) =>
                        handleChange('healthCenterId', value ? value.healthCenterId : '')
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Health Center"
                            margin="normal"
                        />
                    )}
                />
                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button onClick={onClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateUser;
