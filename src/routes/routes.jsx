import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Overview from "../pages/dashboard/Overview";

import Products from "../pages/products/Products";
import AddProduct from "../pages/dashboard/seller/AddProduct";
import SellerPrivateRoute from "./SellerPrivateRoute";
import BuyerPrivateRoute from "./BuyerPrivateRoute";
import MyWishlist from "../pages/dashboard/buyer/MyWishlist";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ManageUser from "../pages/dashboard/admin/ManageUser";
import Cart from "../pages/products/Cart";
import Checkout from "../pages/checkout/Checkout";
import ManageProducts from "../pages/dashboard/seller/ManageProducts";


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
                path: "/products",
                element: <Products />
            },
            {
                path: "/cart",
                element: <Cart />
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
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
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
                path: "/dashboard/overview",
                element: <Overview />
            },
            // Admin Route 
            {
                path: "/dashboard/manage-users", element:
                    <AdminPrivateRoute>
                        <ManageUser />
                    </AdminPrivateRoute>
            },
            // Seller Route 
            {
                path: "/dashboard/add-product",
                element:
                    <SellerPrivateRoute>
                        <AddProduct />
                    </SellerPrivateRoute>
            },
            {
                path: "/dashboard/manage-products",
                element:
                    <SellerPrivateRoute>
                        <ManageProducts />
                    </SellerPrivateRoute>

            },
            // Buyer Route 
            {
                path: "/dashboard/my-wishlist",
                element:
                    <BuyerPrivateRoute>
                        <MyWishlist />
                    </BuyerPrivateRoute>
            }
        ]
    }
])