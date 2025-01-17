import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { RoleBasedViews } from "../../Pages/view";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  console.log("the user: ", user);
  const location = useLocation();

  try {
    return RoleBasedViews[user.role].routes[location.pathname].component;
  } catch {
    return <Navigate to="/403" />;
  }
};

export { ProtectedRoute };
