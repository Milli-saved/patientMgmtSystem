// import React, { useState } from "react";

// const AssignPatientToDocModal = ({ onClose, selectedPatient }) => {
//   const [patientDetails, setPatientDetails] = useState(selectedPatient);

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setPatientDetails({
//       ...patientDetails,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50 font-work-sans">
//       <div className="relative p-4 w-[50%] max-w-[80%] max-h-screen overflow-y-auto">
//         <div className="relative bg-white rounded-lg shadow-lg">
//           <div className="flex items-center justify-between p-4 md:p-5 bg-white border-b border-gray-300">
//             <h3 className="text-lg font-semibold text-gray-900 text-center">
//               Assign Patient To Doctor
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
//           <form className="p-4 md:p-5">
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
//                   value={patientDetails.name}
//                   onChange={changeHandler}
//                   type="text"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Patient Id
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="fullName"
//                   value={patientDetails.name}
//                   onChange={changeHandler}
//                   type="text"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Description
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="fullName"
//                   value={patientDetails.name}
//                   onChange={changeHandler}
//                   type="text"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//               <div className="flex flex-col items-start mt-5">
//                 <label
//                   htmlFor="userId"
//                   className="block mb-2 text-lg text-blue-700 font-medium"
//                 >
//                   Assign To Doctor:
//                 </label>
//                 <input
//                   id="healtcenterName"
//                   name="fullName"
//                   value={patientDetails.name}
//                   onChange={changeHandler}
//                   type="text"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                 />
//               </div>
//             </div>
//           </form>
//         </div>{" "}
//       </div>
//     </div>
//   );
// };

// export default AssignPatientToDocModal;


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
} from '@mui/material';
import { apiUtility } from '../../components/repo/api';
import { AuthContext } from '../../contexts/auth';

const AssignPatientToDocModal = ({onClose, patientInfo }) => {
  // console.log('in assignPatientToDocModal', patientInfo);
  
  const patientName = patientInfo.fullName;
  const patientID = patientInfo.PatientID;
// console.log('in assignPatientToDocModal',patientName, patientID);
  const [error, setError] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const loadDoctors = async () => {
    setLoading(true);
    const response = await apiUtility.get(`/patient/getDoctorList/${user.healthCenterId}`);
    setDoctors(response.data); 
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const formData = {
    "patientId": patientID,
    "physicianId": selectedDoctor,
    "healthCenterId": user.healthCenterId,
  }
  const handleSubmit = async () => {
    const response = await apiUtility.post(`/patient/assignDoctor`, formData);
    console.log('assign patient', response.status);
    if (response.status == true) {
        setError(response.message);
        onClose();
        
      } else {
        setError(response.message);
      }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{mt:10}}>
      <div className="modal-content mt-10 p-10" style={{ padding: '20px', maxWidth: '400px', margin: 'auto', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{paddingBottom:20}}>Assign Patient to Doctor</h2>
        <TextField
          sx={{ p: 1 }}
          label="Patient Full Name"
          variant="outlined"
          fullWidth
          disabled="true"
          value={patientName}
        />
        <FormControl fullWidth margin="normal" sx={{p:1}}>
          <InputLabel>Assign to Doctor</InputLabel>
          <Select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            disabled={loading}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              doctors.map((doctor) => (
                <MenuItem key={doctor.userName} value={doctor.userName}>
                  {doctor.fullName}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        {error && error}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Assign
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};


export default AssignPatientToDocModal;