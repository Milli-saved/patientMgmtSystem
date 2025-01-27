import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import Signin from "../../Pages/auth/signin";
import NavigationSideBar from "../NavigationSidebar/index";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "../NavBar";
import ResetPassword from "../../Pages/auth/ResetPassword";

function Layout() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Signin />
          </AuthProvider>
        }
      />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route
        path="*"
        element={
          <AuthProvider>
            <ResponsiveLayout />
          </AuthProvider>
        }
      />
    </Routes>
  );
}

function ResponsiveLayout() {
  return (
    <div className="flex h-screen">
      <NavigationSideBar />
      <div
        className={`flex flex-col justify-between flex-grow overflow-y-auto mt-16`}
      >
        {/* <NavBar /> */}
        <main className="flex-grow font-work">
          <AuthenticatedRoutes />
        </main>
      </div>
    </div>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedRoute />} />
      <Route path="/manage-patients" element={<ProtectedRoute />} />
      <Route path="/manage-health-center" element={<ProtectedRoute />} />
      <Route path="/manage-user" element={<ProtectedRoute />} />
      <Route path="/settings" element={<ProtectedRoute />} />
      <Route path="/referrals" element={<ProtectedRoute />} />
      <Route path="/labtestandprescription" element={<ProtectedRoute />} />
      <Route path="/report" element={<ProtectedRoute />} />
      <Route path="/assignpatienttodocs" element={<ProtectedRoute />} />
      <Route path="/referralslist" element={<ProtectedRoute />} />
      <Route path="/feedback" element={<ProtectedRoute />} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/reset" element={<ProtectedRoute/>} />
      <Route path="/appointment" element={<ProtectedRoute/>} />
      <Route path="/prescription" element={<ProtectedRoute/>} />
      <Route path="/dynamicreport" element={<ProtectedRoute/>} />
      <Route path="/addpatameter" element={<ProtectedRoute/>} />
      <Route path="/activatepatient" element={<ProtectedRoute/>} />
    </Routes>
  );
}

export default Layout;
