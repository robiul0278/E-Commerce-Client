
import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useUserData from "../../hooks/useUserData";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiStickyNoteAddLine } from "react-icons/ri";


const buyerRoutes = [
  {
    id: 1,
    title: "My Wishlist",
    route: "/dashboard",
    icon: <MdOutlineInventory2 />
  },
]
const adminRoutes = [
  {
    id: 1,
    title: "Manage Users",
    route: "/dashboard/manage-users",
    icon: <MdOutlineInventory2 />
  },
  {
    id: 2,
    title: "Add Product",
    route: "/dashboard/add-product",
    icon: <RiStickyNoteAddLine />
  },
  {
    id: 3,
    title: "Manage Product",
    route: "/dashboard/manage-products",
    icon: <MdOutlineInventory2 />
  }
]

const Sidebar = () => {
  const { user, Logout } = useAuth();
  const userData = useUserData();
  // console.log(user)
  const handleLogout = () => {
    Logout();
  }

  return (
    <nav
      className="bg-[#2e2e48] shadow-lg h-screen fixed top-0 left-0  py-6 px-10 font-[sans-serif] flex flex-col overflow-auto">

      <div className="flex flex-wrap items-center cursor-pointer pb-5">
        <div className="relative">
          <img src={`${user?.photoURL || "/profile.png"}`} className="w-12 h-12 rounded-full border-white" />
          <span className="h-3 w-3 rounded-full bg-green-600 border-2 border-white block absolute bottom-0 right-0"></span>
        </div>

        <div className="ml-4">
          <p className="text-sm text-gray-300">{user?.displayName || "Mr. Alex"}</p>
        </div>
      </div>

      <ul className="space-y-10 flex-1 mt-4 mb-10">
        <li>
          <a href="javascript:void(0)" className="text-gray-300 hover:text-white text-sm flex items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
              viewBox="0 0 512 512">
              <path
                d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                data-original="#000000" />
            </svg>
            <NavLink to="/dashboard/overview">Overview</NavLink>
          </a>
        </li>
        {userData?.role === "buyer" &&
          buyerRoutes.map((route) => (
            <li key={route.id}>
              <NavLink
                to={route.route}
                className="text-gray-300 hover:text-white text-sm flex items-center rounded-md"
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
                className="text-gray-300 hover:text-white text-sm flex items-center rounded-md"
              >
                {route.icon}
                <span className="ml-2">{route.title}</span>
              </NavLink>
            </li>
          ))}
      </ul>

      <ul className="space-y-6 flex-2 mb-5">
        <li>
          <a href="javascript:void(0)" className="text-gray-300 hover:text-white text-sm flex items-center rounded-md">
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
          <a href="javascript:void(0)" className="text-gray-300 hover:text-white text-sm flex items-center rounded-md">
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