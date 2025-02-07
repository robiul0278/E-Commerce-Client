/* eslint-disable react/prop-types */
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/features/cartSlice';
import { useState, useEffect } from 'react';

const Cart = ({ onClose }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true); // Show cart when it mounts
        return () => setShow(false); // Hide cart when it's unmounted
    }, []);

    return (
        <div
            className={`fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}>
            <div
                className={`w-full max-w-sm bg-white shadow-lg relative ml-auto h-screen transition-transform transform ${show ? 'translate-x-0' : 'translate-x-full'} duration-300`}
                onClick={(e) => e.stopPropagation()}>
                <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
                    <div className="flex items-center gap-4 text-gray-800">
                        <h3 className="text-2xl font-bold flex-1">Shopping cart</h3>
                        <button onClick={onClose} className="text-xl p-2 rounded-full hover:bg-gray-200">
                            <X />
                        </button>
                    </div>

                    {/* Render cart items */}
                    {cart.products.length > 0 ? (
                        cart.products.map((item, index) => (
                            <div key={index} className="space-y-4 mt-12">
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={item?.image} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm sm:text-base font-bold text-gray-800">{item?.name || "Smart Watch Timex"}</h3>
                                            <h4 className="text-sm sm:text-base font-bold text-gray-800">${item?.totalPrice || "60.00"}</h4>

                                            <div className="flex items-center justify-between mt-5">
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item?.id))}
                                                    type="button"
                                                    className=" font-semibold  text-red-600 hover:text-red-700 text-xs flex items-center gap-1">
                                                    <Trash2 />
                                                </button>
                                                <div
                                                    className="flex items-center px-2 py-1 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md">
                                                    <button
                                                        onClick={() => dispatch(decreaseQuantity(item?.id))}
                                                        className="hover:text-red-500"> <Minus /></button>
                                                    <span className="mx-3 font-bold">{item?.quantity}</span>
                                                    <button
                                                        onClick={() => dispatch(increaseQuantity(item?.id))}
                                                        className="hover:text-red-500"> <Plus /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <div className="flex h-1/2 text-center items-center justify-center">
                            <h1>Please add to Cart!</h1>
                        </div>
                    )}
                </div>

                {/* Total amount */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Subtotal <span className="ml-auto">${cart?.totalPrice}</span></li>
                    </ul>
                    <button type="button" className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-md tracking-wide">Make Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
