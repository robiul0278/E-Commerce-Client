import { NavLink, useNavigate } from "react-router-dom";
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
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li>
                <NavLink to="/dashboard/overview">Dashboard</NavLink>
                </li>
                <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </ul>
        </div>
    )
}

export default NavActiveUser;