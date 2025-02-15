import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Checkout from "../pages/checkout/Checkout";
import AuthLogin from "../pages/AuthLogin";
import AuthRegister from "../pages/AuthRegister";
import Shop from "../pages/shop/Shop";
import ProductView from "../pages/ProductView";
import ManageUser from "../pages/dashboard/admin/ManageUser";
import ManageProducts from "../pages/dashboard/admin/ManageProduct";
import AddProduct from "../pages/dashboard/admin/AddProduct";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import Profile from "../pages/dashboard/Profile";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import OverView from "../pages/dashboard/admin/OverView";
import FlashSale from "../pages/dashboard/admin/FlashSale";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/shop",
                element: <Shop />
            },
            {
                path: "/view/:id",
                element: <ProductView />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/login",
                element: <AuthLogin/>
            },
            {
                path: "/register",
                element: <AuthRegister />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/profile",
                element: <Profile />
            },
            {
                path: "/dashboard/overview", 
                element:
                    <AdminPrivateRoute>
                        <OverView />
                    </AdminPrivateRoute>
            },
            {
                path: "/dashboard/flash-sale", 
                element:
                    <AdminPrivateRoute>
                        <FlashSale />
                    </AdminPrivateRoute>
            },
            {
                path: "/dashboard/manage-users", 
                element:
                    <AdminPrivateRoute>
                        <ManageUser />
                    </AdminPrivateRoute>
            },
            {
                path: "/dashboard/add-product",
                element:
                    <AdminPrivateRoute>
                        <AddProduct />
                    </AdminPrivateRoute>
            },
            {
                path: "/dashboard/manage-products",
                element:
                    <AdminPrivateRoute>
                        <ManageProducts />
                    </AdminPrivateRoute>

            },
            {
                path: "/dashboard/manage-orders",
                element:
                    <AdminPrivateRoute>
                        <ManageOrders />
                    </AdminPrivateRoute>

            },
            {
                path: "/dashboard/my-order",
                element: <OrderDetails />
            },
        ]
    }
])