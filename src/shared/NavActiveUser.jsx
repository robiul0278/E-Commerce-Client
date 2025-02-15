import {Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import useUserData from "../hooks/useUserData";

const NavActiveUser = () => {
    const {Logout } = useAuth();
    const [userData] = useUserData();
    const navigate = useNavigate()

    const handleLogout = () => {
        Logout();
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <div className="dropdown dropdown-end ">
            <button type="button" tabIndex={0}>
                <div className="lg:w-8 w-7 rounded-full">
                    <img
                        className="rounded-full "
                        src={`${userData?.photoURL || "/profile.png"}`}
                    />
                </div>
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border">
                <li className="mb-2">
                <Link to="/dashboard/profile">Profile</Link>
                </li>
                {userData.role === "admin" ? <li className="mb-2">
                <NavLink to="/dashboard/overview">Dashboard</NavLink>
                </li> : <li className="mb-2">
                <NavLink to="/dashboard/profile">Dashboard</NavLink>
                </li>}
                <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </ul>
        </div>

    )
}

export default NavActiveUser;