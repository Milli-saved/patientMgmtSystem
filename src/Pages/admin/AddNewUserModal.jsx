// import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";

// const createNewUser = async (userData) => {
//   const response = await fetch(
//     `${process.env.REACT_APP_API_URL}/v1/users/add_employee`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   );
//   if (!response.ok) throw new Error("Failed to create user");
//   return response.json();
// };

// const AddNewUser = ({ handleAddNewUser }) => {
//   const [userDetails, setUserDetails] = useState({
//     userName: "",
//     password: "",
//     fullName: "",
//     email: "",
//     specialist: [],
//     department: "",
//     role: "",
//     phoneNumber: "",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;

//     setUserDetails({
//       ...userDetails,
//       [name]: value,
//     });
//   };
//   const addUserMutation = useMutation({
//     mutationFn: createNewUser,
//     onSuccess: () => {
//       toast.success("user created successfully");
//       queryClient.invalidateQueries(["allUsers"]);
//       closeModal();
//     },
//     onError: () => {
//       toast.error("Error adding Patient");
//     },
//   });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     // console.log("the user dtails: ", userDetails);
//     addUserMutation.mutate(userDetails);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 overflow-auto">
//       <div className="relative p-4 w-[60%] max-h-full">
//         <div className="relative bg-white rounded-lg shadow-lg p-5">
//           <div className="flex bg-blue-900 items-center justify-between p-4 md:p-5 border-b border-gray-300">
//             <h3 className="text-lg font-semibold text-white">
//               Create New User
//             </h3>
//             <button
//               type="button"
//               className="text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
//               onClick={handleAddNewUser}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           <form onSubmit={submitHandler} className="p-4 md:p-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg font-medium text-blue-700"
//                 >
//                   Health Center
//                 </label>
//                 <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
//                   <option>Health care one</option>
//                   <option>Health care Two</option>
//                   <option>Health care Three</option>
//                 </select>
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   User Name
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="userName"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="fullName"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg font-medium text-blue-700"
//                 >
//                   Gender
//                 </label>
//                 <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="phoneNumber"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Role
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="role"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Email
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="email"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Specialist
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="specialist"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="password"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Department
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="department"
//                   onChange={changeHandler}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-evenly mt-10">
//               <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
//                 Create
//               </button>
//               <button
//                 onClick={handleAddNewUser}
//                 className="py-2 px-5 text-gray-900 bg-slate-400 rounded-xl "
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewUser;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Autocomplete,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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

const AddNewUser = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    fullName: '',
    email: '',
    specialist: [],
    department: '',
    role: '',
    phoneNumber: '',
    healthCenterId: '',
  });
  const [error, setError] = useState('');
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
      }
    }
    fetch();
  }, [open]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.userName || !formData.password || !formData.fullName || !formData.email || !formData.role || !formData.healthCenterId) {
      setError('Please fill in all required fields.');
      return;
    }
    const response = await apiUtility.post(`/user/createUser`, formData);
    console.log('update user', response);
    if (response.status == true) {
      // onClose();
      setError(response.message);
      setFormData({
        userName: '',
        password: '',
        fullName: '',
        email: '',
        specialist: [],
        department: '',
        role: '',
        phoneNumber: '',
        healthCenterId: '',
      })
    } else {
      setError(response.message);
    }

    // axios
    //   .post('/api/users', formData) // Replace with your API endpoint
    //   .then(() => {
    //     alert('User created successfully!');
    //     onClose();
    //     if (onCreate) onCreate();
    //   })
    //   .catch((error) => console.error('Error creating user:', error));
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
          Create New User
        </Typography>
        <TextField
          fullWidth
          label="User Name"
          value={formData.userName}
          onChange={(e) => handleChange('userName', e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          margin="normal"
          required
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
        <FormControl fullWidth margin="normal" required>
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
        {/* <Autocomplete
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
              required
            />
          )}
        /> */}
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
        {error && error}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewUser;
