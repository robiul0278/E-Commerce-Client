import useAuth from '../hooks/useAuth';
import NavActiveUser from './NavActiveUser';
import { Link} from 'react-router-dom';
import { LuCircleUserRound, LuShoppingCart } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import Cart from '../components/Cart';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import MyWishlist from '../components/MyWishlist';
import NavbarSearch from '../components/NavbarSearch';

const Navbar = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isWishlistOpen, setWishlistOpen] = useState(false);
    const [cart] = useCart();
    const [wishlist] = useWishlist();

    // Search Term 

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
                                to="/shop"
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
                       <div className='lg:flex md:flex hidden'> <NavbarSearch/></div>
                        <div className="flex items-center space-x-4">
                            {/* Wishlist */}
                            <button onClick={() => setIsWishlistOpen(true)} className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                <div className="relative">
                                    <Heart size={18} />
                                    <span className="absolute left-auto ml-2 -top-2.5 rounded-full bg-[#DB4444] px-1 py-0 text-[10px] text-white">
                                        {wishlist?.length || 0}
                                    </span>
                                </div>
                            </button>
                            {/* Cart */}
                            <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                            >
                                <div className="relative">
                                    <LuShoppingCart size={20} />
                                    <span className="absolute left-auto ml-2 -top-2.5 rounded-full bg-[#DB4444] px-1 py-0 text-[10px] text-white">
                                        {cart?.length || 0}
                                    </span>
                                </div>
                            </button>

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
                            className="block lg:hidden text-2xl pr-2"
                            onClick={toggleMenu}
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={toggleMenu}
                ></div>
                <div
                    className={`fixed top-0 right-0 h-full w-10/12 bg-white z-50 transform transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                            <Link
                                to="/"
                                className="text-[#007bff] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link
                                to="/shop"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Shop
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link
                                to="/contact"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link
                                to="/about"
                                className="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                            
                        </li>
                        <hr />
                        <li>
                            <NavbarSearch/>
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
