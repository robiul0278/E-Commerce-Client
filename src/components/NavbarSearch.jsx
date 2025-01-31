import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavbarSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/shop?search=${searchTerm}`);
        }
    };

    return (
        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto bg-[#F5F5F5] border-none rounded-md overflow-hidden">
        <input
            type="text"
            placeholder="Search Gadgets..."
            className="w-full px-4 py-2 text-sm sm:text-base outline-none bg-[#F5F5F5]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
        />
        <button
            type="button"
            className="px-4 py-2 sm:px-5 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
            onClick={() => handleSearch(searchTerm)}
        >
            <IoSearch size={20} />
        </button>
    </div>
    );
};

export default NavbarSearch;
