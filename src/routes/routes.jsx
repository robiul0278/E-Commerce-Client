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
import Profile from "../dashboard/user/Profile";
import MyOrder from "../dashboard/user/MyOrder";
import ManageUser from "../dashboard/admin/ManageUser";
import AddProduct from "../dashboard/admin/AddProduct";
import ManageProducts from "../dashboard/admin/ManageProduct";
import ManageOrders from "../dashboard/admin/ManageOrders";
import OverView from "../dashboard/admin/OverView";
import FlashSale from "../dashboard/admin/FlashSale";


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
                path: "/dashboard/my-order",
                element: <MyOrder />
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
        ]
    }
])