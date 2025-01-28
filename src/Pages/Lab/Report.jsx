import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import { Box, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";
import AdminTable from "../admin/AdminTable";
import { apiUtility } from "../../components/repo/api";
import ExportTable from "../utils/ExportTable";
import { AuthContext } from "../../contexts/auth";


const LabReport = () => {

  const [pendinglabTests, setPendingLabTests] = useState([]);
  const [activelabTests, setActiveLabTests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useContext(AuthContext);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    try {
      const pending = await apiUtility.get("/labtest/getLabTestRequest/" + user.userName);
      const active = await apiUtility.get("/labtest/getLabTestRequestApproved/" + user.userName);

      if (pending.status) setPendingLabTests(pending.data);
      if (active.status) setActiveLabTests(active.data);
    } catch (err) {
      setError("Unable to fetch lab tests");
    }
  };

  const columns = [
    { label: "Patient ID", field: "_id" },
    { label: "Record ID", field: "TestID" },
    { label: "Full Name", field: "patientName" },
    { label: "Date Of Birth", field: "DateOfBirth" },
    { label: "Gender", field: "Gender" },
    { label: "City", field: "City" },
    { label: "subCity", field: "patientSubCity" },
    { label: "Woreda", field: "patientWoreda" },
    { label: "House Number", field: "patientHouseNumber" },
    { label: "Emergency Contact", field: "patientEmergencyContact" },
    { label: "Email", field: "patientEmail" },
    { label: "Phone Number", field: "patientPhone" },
    { label: "Status", field: "status" },
  ];

  return (
    <>
      <div>
        <h1 className="m-5 text-5xl font-semibold text-gray-800">
          Lab Reports
        </h1>
      </div>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Pending Lab Test Requests" />
        <Tab label="Updated Lab Test Requests" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ m: "16", p: 5 }}>
          {/* <Typography variant="h5">Pending Lab Test Requests</Typography> */}
          <ExportTable data={[]} fileName="Pending_Lab_Test_Requests" />
          <AdminTable data={pendinglabTests} columns={columns} />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ m: "16", p: 5 }}>
          {/* <Typography variant="h5">Updated Lab Test Requests</Typography> */}
          <ExportTable data={[]} fileName="Updated_Lab_Test_Requests" />
          <AdminTable data={activelabTests} columns={columns} />
        </Box>
      )}
    </>
  );
};

export default LabReport;
