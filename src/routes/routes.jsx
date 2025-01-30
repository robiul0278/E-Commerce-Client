import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home/HomePage";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Overview from "../pages/dashboard/Overview";
import Products from "../pages/products/Products";
import AddProduct from "../pages/dashboard/seller/AddProduct";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ManageUser from "../pages/dashboard/admin/ManageUser";
import Checkout from "../pages/checkout/Checkout";
import ManageProducts from "../pages/dashboard/seller/ManageProducts";
import AuthLogin from "../pages/AuthLogin";
import AuthRegister from "../pages/AuthRegister";
import Shop from "../pages/shop/Shop";
import ProductView from "../pages/ProductView";
import MyWishlist from "../pages/MyWishlist";


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
                path: "/shop",
                element: <Shop />
            },
            {
                path: "/view/:id",
                element: <ProductView />
            },
            {
                path: "/my-wishlist",
                element: <MyWishlist />
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
                path: "/dashboard/overview",
                element: <Overview />
            },
            {
                path: "/dashboard/manage-users", element:
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

        ]
    }
])