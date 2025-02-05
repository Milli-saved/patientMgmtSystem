import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
} from '@mui/material';
import { apiUtility } from '../../components/repo/api';
import { AuthContext } from '../../contexts/auth';

const GivePrescriptionByPharmacist = ({ onClose, patientInfo }) => {
  console.log('in prescriptionsss', patientInfo);

  const patientName = patientInfo.patientName;
  const PrescriptionID = patientInfo.PrescriptionID;
  // console.log('in assignPatientToDocModal',patientName, patientID);
  const [error, setError] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [note, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const formData = {
    "Note": note,
    "Status": "Completed",
  }

  const handleSubmit = async () => {
    const response = await apiUtility.post(`/prescription/updatePrescription/${PrescriptionID}`, formData);
    console.log('assign patient', response.status);
    if (response.status == true) {
      setError(response.message);
      onClose();
    } else {
      setError(response.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ mt: 10 }}>
      <div className="modal-content mt-10 p-10" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ paddingBottom: 20 }}>Issue Prescription to Patient</h2>
        <TextField
          sx={{ p: 1 }}
          label="Patient Full Name"
          variant="outlined"
          fullWidth
          disabled="true"
          value={patientName}
        />
        <FormControl fullWidth margin="normal" sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              value={note}
              onChange={handleNotesChange}
            />
          </Grid>
        </FormControl>
        {error && error}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Issue Prescription
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};


export default GivePrescriptionByPharmacist;