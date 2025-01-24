import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";
import { AuthContext } from "../../contexts/auth";
import SnackBarShow from "./SnackBarShow";

const PhysicianSettings = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    department: "",
    role: "",
    healthCenterId: "",
  });
  const [newPassword, setNewPassword] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  // Function to fetch current user data from the API
  const fetchUserData = async () => {
    try {
      // Replace with your API endpoint
      const response = await apiUtility.get(`/user/getUser/${user.userName}`);
      const data = response.data;
      console.log('data', data);
      if (data) {
        setFormData({
          userName: data.userName,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          department: data.department,
          role: data.role,
          healthCenterId: data.healthCenterId,
        });
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle password change
  const handlePasswordChange = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  // Submit password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.newPassword !== newPassword.confirmPassword) {
      setMessage("Passwords do not match.");
      setError(true);
      return;
    }
    const datatosend = {
      oldPassword: newPassword.oldPassword,
      newPassword: newPassword.newPassword,
    }
    try {
      const response = await apiUtility.post(`/user/changePassword/${user.userName}`, datatosend);
      if (response) {
        setMessage(response.message);
        setError(false);
        setNewPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage(data.message || "Error changing password.");
        setError(true);
      }
    } catch (err) {
      setMessage("Failed to change password.");
      setError(true);
    }
  };

  return (
    <>
      <Box m={2}>
        <Typography variant="h3" component="h1" color="textPrimary">
          Settings
        </Typography>
      </Box>
      <Box p={2}>
        {/* User Information Section */}
        <Typography variant="h5" color="textPrimary" mt={5}>
          User Information
        </Typography>

        <Grid container spacing={3} mt={2}>
          {/* User Name */}
          <Grid item xs={12} md={4}>
            <TextField
              label="User Name"
              value={formData.userName}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Full Name */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Full Name"
              value={formData.fullName}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Email"
              value={formData.email}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
          {/* Phone Number */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Phone Number"
              value={formData.phoneNumber}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Department */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Department"
              value={formData.department}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Role"
              value={formData.role}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
          {/* Health Center ID */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Health Center ID"
              value={formData.healthCenterId}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* Change Password Section */}
        <form onSubmit={handlePasswordSubmit} mt={5}>
          <Typography variant="h5" color="textPrimary" mt={5}>
            Change Password
          </Typography>

          <Grid container spacing={3} mt={2}>
            {/* Current Password */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Current Password"
                name="oldPassword"
                type="password"
                value={newPassword.oldPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Grid>

            {/* New Password */}
            <Grid item xs={12} md={4}>
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword.newPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={newPassword.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={5}>
            <Button variant="contained" color="primary" type="submit">
              Change Password
            </Button>
          </Box>
        </form>
      </Box>

      {/* Snackbar for feedback */}
      {SnackBarShow(message, setMessage, error)}
    </>
  );
};

export default  PhysicianSettings;


