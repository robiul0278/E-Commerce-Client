import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { FaRegHeart } from "react-icons/fa6";
import useUserData from "../hooks/useUserData";

const NavActiveUser = () => {
    const { user, Logout } = useAuth();
    const userData = useUserData();
    const navigate = useNavigate()

    const handleLogout = () => {
        Logout();
        navigate("/login");
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={`${user?.photoURL || "/profile.png"}`}
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                <div className="dropdown dropdown-end mr-6">
                    <Link to="/dashboard/my-wishlist">

                            <div className="indicator">
                                My Wishlist <FaRegHeart />
                                <span className="badge text-blue-600 badge-sm font-serif
                            font-bold indicator-item">{userData?.wishlist?.length || 0}</span>
                            </div>
                    </Link>
                </div>
                </li>
                <li className="mb-2">
                <NavLink to="/dashboard/overview">Dashboard</NavLink>
                </li>
                <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </ul>
        </div>
    )
}

export default NavActiveUser;