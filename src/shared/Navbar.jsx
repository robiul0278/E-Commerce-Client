import useAuth from '../hooks/useAuth';
import NavActiveUser from './NavActiveUser';
import { NavLink } from 'react-router-dom';
import { LuCircleUserRound, LuShoppingCart } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import Cart from '../components/Cart';
import MyWishlist from '../components/MyWishlist';
import NavbarSearch from '../components/NavbarSearch';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isWishlistOpen, setWishlistOpen] = useState(false);
    const cart = useSelector((state) => state.cart.products)
    const wishlist = useSelector((state) => state.wishlist.products);

    // responsive menu 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // open Cart
    const setIsCartOpen = () => {
        setCartOpen(!isCartOpen);
    };
    // open wishlist 
    const setIsWishlistOpen = () => {
        setWishlistOpen(!isWishlistOpen);
    };

    return (
        <section className="sticky bg-white top-0  z-50">
            <header className="flex flex-col shadow-sm shadow-slate-300">
                {/* Navbar Header Section */}
                <div className="bg-[#49B2FF] text-white items-center justify-center w-full py-1 text-center">
                    <h2 className="text-[10px] lg:text-[12px]">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                        <a
                            href="/shop"
                            className="underline ml-1 hover:text-yellow-300"
                        >
                            Shop Now
                        </a>
                    </h2>
                </div>

                {/* Main Navbar Section */}
                <div className="flex lg:w-[1170px] mx-auto items-center justify-between w-full  lg:px-2 py-3 bg-white">
                    {/* Logo Section */}
                    <div className='ml-2'>
    <a href="/" className="font-bold text-xl sm:text-2xl md:text-3xl text-[#49B2FF]">
        E-Commerce
    </a>
</div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex">
                        <li className="px-3">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? 'text-[#49B2FF] text-[15px] block font-semibold' : 'text-[#333] text-[15px] block font-semibold hover:text-[#49B2FF] transition duration-300'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="px-3">
                            <NavLink
                                to="/shop"
                                className={({ isActive }) =>
                                    isActive ? 'text-[#49B2FF] text-[15px] block font-semibold' : 'text-[#333] hover:text-[#49B2FF] text-[15px] block font-semibold transition duration-300'
                                }
                            >
                                Shop
                            </NavLink>
                        </li>
                        <li className="px-3">
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive ? 'text-[#49B2FF] text-[15px] block font-semibold' : 'text-[#333] hover:text-[#49B2FF] text-[15px] block font-semibold transition duration-300'
                                }
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li className="px-3">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? 'text-[#49B2FF] text-[15px] block font-semibold' : 'text-[#333] hover:text-[#49B2FF] text-[15px] block font-semibold transition duration-300'
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>


                    {/* Search, Wishlist, and Cart */}
                    <div className="flex items-center gap-x-6 gap-y-4">
                        <div className='lg:flex md:flex hidden'> <NavbarSearch /></div>
                        <div className="flex items-center space-x-6 pr-3">
                            {/* Wishlist */}
                            <button onClick={() => setIsWishlistOpen(true)} className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                <div className="relative">
                                    <Heart size={18} />
                                    <span className="absolute left-auto ml-1 -top-2.5 rounded-full bg-[#49B2FF] px-1 py-0 text-[10px] text-white">
                                        {wishlist?.length > 0 ? wishlist?.length : 0}
                                    </span>
                                </div>
                            </button>
                            {/* Cart */}
                            <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                            >
                                <div className="relative">
                                    <LuShoppingCart size={20} />
                                    <span className="absolute left-auto ml-1 -top-2.5 rounded-full bg-[#49B2FF] px-1 py-0 text-[10px] text-white">
                                        {cart?.length > 0 ? cart?.length : 0}
                                    </span>
                                </div>
                            </button>

                            {/* User Account */}
                            {user ? (
                                <NavActiveUser />
                            ) : (
                                <div>
                                    <NavLink to="/login">
                                        <LuCircleUserRound size={25} />
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Icon */}
                        <button
                            className="block lg:hidden text-2xl pr-2"
                            onClick={toggleMenu}
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={toggleMenu}
                ></div>
                <div
                    className={`fixed top-0 right-0 h-full w-10/12 bg-white z-50 transform transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                    <ul className="mt-10 space-y-2 w-full text-start p-4">
                        <li>
                            <NavLink
                                to="/"
                                className="text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <hr />
                        <li>
                            <NavLink
                                to="/shop"
                                className="text-[#333] hover:text-[#49B2FF] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Shop
                            </NavLink>
                        </li>
                        <hr />
                        <li>
                            <NavLink
                                to="/contact"
                                className="text-[#333] hover:text-[#49B2FF] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <hr />
                        <li>
                            <NavLink
                                to="/about"
                                className="text-[#333] hover:text-[#49B2FF] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                About
                            </NavLink>

                        </li>
                        <hr />
                        <li>
                            <NavbarSearch />
                        </li>
                    </ul>
                </div>
            </header>
            {/* Shopping Cart Modal */}
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
            {isWishlistOpen && <MyWishlist onClose={() => setIsWishlistOpen(false)} />}
        </section>
    );
};

export default Navbar;
