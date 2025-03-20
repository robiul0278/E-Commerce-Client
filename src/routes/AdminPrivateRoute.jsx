/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import useUserData from "../hooks/useUserData";

const AdminPrivateRoute = ({ children }) => {
    const [userData, isLoading] = useUserData();
    const location = useLocation();

    // Show loading screen if data is still being fetched
    if (isLoading) {
        return <Loading />;
    }

    // Check if user has the admin role
    if (userData?.data?.role === "admin") {
        return children;
    }

    // Redirect non-admin users to home page
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;
