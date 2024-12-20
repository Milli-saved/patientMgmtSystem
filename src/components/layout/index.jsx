import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import Signin from "../../Pages/auth/signin";
import NavigationSideBar from "../NavigationSidebar/index";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "../NavBar";

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
        <main className="flex-grow">
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
    </Routes>
  );
}

export default Layout;
