// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "sonner";


// const UpdatePatientInfo = ({ onClose, selectedPatient }) => {
//   const [patientDetails, setPatientDetails] = useState(selectedPatient);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientDetails({
//       ...patientDetails,
//       [name]: value,
//     });
//   };

//   const addPatientMutation = useMutation({
//     mutationFn: createPatient,
//     onSuccess: () => {
//       toast.success("Patient created successfully");
//       onClose();
//     },
//     onError: () => {
//       toast.error("Error adding Patient");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("%%%: ", patientDetails);
//     // try {
//     addPatientMutation.mutate(patientDetails);
//     // } catch (error) {
//     //   console.log("got this error");
//     // }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 font-work-sans">
//       <div className="relative p-4 w-[50%] max-w-[80%] max-h-screen overflow-y-auto">
//         <div className="relative bg-white rounded-lg shadow-lg">
//           <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-300">
//             <h3 className="text-lg font-semibold text-gray-900 text-center">
//               Add New Patient Record
//             </h3>
//             <button
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
//               onClick={onClose}
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
//           <form className="p-4 md:p-5" onSubmit={handleSubmit}>
//             <h1 className="text-4xl text-gray-800 mt-5">
//               Personal Information
//             </h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
//                   value={patientDetails.fullName}
//                   onChange={handleChange}
//                   type="text"
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
//                 <select
//                   name="Gender"
//                   value={selectedPatient.Gender}
//                   onChange={handleChange}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 >
//                   <option>Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Date Of Birth
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="DateOfBirth"
//                   value={selectedPatient.DateOfBirth}
//                   onChange={handleChange}
//                   type="date"
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
//                   Phone Number
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="phoneNumber"
//                   value={patientDetails.phoneNumber}
//                   onChange={handleChange}
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
//                   Nationality
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="healtcenterName"
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
//                   Martial Status
//                 </label>
//                 <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
//                   <option>Status</option>
//                   <option value="Single">Single</option>
//                   <option value="Married">Married</option>
//                 </select>
//               </div>
//             </div>
//             <h1 className="text-4xl text-gray-800 mt-5">Contact Information</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Email
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="Email"
//                   value={selectedPatient.Email}
//                   onChange={handleChange}
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
//                   City
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   onChange={handleChange}
//                   name="City"
//                   value={selectedPatient.City}
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
//                   SubCity
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   onChange={handleChange}
//                   name="subCity"
//                   value={selectedPatient.subCity}
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
//                   Woreda
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   onChange={handleChange}
//                   name="Woreda"
//                   value={selectedPatient.Woreda}
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
//                   House Number
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   onChange={handleChange}
//                   name="houseNumber"
//                   value={selectedPatient.houseNumber}
//                   type="text"
//                   autoComplete="Current Password"
//                   placeholder="Health Center Name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//             </div>
//             <h1 className="text-4xl text-gray-800 mt-5">Other Information</h1>
//             <div className="flex flex-col items-start mt-5">
//               <label
//                 htmlFor="userId"
//                 className="block mb-2 text-lg text-blue-700 font-medium"
//               >
//                 Emergency Contact
//               </label>
//               <input
//                 id="healtcenterName"
//                 name="EmergencyContact"
//                 value={selectedPatient.EmergencyContact}
//                 onChange={handleChange}
//                 type="text"
//                 autoComplete="Current Password"
//                 placeholder="Health Center Name"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//               />
//             </div>
//             <div className="flex justify-evenly mt-10">
//               <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
//                 Update
//               </button>
//               <button
//                 onClick={onClose}
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

// export default UpdatePatientInfo;


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { apiUtility } from "../../components/repo/api";

const UpdatePatientInfo = ({ onClose, data }) => {

  const patientId = data.PatientID;
  const date = new Date(data.DateOfBirth);
  data.DateOfBirth = date.toISOString().split("T")[0];

  console.log('Patient',data);
  
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    console.log('health center', value, key);
    setFormData((prev) => ({ ...prev, [key]: value }));
};

  const handleSubmit = async () => {
    const response = await apiUtility.post(`/patient/updatePatient/${patientId}`, formData);
    console.log('update patient', response.status);
    if (response.status == true) {
      setError(response.message);
      onClose(response.message,true);
    } else {
      setError(response.message);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ bgcolor: "#0d47a1", color: "white", textAlign: "center" }}>
        Update Patient
      </DialogTitle>
      <DialogContent>
        {/* <form onSubmit={handleSubmit}> */}
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
               fullWidth
               label="Full Name"
               value={formData.fullName}
               onChange={(e) => handleChange('fullName', e.target.value)}
               margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                name="Gender"
                value={formData.Gender}
                onChange={(e) => handleChange('Gender', e.target.value)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Birth"
                value={formData.DateOfBirth}
                onChange={(e) => handleChange('DateOfBirth', e.target.value)}
                type="date"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={formData.Email}
                onChange={(e) => handleChange('Email', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                value={formData.City}
                onChange={(e) => handleChange('City', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="SubCity"
                value={formData.subCity}
                onChange={(e) => handleChange('subCity', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Woreda"
                value={formData.Woreda}
                onChange={(e) => handleChange('Woreda', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="House Number"
                value={formData.houseNumber}
                onChange={(e) => handleChange('houseNumber', e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Other Information
          </Typography>
          <TextField
            label="Emergency Contact"
            value={formData.EmergencyContact}
            onChange={(e) => handleChange('EmergencyContact', e.target.value)}
            fullWidth
          />
        {/* </form> */}
      </DialogContent>
      {error && <Text>{error}</Text>}
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePatientInfo;
