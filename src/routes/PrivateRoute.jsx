/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();


  if (!user?.email) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoute;