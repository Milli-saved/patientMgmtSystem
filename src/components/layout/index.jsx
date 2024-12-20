import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import Signin from "../../Pages/auth/signin";

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
    </Routes>
  );
}

export default Layout;
