import { FaHome, FaHospital, FaUser } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";

import HomePage from "./admin/Homepage";
import ManagePatients from "./admin/ManagePatient";
import ManageHealthCenter from "./admin/ManageHealthCenter";
import ManageUser from "./admin/ManageUser";
import React from "react";

const RoleBasedViews = {
  super_user: {
    name: "Super User",
    routes: {
      "/": {
        label: "Dashbaord",
        component: React.createElement(HomePage),
        icons: FaHome,
      },
      "/manage-patients": {
        label: "Manage Patients",
        component: React.createElement(ManagePatients),
        icons: FaHospitalUser,
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
    },
  },
};

export { RoleBasedViews };
