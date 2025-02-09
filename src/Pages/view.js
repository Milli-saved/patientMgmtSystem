import React from "react";
import {
  FaArrowAltCircleDown,
  FaBookmark,
  FaHome,
  FaHospital,
  FaMoneyBill,
  FaStethoscope,
  FaTablets,
  FaUser,
} from "react-icons/fa";
import { FaGear, FaHospitalUser, FaUserDoctor } from "react-icons/fa6";

import HomePage from "./admin/HomePage";
import ManagePatients from "./admin/ManagePatient";
import ManageHealthCenter from "./admin/ManageHealthCenter";
import ManageUser from "./admin/ManageUser";

import PatientHomePage from "./patient/Home";
import PatientSettings from "./patient/PatientSettings";
import PhysicianHome from "./Physician/PhysicianHome";
import Referrals from "./Physician/Referrals";
import LabTestAndPrescription from "./Physician/LabTestAndPrescription";
import PhysicianSettings from "./Physician/PhysicianSettings";
import LabHome from "./Lab/LabHome";
import LabReport from "./Lab/Report";
import LabSettings from "./Lab/Settings";
import HealthOfficerHome from "./HealthOfficer/HealthOfficerHome";
import PatientRecords from "./recordofficer/PatientRecords";
import AssignPatientToDoctor from "./recordofficer/AssignPatientToDoctor";
import ReferralList from "./recordofficer/ReferralList";

import CashierDashboard from "./cashier/BillPayment";
import CashierFeedback from "./cashier/feedback";
import PasswordResetPage from "./admin/PasswordResetPage";
import AppointmentPage from "./Physician/AppointmentPage";
import PrescriptionPage from "./Physician/PrescriptionPage";
import DynamicReportPage from "./admin/DynamicReportPage";
import AddParameter from "./admin/AddParameter";
import LabTest from "./Lab/LabHome";
import PatientActivation from "./HealthOfficer/PatientActivation";
import LabTestRequest from "./Physician/LabTestRequest";
import FinancialReport from "./cashier/FinancialReport";
import PharmacistPrescriptionManagement from "./pharmacist/PharmacistPrescriptionManagement";
import HODynamicReportPage from "./HealthOfficer/HODynamicReportPage";
import AppointmentApprovePage from "./HealthOfficer/AppointmentApprovePage";
import UpdateCardBill from "./cashier/UpdateCardBill";

const RoleBasedViews = {
  admin: {
    name: "Super User",
    routes: {
      "/dashboard": {
        label: "Home",
        component: React.createElement(HomePage),
        icons: FaHome,
      },
      "/manage-health-center": {
        label: "Manage Health Center",
        component: React.createElement(ManageHealthCenter),
        icons: FaHospital,
      },
      "/manage-user": {
        label: "Manage User",
        component: React.createElement(ManageUser),
        icons: FaUser,
      },
      "/reset": {
        label: "Reset Password",
        component: React.createElement(PasswordResetPage),
        icons: FaUser,
      },
      "/addpatameter": {
        label: "Add Parameter",
        component: React.createElement(AddParameter),
        icons: FaStethoscope,
      },
      "/feedback": {
        label: "Feedback",
        component: React.createElement(CashierFeedback),
        icons: FaUserDoctor,
      },
      "/dynamicreport": {
        label: "Dynamic Report",
        component: React.createElement(DynamicReportPage),
        icons: FaBookmark,
      },
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  patient: {
    name: "Patient",
    routes: {
      "/dashboard": {
        label: "Home",
        component: React.createElement(PatientHomePage),
        icons: FaHome,
      },
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PatientSettings),
        icons: FaGear,
      },
    },
  },
  physician: {
    name: "Physician",
    routes: {
      "/dashboard": {
        label: "Medical History",
        component: React.createElement(PhysicianHome),
        icons: FaHome,
      },
      "/referrals": {
        label: "Referrals",
        component: React.createElement(Referrals),
        icons: FaHome,
      },
      "/appointment": {
        label: "Appointment",
        component: React.createElement(AppointmentPage),
        icons: FaHome,
      },   
      "/labtestrequest": {
        label: "lab Test Request",
        component: React.createElement(LabTestRequest),
        icons: FaTablets,
      },
      "/prescription": {
        label: "Prescription",
        component: React.createElement(PrescriptionPage),
        icons: FaHome,
      },  
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  labtechnician: {
    name: "Lab Technician",
    routes: {
      "/dashboard": {
        label: "Lab Test",
        component: React.createElement(LabTest),
        icons: FaHome,
      },
      "/labreport": {
        label: "Lab Report",
        component: React.createElement(LabReport),
        icons: FaHome,
      },
       "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  healthofficer: {
    name: "Health Officer",
    routes: {
      "/dashboard": {
        label: "Manage Health Center",
        component: React.createElement(ManageHealthCenter),
        icons: FaHome,
      },
      "/manage-patients": {
        label: "Manage Patients",
        component: React.createElement(ManagePatients),
        icons: FaHospitalUser,
      },
      "/activatepatient": {
        label: "Activate Patient",
        component: React.createElement(PatientActivation),
        icons: FaUser,
      },
      "/approveappointment": {
        label: "Approve Appointment",
        component: React.createElement(AppointmentApprovePage),
        icons: FaHome,
      },
      "/horeport":{
        label: "Report",
        component: React.createElement(HODynamicReportPage),
        icons: FaHome,
      }
      , "/feedback": {
        label: "Feedback",
        component: React.createElement(CashierFeedback),
        icons: FaUserDoctor,
      },
       "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  recordofficer: {
    name: "Record Officer",
    routes: {
      "/dashboard": {
        label: "Patient Records",
        component: React.createElement(PatientRecords),
        icons: FaHome,
      },
      "/assignpatienttodocs": {
        label: "Assign Patient to Doctor",
        component: React.createElement(AssignPatientToDoctor),
        icons: FaUserDoctor,
      },
      "/approveappointment": {
        label: "Approve Appointment",
        component: React.createElement(AppointmentApprovePage),
        icons: FaHome,
      },
      // "/referralslist": {
      //   label: "Access Referral",
      //   component: React.createElement(ReferralList),
      //   icons: FaArrowAltCircleDown,
      // },
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  cashier: {
    name: "Cashier",
    routes: {
      "/dashboard": {
        label: "Bill Records",
        component: React.createElement(UpdateCardBill),
        icons: FaHome,
      },
      "/finaicialreport": {
        label: "Financial Report",
        component: React.createElement(FinancialReport),
        icons: FaMoneyBill,
      },
      // "/cardbill": {
      //   label: "Card Bill",
      //   component: React.createElement(UpdateCardBill),
      //   icons: FaMoneyBill,
      // },
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  pharmacist: {
    name: "Pharmacist",
    routes: {
      "/dashboard": {
        label: "Prescription",
        component: React.createElement(PharmacistPrescriptionManagement),
        icons: FaHome,
      },
      "/settings": {
        label: "Manage Profile",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
};

export { RoleBasedViews };
