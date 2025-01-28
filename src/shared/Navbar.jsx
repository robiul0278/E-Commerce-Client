import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import NavActiveUser from './NavActiveUser';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa6';
import { LuCircleUserRound, LuShoppingCart } from 'react-icons/lu';
import { IoClose, IoSearch } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

const Navbar = () => {
    const { user } = useAuth();
    const userData = useUserData();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="sticky bg-white top-0  z-50">
            <header className="flex flex-col shadow-sm">
                {/* Navbar Header Section */}
                <div className="bg-black text-white items-center justify-center w-full py-1 text-center">
                    <h2 className="text-[10px] lg:text-[12px]">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                        <a
                            href="/shop"
                            className="underline font-bold ml-1 hover:text-yellow-300"
                        >
                            Shop Now
                        </a>
                    </h2>
                </div>

                {/* Main Navbar Section */}
                <div className="flex lg:w-[1170px] mx-auto items-center justify-between w-full  lg:px-0 p-1 bg-white">
                    {/* Logo Section */}
                    <div>
                        <a href="/" className="max-sm">
                            <img
                                src="https://i.ibb.co/71L9XbW/gadgets-1.png"
                                alt="logo"
                                className="lg:w-36 w-24"
                            />
                        </a>
                        <a href="/" className="hidden">
                            <img
                                src="https://i.ibb.co/5BY0SRK/Untitled-design.png"
                                alt="logo"
                                className="w-16"
                            />
                        </a>
                    </div>
                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex">
                        <li className="px-3">
                            <Link
                                to="/"
                                className="text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="px-3">
                            <Link
                                to="/products"
                                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
                            >
                                Shop
                            </Link>
                        </li>
                        <li className="px-3">
                            <Link
                                to="/contact"
                                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="px-3">
                            <Link
                                to="/about"
                                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    {/* Search, Wishlist, and Cart */}
                    <div className="flex items-center gap-x-6 gap-y-4">
                        <div className="lg:flex md:flex border-none overflow-hidden rounded-md max-w-[243px] mx-auto bg-[#F5F5F5] hidden ">
                            <input
                                type="text"
                                placeholder="Search Something..."
                                className="w-full outline-none px-5 py-3 bg-[#F5F5F5] text-[12px]"
                            />
                            <button type="button" className="flex items-center justify-center px-3">
                                <IoSearch size={18} />
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Wishlist */}
                            <Link to="/dashboard/my-wishlist" aria-label="Wishlist">
                                <div className="flex flex-col items-center justify-center cursor-pointer">
                                    <div className="relative">
                                        <FaRegHeart size={18} />
                                        <span className="absolute left-auto ml-2 -top-3 rounded-full bg-[#DB4444] px-1 py-0 text-[10px] text-white">
                                            {userData?.wishlist?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" aria-label="Cart">
                                <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                    <div className="relative">
                                        <LuShoppingCart size={20} />
                                        <span className="absolute left-auto ml-2 -top-2.5 rounded-full bg-[#DB4444] px-1 py-0 text-[10px] text-white">
                                            {userData?.cart?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* User Account */}
                            {user ? (
                                <NavActiveUser />
                            ) : (
                                <div>
                                    <Link to="/login">
                                        <LuCircleUserRound size={25} />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Icon */}
                        <button
                            className="block lg:hidden text-2xl"
                            onClick={toggleMenu}
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={toggleMenu}
                ></div>
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-2xl focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <IoClose />
                    </button>

                    {/* Menu Items */}
                    <ul className="mt-10 space-y-6 text-center">
                        <li>
                            <Link
                                to="/"
                                className="text-[#007bff] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </section>
    );
};

export default Navbar;
