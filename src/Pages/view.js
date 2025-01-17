import React from "react";
import { FaBookmark, FaHome, FaHospital, FaUser } from "react-icons/fa";
import { FaGear, FaHospitalUser } from "react-icons/fa6";

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

const RoleBasedViews = {
  super_user: {
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
      "/manage-patients": {
        label: "Manage Patients",
        component: React.createElement(ManagePatients),
        icons: FaHospitalUser,
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
        label: "Settings",
        component: React.createElement(PatientSettings),
        icons: FaGear,
      },
    },
  },
  physician: {
    name: "Physician",
    routes: {
      "/dashboard": {
        label: "Appointments",
        component: React.createElement(PhysicianHome),
        icons: FaHome,
      },
      "/referrals": {
        label: "Referrals",
        component: React.createElement(Referrals),
        icons: FaHome,
      },
      "/labtestandprescription": {
        label: "Lab Test & Prescriptions",
        component: React.createElement(LabTestAndPrescription),
        icons: FaHome,
      },
      "/report": {
        label: "Reports",
        // component:
        icons: FaBookmark,
      },
      "/settings": {
        label: "Settings",
        component: React.createElement(PhysicianSettings),
        icons: FaGear,
      },
    },
  },
  labtechnician: {
    name: "Lab",
    routes: {
      "/dashboard": {
        label: "Lab Test & Prescriptions",
        component: React.createElement(LabHome),
        icons: FaHome,
      },
      "/report": {
        label: "Report",
        component: React.createElement(LabReport),
        icons: FaBookmark,
      },
      "/settings": {
        label: "Settings",
        component: React.createElement(LabSettings),
        icons: FaGear,
      },
    },
  },
  healthofficer: {
    name: "Health Officer",
    routes: {
      "/dashboard": {
        label: "Manage Health Center",
        component: React.createElement(HealthOfficerHome),
        icons: FaHome,
      },
    },
  },
};

export { RoleBasedViews };
