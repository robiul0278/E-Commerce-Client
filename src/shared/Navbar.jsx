import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavActiveUser from "./NavActiveUser";
import useUserData from "../hooks/useUserData";
import { FaRegHeart } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
const Navbar = () => {
    const { user } = useAuth();
    const userData = useUserData();



    return (
        <div className="navbar bg-base-200 flex justify-between px-16">
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products">Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
               <Link to="/"> <h2 className="btn btn-ghost font-bold text-xl">Mobile shop</h2></Link>
            </div>
            <div className="navbar-center absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact Us</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end mr-6">
                    <Link to="/cart">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator text-2xl">
                        <BsCartPlus />
                            <span className="badge text-blue-600 badge-sm font-serif
                            font-bold indicator-item">{userData?.cart?.length || 0}</span>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="dropdown dropdown-end mr-6">
                    <Link to="/dashboard/my-wishlist">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator text-2xl">
                                <FaRegHeart />
                                <span className="badge text-blue-600 badge-sm font-serif
                            font-bold indicator-item">{userData?.wishlist?.length || 0}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                {
                    user ?
                        (
                            <NavActiveUser />
                        ) :
                        (
                            <div>
                                <Link to="/login">
                                    <button className="font-semibold btn btn-outline">
                                        My Account
                                    </button>
                                </Link>
                            </div>
                        )
                }


            </div>
        </div>
    )
}

export default Navbar;
