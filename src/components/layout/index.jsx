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
        path="/signin"
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
        className={`flex flex-col justify-between flex-grow overflow-y-auto`}
      >
        <NavBar />
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
      <Route path="/" element={<ProtectedRoute />} />
      <Route path="/manage-patients" element={<ProtectedRoute />} />
      <Route path="/manage-health-center" element={<ProtectedRoute />} />
      <Route path="/manage-user" element={<ProtectedRoute />} />
      <Route path="/settings" element={<ProtectedRoute />} />
      <Route path="/referrals" element={<ProtectedRoute />} />
      <Route path="/labtestandprescription" element={<ProtectedRoute />} />
      <Route path="/report" element={<ProtectedRoute />} />
    </Routes>
  );
}

export default Layout;
