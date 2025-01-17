import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { RoleBasedViews } from "../../Pages/view";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log("the user: ", user);

  if (!user || !user.role) {
    return <Navigate to="/" />;
  }

  try {
    return RoleBasedViews[user.role].routes[location.pathname].component;
  } catch (error) {
    console.error("Error in ProtectedRoute:", error);
    return <Navigate to="/403" />;
  }
};

export { ProtectedRoute };
