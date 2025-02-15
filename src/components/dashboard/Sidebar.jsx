
import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useUserData from "../../hooks/useUserData";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";


const userRoutes = [
  {
    id: 1,
    title: "My Profile",
    route: "/dashboard/profile",
    icon:  <CiViewTable size={22} className="mr-1" />
  },
  {
    id: 2,
    title: "My Order",
    route: "/dashboard/my-order",
    icon: <MdOutlineInventory2 size={22} />
  },
]
const adminRoutes = [
  {
    id: 1,
    title: "Overview",
    route: "/dashboard/overview",
    icon: <MdOutlineInventory2 size={20} />
  },
  {
    id: 2,
    title: "Manage Orders",
    route: "/dashboard/manage-orders",
    icon: <MdOutlineInventory2 size={20} />
  },
  {
    id: 3,
    title: "Add Product",
    route: "/dashboard/add-product",
    icon: <RiStickyNoteAddLine size={20} />
  },
  {
    id: 3,
    title: "Flash Sale",
    route: "/dashboard/flash-sale",
    icon: <RiStickyNoteAddLine size={20} />
  },
  {
    id: 4,
    title: "Manage Product",
    route: "/dashboard/manage-products",
    icon: <MdOutlineInventory2 size={20} />
  },
  {
    id: 5,
    title: "Manage Users",
    route: "/dashboard/manage-users",
    icon: <MdOutlineInventory2 size={20} />
  },

]

const Sidebar = () => {
  const { Logout } = useAuth();
  const [userData, isLoading,] = useUserData();
  const handleLogout = () => {
    Logout();
  }

  return (
    <nav
      className=" h-screen fixed top-0 left-0  py-6 px-10 font-[sans-serif] flex flex-col overflow-auto">
      <div className="flex flex-wrap items-center cursor-pointer pb-5">
        <div className="relative">
          <img src={`${userData?.photoURL || "/profile.png"}`} className="w-12 h-12 rounded-full border-white" />
          <span className="h-3 w-3 rounded-full bg-green-600 border-2 border-white block absolute bottom-0 right-0"></span>
        </div>
        <div className="ml-4">
          <p className="text-sm text-white font-semibold">{userData?.name || "Mr. Alex"}</p>
        </div>
      </div>

      <ul className="space-y-10 flex-1 mt-4 mb-10 ">
        {!isLoading ? <>
          {userData?.role === "user" &&
            userRoutes.map((route) => (
              <li key={route.id}>
                <NavLink
                  to={route.route}
                  className="text-white  hover:text-white text-sm flex items-center rounded-md"
                >
                  {route.icon}
                  <span className="ml-2">{route.title}</span>
                </NavLink>
              </li>
            ))}
          {userData?.role === "admin" &&
            adminRoutes.map((route) => (
              <li key={route.id}>
                <NavLink
                  to={route.route}
                  className="text-white hover:text-white text-sm flex items-center rounded-md"
                >
                  {route.icon}
                  <span className="ml-1">{route.title}</span>
                </NavLink>
              </li>
            ))}
        </> : <>
          <li className="skeleton h-4 w-full"></li>
          <li className="skeleton h-4 w-full"></li>
        </>}
      </ul>
      <ul className="space-y-6 flex-2 mb-5">
        <li>
          <a href="javascript:void(0)" className="text-white hover:text-white text-sm flex items-center rounded-md">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-[20px] h-[20px] mr-4"
            >
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
            </svg>
            <NavLink to="/">Home</NavLink>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" className="text-white hover:text-white text-sm flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
              viewBox="0 0 6.35 6.35">
              <path
                d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                data-original="#000000" />
            </svg>
            <span onClick={() => handleLogout()}>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar