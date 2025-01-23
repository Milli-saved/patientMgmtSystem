// import React from "react";

// const ResetPassword = () => {
//   return (
//     <section className="bg-gray-50">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <a
//           href="#"
//           className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
//         ></a>
//         <div className="w-full shadow-xl shadow-gray-600 bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-3xl font-bold text-blue-700 text-center">
//               Reset Password
//             </h1>
//             <h1 className="text-xl font-normal leading-tight tracking-tight text-gray-600 md:text-lg">
//               Reset your password by inserting your UserId and password will be
//               sent to your phone number.
//             </h1>
//             <form className="space-y-4 md:space-y-6">
//               <div className="flex flex-col items-start">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg font-medium text-blue-700"
//                 >
//                   User Id
//                 </label>
//                 <input
//                   id="userId"
//                   name="userId"
//                   type="text"
//                   autoComplete="User Id"
//                   placeholder="User Id"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-950 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Reset
//               </button>
//             </form>
//           </div>
//           <div className="flex items-end justify-end m-5">
//             <h1 className="text-gray-600">Need Help?</h1>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Paper,
  Modal,
} from '@mui/material';
import { apiUtility } from '../../components/repo/api';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpError, setOTPError] = useState('');
  const [isOtpSend, setIsTrueOtp] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    console.log('erusee', userId);
    if (!userId) {
      setError('User ID is required');
      return;
    }
    // const response = await apiUtility.get("/util/sendOTP/" + userId);
    // console.log('response', JSON.stringify(response));
    // if (response) {
    //   setError(response.message);
    //   if (response.status == true) {
    //     // open the modal. 
    //     setIsTrueOtp(true);
    //     console.log('open modal',isOtpSend);

    //   } else {
    //     setIsTrueOtp(false);
    //   }
    // } else {
    //   setError("Unable to send OTP");
    //   setIsTrueOtp(false);
    // }
    try {
      const response = await apiUtility.get("/util/sendOTP/" + userId);
      console.log('response', JSON.stringify(response));
      if (response && response.status) {
        setError('');
        setIsTrueOtp(true);
      } else {
        setError(response.message || "Unable to send OTP");
        setIsTrueOtp(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError("Unable to send OTP");
      setIsTrueOtp(false);
    }
  }

  const sendPassword = async (e) => {
    e.preventDefault();
    console.log('otp', userId, otp);
    if (!userId || !otp) {
      setOTPError('User ID and OTP is required');
      return;
    }
    const sendData = {
      userName: userId,
      otp: otp
    }
    const response = await apiUtility.post("/util/verifyOTP", sendData);
    console.log('reset password', JSON.stringify(response));
    if (response) {
      setOTPError(response.message);
      if (response.status == true) {
        // open the modal. 
        // setIsTrueOtp(false);
        // console.log('after open modal', isOtpSend);
        // navigate('/');
      } else {
        setIsTrueOtp(true);
      }
    } else {
      setOTPError("Unable to send OTP");
      setIsTrueOtp(true);
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        // backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Reset your password by inserting your User ID. A password reset link will be sent to your phone number.
        </Typography>
        <form onSubmit={handleReset}>
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {error && error}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Reset
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/" variant="body2">
            Back to Login
          </Link>
        </Box>
      </Paper>
      {isOtpSend && (
  <Modal open={isOtpSend} onClose={() => setIsTrueOtp(false)}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        maxHeight: '95vh',  
        borderRadius: 2,
        boxShadow: 24,
      }}
    >
      <Paper sx={{p:3}}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Enter OTP
        </Typography>
        <form onSubmit={sendPassword}>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setOtp(e.target.value)}
          />
          {otpError && <Typography>{otpError}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Verify
          </Button>
          <Box mt={2} textAlign="center">
            <Link href="/" variant="body2">
              Back to Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  </Modal>
)}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2024 Patient management system
        </Typography>
        <Link variant="body2" color="textSecondary">
          Terms and Condition
        </Link>
      </Box>
    </Container>
  );
};

export default ResetPassword;