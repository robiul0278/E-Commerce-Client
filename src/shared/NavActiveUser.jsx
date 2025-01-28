import {NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const NavActiveUser = () => {
    const { user, Logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        Logout();
        navigate("/login");
    }
    return (
        <div className="dropdown dropdown-end">
            <button type="button" tabIndex={0}>
                <div className="lg:w-8 w-7 rounded-full">
                    <img
                        className=""
                        alt="Tailwind CSS Navbar component"
                        src={`${user?.photoURL || "/profile.png"}`}
                    />
                </div>
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                <div className="dropdown dropdown-end mr-6">
                </div>
                </li>
                <li className="mb-2">
                <NavLink to="/">Profile</NavLink>
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