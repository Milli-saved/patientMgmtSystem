// import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";

// const createPatient = async (patient) => {
//   const response = await fetch(
//     `${process.env.REACT_APP_API_URL}/v1/users/add_employee`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patient),
//     }
//   );
//   if (!response.ok) throw new Error("Failed to create patient");
//   return response.json();
// };

// const AddNewPatient = ({ handleAddNewPatient }) => {
//   const [patientInfo, setPatientInfo] = useState({
//     fullName: "",
//     DateOfBirth: "",
//     Gender: "",
//     City: "",
//     subCity: "",
//     Woreda: "",
//     houseNumber: "",
//     phoneNumber: "",
//     EmergencyContact: "",
//     Email: "",
//     CreatedBy: "admin",
//   });

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setPatientInfo({
//       ...patientInfo,
//       [name]: value,
//     });
//   };

//   const addPatientMutation = useMutation({
//     mutationFn: createPatient,
//     onSuccess: () => {
//       toast.success("Patient created successfully");
//       queryClient.invalidateQueries(["patient"]);
//       closeModal();
//     },
//     onError: () => {
//       toast.error("Error adding Patient");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("%%%: ", patientInfo);
//     try {
//       addPatientMutation.mutate(patientInfo);
//     } catch (error) {
//       console.log("got this error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 overflow-auto">
//       <div className="relative p-4 w-[60%] max-h-full">
//         <div className="relative bg-white rounded-lg shadow-lg p-5">
//           <div className="flex bg-blue-900 items-center justify-between p-4 md:p-5 border-b border-gray-300">
//             <h3 className="text-lg font-semibold text-white">
//               Create New Patient
//             </h3>
//             <button
//               type="button"
//               className="text-white bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
//               onClick={handleAddNewPatient}
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
//             <div className="flex flex-col items-start mt-5">
//               <label
//                 htmlFor="userId"
//                 className="block mb-2 text-lg font-medium text-blue-700"
//               >
//                 Health Center
//               </label>
//               <select className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[40%] p-2.5">
//                 <option>Health care one</option>
//                 <option>Health care Two</option>
//                 <option>Health care Three</option>
//               </select>
//             </div>
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
//                 <select
//                   name="Gender"
//                   onChange={changeHandler}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
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
//                   onChange={changeHandler}
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
//                   <option>Single</option>
//                   <option>Married</option>
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
//                   City
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   onChange={changeHandler}
//                   name="City"
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
//                   onChange={changeHandler}
//                   name="subCity"
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
//                   onChange={changeHandler}
//                   name="Woreda"
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
//                   onChange={changeHandler}
//                   name="houseNumber"
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
//                 onChange={changeHandler}
//                 type="text"
//                 autoComplete="Current Password"
//                 placeholder="Health Center Name"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//               />
//             </div>
//             <div className="flex justify-evenly mt-10">
//               <button className="py-2 px-5 bg-blue-900 text-white rounded-xl ">
//                 Create
//               </button>
//               <button
//                 onClick={handleAddNewPatient}
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

// export default AddNewPatient;


import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createPatient = async (patient) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/users/add_employee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    }
  );
  if (!response.ok) throw new Error("Failed to create patient");
  return response.json();
};

const AddNewPatient = ({ handleAddNewPatient }) => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    DateOfBirth: "",
    Gender: "",
    City: "",
    subCity: "",
    Woreda: "",
    houseNumber: "",
    phoneNumber: "",
    EmergencyContact: "",
    Email: "",
    CreatedBy: "admin",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: value,
    });
  };

  const addPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Patient created successfully");
      handleAddNewPatient();
    },
    onError: () => {
      toast.error("Error adding Patient");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatientMutation.mutate(patientInfo);

  };

  return (
    <Dialog open={true} onClose={handleAddNewPatient} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: "#154C79", color: "white" }}>
        Create New Patient
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Health Center
        </Typography>
        <Select
          fullWidth
          name="HealthCenter"
          onChange={changeHandler}
          defaultValue="Health care one"
          sx={{ mb: 3 }}
        >
          <MenuItem value="Health care one">Health care one</MenuItem>
          <MenuItem value="Health care two">Health care two</MenuItem>
          <MenuItem value="Health care three">Health care three</MenuItem>
        </Select>

        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              name="Gender"
              fullWidth
              defaultValue=""
              onChange={changeHandler}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth"
              name="DateOfBirth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              onChange={changeHandler}
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
              name="Email"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="City"
              name="City"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="SubCity"
              name="subCity"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Woreda"
              name="Woreda"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="House Number"
              name="houseNumber"
              fullWidth
              onChange={changeHandler}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Other Information
        </Typography>
        <TextField
          label="Emergency Contact"
          name="EmergencyContact"
          fullWidth
          onChange={changeHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleAddNewPatient} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewPatient;
