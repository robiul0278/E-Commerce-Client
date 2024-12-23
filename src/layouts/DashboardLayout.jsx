import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#2e2e48] shadow-lg h-screen fixed top-0 left-0 py-6 px-10 font-[sans-serif] flex flex-col overflow-auto z-50 transition-transform transform ${
                    isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-16"
                } md:translate-x-0 md:w-64`}
            >
                <Sidebar />
            </div>

            {/* Toggle Button (Visible only on mobile devices) */}
            <button
                className={`absolute top-6 transform -translate-y-1/2 bg-gray-800 text-white  rounded-full shadow-lg z-50 transition-all md:hidden ${
                    isSidebarOpen ? "left-60" : "left-4"
                }`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <span className="material-icons">chevron_left</span>
                ) : (
                    <span className="material-icons">chevron_right</span>
                )}
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all bg-gray-100 overflow-y-auto ${
                    isSidebarOpen ? "ml-64" : ""
                } md:ml-64`}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
