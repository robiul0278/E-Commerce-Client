/* eslint-disable react/prop-types */
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/features/cartSlice';
import { useState, useEffect } from 'react';
import empty from "../../public/empty.svg";
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const Cart = ({ onClose }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        setShow(true); // Show cart when it mounts functionality
        return () => setShow(false); // Hide cart 
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleCheckout = () => {
        if (!user || !user.uid) {
            console.log("User Not Found! Showing Alert...");
            Swal.fire({
                text: "Please Login to continue purchase?",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("Navigating to Login...");
                    navigate("/login", { state: { from: "/checkout" } });
                    handleClose();
                }
            });
            
        }else{
            handleClose();
            navigate("/checkout");
            window.scrollTo({ top: 0, behavior: "smooth" });
            
        }
    };
    
    
    

    return (
        <div
            className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans"
            onClick={handleClose}
            aria-hidden="true">
            <div
                className={`w-full max-w-sm bg-white shadow-lg relative ml-auto h-screen transition-all duration-500
                    ${show ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}>
                <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
                    <div className="flex items-center gap-4 text-gray-800">
                        <h3 className="text-2xl font-bold flex-1">My Wishlist</h3>
                        <button
                            onClick={handleClose}
                            className="text-xl p-2 rounded-full hover:bg-gray-200"
                            aria-label="Close wishlist">
                            <X />
                        </button>
                    </div>

                    {/* Render cart items */}
                    {cart.products.length > 0 ? (
                        cart.products.map((item, index) => (
                            <div key={index} className="space-y-4 mt-12">
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 shadow shadow-slate-300 rounded-md">
                                            <img src={item?.image} className="w-full h-full rounded-md object-contain" />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm sm:text-base font-bold text-gray-800">{item?.name || "Smart Watch Timex"}</h3>
                                            <h4 className="text-sm  text-gray-800">{item?.totalPrice || "00.00"}৳</h4>

                                            <div className="flex items-center justify-between mt-5">
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item?.id))}
                                                    type="button"
                                                    className=" font-semibold  text-[#49B2FF] hover:text-[#3480b6] text-xs flex items-center gap-1 transition duration-300 hover:scale-95">
                                                    <Trash2 />
                                                </button>
                                                <div
                                                    className="flex items-center px-2 py-1 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md ">
                                                    <button
                                                        onClick={() => dispatch(decreaseQuantity(item?.id))}
                                                        className="hover:text-[#49B2FF] transition duration-300 hover:scale-95"> <Minus /></button>
                                                    <span className="mx-3 font-bold">{item?.quantity}</span>
                                                    <button
                                                        onClick={() => dispatch(increaseQuantity(item?.id))}
                                                        className="hover:text-[#49B2FF] transition duration-300 hover:scale-95"> <Plus /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center">
                            <img src={empty} alt="empty wishlist" className="p-28" />
                        </div>
                    )}
                </div>

                {/* Total amount */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Subtotal Price: <span className="ml-auto">{cart?.totalPrice}৳</span></li>
                    </ul>
                    <button
                        onClick={handleCheckout}
                        className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-[#49B2FF] hover:bg-[#1d84cd] text-white rounded-md tracking-wide transition duration-500 inline-flex items-center justify-center"
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
