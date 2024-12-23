/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import useUserData from "../hooks/useUserData";

const SellerPrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const userData = useUserData();
    const location = useLocation();

    if (loading || !userData?.role) {
        return <Loading />;
    }
  if (user && userData?.role === "seller") {
    return children;
  }
  return <Navigate to="/" state={{from: location}} replace />;
}
export default SellerPrivateRoute;