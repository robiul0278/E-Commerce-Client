import { useState } from "react";
import useAuth from './../hooks/useAuth';
import useUserData from './../hooks/useUserData';
import NavActiveUser from "./NavActiveUser";
import { Link } from "react-router-dom";

const ResponsiveNavbar = () => {
    const { user } = useAuth();
    const userData = useUserData();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
            <header className='fixed top-0 w-full justify-between items-center border-b py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide z-50 bg-white shadow-sm'>

<section className='py-2 max-w-[1390px] bg-blue-600 mx-auto text-left text-white'>
        <p className='text-sm'><strong className="mx-3">Address:</strong>SWF New York 185669<strong className="mx-3">Contact
          No:</strong>1800333665</p>
      </section>

            <div className='flex max-w-[1390px] mx-auto w-full'>
                <div className='flex flex-wrap items-center lg:gap-y-2 gap-4 w-full'>
                    <a href="javascript:void(0)" className="max-sm:hidden"><img src="https://i.ibb.co.com/71L9XbW/gadgets-1.png" alt="logo" className='w-36' />
                    </a>
                    <a href="javascript:void(0)" className="hidden max-sm:block"><img src="https://i.ibb.co.com/5BY0SRK/Untitled-design.png" alt="logo" className='w-16' />
                    </a>

                    <div
                        id="collapseMenu"
                        className={`lg:ml-6 ${isMenuOpen ? "block" : "hidden"} lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
                    >
                        <button id="toggleClose"
                            onClick={toggleMenu} className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>

                        <ul
                            className='lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                            <li className='mb-6 hidden max-lg:block'>
                                {/* <div className="flex items-center justify-between gap-4">
                                    <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                                    </a>
                                    <button
                                        className='px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Sign
                                        In</button>
                                </div> */}

                                {
                                    user ?
                                        (
                                            <NavActiveUser />
                                        ) :
                                        (
                                            <div>
                                                <Link to="/login">
                                                    <button className="font-semibold btn btn-outline">
                                                        My Account
                                                    </button>
                                                </Link>
                                            </div>
                                        )
                                }
                            </li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link to="/"
                                className='text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold'>Home</Link></li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link to="/products"
                                className='text-[#333] hover:text-[#007bff] text-[15px] block font-semibold'>Shop</Link></li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link to="/about"
                                className='text-[#333] hover:text-[#007bff] text-[15px] block font-semibold'>About</Link></li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link to="/contact"
                                className='text-[#333] hover:text-[#007bff] text-[15px] block font-semibold'>Contact</Link></li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-x-6 gap-y-4 ml-auto">

                        <form  className="bg-white flex p-0.5 rounded-full border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                            <input type='email' placeholder='Search Something...' className="w-full outline-none bg-white pl-4 text-sm" />
                            <button type='button'
                                className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-3 py-2">Search</button>
                        </form>

                        <div className='flex items-center sm:space-x-8 space-x-6'>
                            <Link to="/dashboard/my-wishlist">
                                <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer fill-[#333] inline w-5 h-5"
                                            viewBox="0 0 64 64">
                                            <path
                                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                                data-original="#000000" />
                                        </svg>
                                        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{userData?.wishlist?.length || 0}</span>
                                    </div>
                                    <span className="text-[13px] font-semibold text-[#333]">Wishlist</span>
                                </div>
                            </Link>
                            <Link to="/cart">
                                <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="cursor-pointer fill-[#333] inline"
                                            viewBox="0 0 512 512">
                                            <path
                                                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                                data-original="#000000"></path>
                                        </svg>
                                        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{userData?.cart?.length || 0}</span>
                                    </div>
                                    <span className="text-[13px] font-semibold text-[#333]">Cart</span>
                                </div>
                            </Link>


                            {/* <button
                                className='max-lg:hidden px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>Sign
                                In</button> */}

                            {
                                user ?
                                    (
                                        <NavActiveUser />
                                    ) :
                                    (
                                        <div>
                                            <Link to="/login">
                                                <button className="font-semibold btn btn-outline">
                                                    My Account
                                                </button>
                                            </Link>
                                        </div>
                                    )
                            }

                            <button id="toggleOpen" onClick={toggleMenu} className='lg:hidden'>
                                <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ResponsiveNavbar;
