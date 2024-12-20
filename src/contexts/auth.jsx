import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [station, setStation] = useState("");
  const [userStationId, setUserStationId] = useState("");
  const [roles, setRoles] = useState("");
 console.log("user:",user)
  useEffect(() => {
    if (user) {
      return;
    }

    try {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      setUser(decodedToken.data);
    } catch (error) {
      navigate("/signin");
    }

  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userStationId,
        setUserStationId,
        station,
        setStation,
        roles,
        setRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };