
import { NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useUserData from "../../hooks/useUserData";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiStickyNoteAddLine } from "react-icons/ri";

const sellerRoutes = [
  {
    id: 1,
    title: "Manage Product",
    route: "/dashboard/manage-products",
    icon: <MdOutlineInventory2 />
  },
  {
    id: 2,
    title: "Add Product",
    route: "/dashboard/add-product",
    icon: <RiStickyNoteAddLine />
  },
]
const buyerRoutes = [
  {
    id: 1,
    title: "My Wishlist",
    route: "/dashboard/my-wishlist",
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
        {userData?.role === "seller" &&
    sellerRoutes.map((route) => (
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

        {/* <li>
        <a href="javascript:void(0)" className="text-gray-300 hover:text-white text-sm flex items-center rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
            viewBox="0 0 512 512">
            <path
              d="M122.39 165.78h244.87c10.49 0 19-8.51 19-19s-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19zm164.33 99.44c0-10.49-8.51-19-19-19H122.39c-10.49 0-19 8.51-19 19s8.51 19 19 19h145.33c10.49 0 19-8.51 19-19z"
              data-original="#000000" />
            <path
              d="M486.63 323.71c2.04-22.33 3.41-48.35 3.44-78.68-.06-57.07-4.85-98.86-9.96-129.57-8.94-50.6-54.9-96.56-105.5-105.5C343.9 4.85 302.11.06 245.03 0c-57.07.06-98.87 4.85-129.58 9.96C64.86 18.9 18.9 64.86 9.96 115.46 4.85 146.17.07 187.96 0 245.03c.07 57.07 4.85 98.87 9.96 129.58 8.94 50.6 54.9 96.56 105.5 105.5 30.71 5.11 72.5 9.89 129.58 9.96 30.32-.03 56.34-1.4 78.66-3.44 19.84 15.87 45 25.37 72.38 25.37 64.02 0 115.93-51.9 115.93-115.92 0-27.38-9.5-52.54-25.37-72.37zM245.04 452.07c-45.02-.05-85.3-3.13-123.13-9.41-16.81-3.01-33.84-12.44-47.95-26.55s-23.53-31.13-26.55-47.95c-6.28-37.79-9.35-78.07-9.41-123.13.05-45.04 3.13-85.32 9.41-123.13 3.01-16.81 12.44-33.83 26.55-47.94s31.13-23.53 47.95-26.55C159.72 41.13 200 38.06 245.04 38c45.02.05 85.3 3.13 123.13 9.41 16.81 3.01 33.83 12.44 47.95 26.55 14.11 14.11 23.53 31.13 26.55 47.95 6.28 37.83 9.35 78.1 9.41 123.13-.02 16.9-.48 33.11-1.36 48.79-16.28-8.72-34.88-13.66-54.64-13.66-64.02 0-115.93 51.9-115.93 115.92 0 19.76 4.95 38.35 13.66 54.63-15.68.88-31.89 1.34-48.78 1.35zM396.08 474c-42.97 0-77.93-34.95-77.93-77.92s34.96-77.92 77.93-77.92 77.93 34.95 77.93 77.92S439.05 474 396.08 474z"
              data-original="#000000" />
            <path
              d="M406.28 418.24c-2.42-.4-5.71-.78-10.2-.78s-7.78.38-10.2.78c-3.98.7-7.6 4.32-8.31 8.31-.4 2.42-.78 5.71-.78 10.2s.38 7.78.78 10.2c.7 3.98 4.32 7.6 8.31 8.31 2.42.4 5.71.78 10.2.78s7.78-.38 10.2-.78c3.98-.7 7.6-4.32 8.31-8.31.4-2.42.78-5.71.78-10.2s-.38-7.78-.78-10.2c-.7-3.98-4.32-7.6-8.31-8.31zm-10.21-12.61c10.49 0 19-8.51 19-19v-31.7c0-10.49-8.51-19-19-19s-19 8.51-19 19v31.7c0 10.49 8.51 19 19 19z"
              data-original="#000000" />
          </svg>
          <NavLink to="/dashboard/add-product">Add Product</NavLink>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" className="text-gray-300 hover:text-white text-sm flex items-center rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
            viewBox="0 0 511.414 511.414">
            <path
              d="M497.695 108.838a16.002 16.002 0 0 0-9.92-14.8L261.787 1.2a16.003 16.003 0 0 0-12.16 0L23.639 94.038a16 16 0 0 0-9.92 14.8v293.738a16 16 0 0 0 9.92 14.8l225.988 92.838a15.947 15.947 0 0 0 12.14-.001c.193-.064-8.363 3.445 226.008-92.837a16 16 0 0 0 9.92-14.8zm-241.988 76.886-83.268-34.207L352.39 73.016l88.837 36.495zm-209.988-51.67 71.841 29.513v83.264c0 8.836 7.164 16 16 16s16-7.164 16-16v-70.118l90.147 37.033v257.797L45.719 391.851zM255.707 33.297l55.466 22.786-179.951 78.501-61.035-25.074zm16 180.449 193.988-79.692v257.797l-193.988 79.692z"
              data-original="#000000" />
          </svg>
          <NavLink to="/dashboard/my-products">My Product</NavLink>
        </a>
      </li> */}
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