import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { useGetMyUserDataQuery } from "../redux/api/api";

const NavActiveUser = () => {
    const {Logout } = useAuth();
    const {user} = useAuth();
    const {data: userData} = useGetMyUserDataQuery(user?.email);
    const navigate = useNavigate()

    const handleLogout = () => {
        Logout();
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <div className="dropdown dropdown-end ">
            <button type="button" tabIndex={0}>
                <div className="rounded-full border-2 border-blue-600">
                    <img
                        className="rounded-full w-8 h-8 object-cover"
                        src={`${userData?.data?.photoURL || "/profile.png"}`}
                    />
                </div>
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border">
                {userData?.data?.role === "admin" ? <li className="mb-2">
                <NavLink to="/dashboard/overview">Dashboard</NavLink>
                </li> : <li className="mb-2">
                <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>}
                <li><button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button></li>
            </ul>
        </div>

    )
}

export default NavActiveUser;