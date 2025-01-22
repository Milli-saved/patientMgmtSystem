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

const Type = [
    'Main Health Center',
    'Branch Health Center',
];

const UpdateHealthCenter = ({ open, onClose, data }) => {
   const healthCenterId = data.healthCenterId;
    const updatedData = {
        Type: data.Type,
        name: data.name
    }

    const [formData, setFormData] = useState(updatedData);
    // const [healthCenters, setHealthCenters] = useState([]);
    const [error, setError] = useState('');
    const handleChange = (key, value) => {
        // console.log('health center', value, key);
        setFormData((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit = async () => {
        const response = await apiUtility.post(`/healthcenter/updateHealthCenter/${healthCenterId}`, formData);
        console.log('health center update', response);
        if (response.status == true) {
            setError(response.message);
            onClose();
        } else {
            setError(response.message);
        }
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
                    maxHeight: '95vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Update Health Center
                </Typography>
                <TextField
                    fullWidth
                    label="Health Center Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    margin="normal"
                />
               
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={formData.Type}
                        onChange={(e) => handleChange('Type', e.target.value)}
                    >
                        {Type.map((Type) => (
                            <MenuItem key={Type} value={Type}>
                                {Type.charAt(0).toUpperCase() + Type.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {error && error}
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

export default UpdateHealthCenter;
