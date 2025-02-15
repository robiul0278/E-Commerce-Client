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
        <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto bg-[#F5F5F5] overflow-hidden">
        <input
            type="text"
            placeholder="search products..."
            className="w-full px-4 py-2 sm:text-base outline-none bg-[#F5F5F5]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
        />
        <button
            type="button"
            className="px-4 py-2 sm:px-5 bg-[#49B2FF] hover:bg-[#2f91d7] transition duration-300 text-white flex items-center justify-center"
            onClick={() => handleSearch(searchTerm)}
        >
            <IoSearch size={20} />
        </button>
    </div>
    );
};

export default NavbarSearch;
