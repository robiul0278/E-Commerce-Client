/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import { useGetMyUserDataQuery } from "../redux/api/api";
import useAuth from "../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
    const {user} = useAuth();
    const {data: userData, isLoading} = useGetMyUserDataQuery(user?.email);
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
