import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Paper,
} from '@mui/material';
import { apiUtility } from '../../components/repo/api';

const PasswordResetPage = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!username || !newPassword) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await apiUtility.post("/user/resetPassword", {
        userName: username,
        password: newPassword,
      });
      if (response && response.status) {
        setSuccessMessage('Password reset successfully!');
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'start',
        height: '100vh',
        width: '100vh',
      }}
    >
      <Paper sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="left" gutterBottom>
          Reset Your Password
        </Typography>

        <form onSubmit={handleResetPassword}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          {successMessage && <Typography color="green">{successMessage}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Reset Password
          </Button>
        </form>
        {/* <Box mt={2} textAlign="center">
          <Link href="/login" variant="body2">
            Back to Login
          </Link>
        </Box> */}
      </Paper>
    </Container>
  );
};

export default PasswordResetPage;