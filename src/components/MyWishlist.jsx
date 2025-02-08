/* eslint-disable react/prop-types */
import { Trash2, X } from 'lucide-react';
import empty from "../../public/empty.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeToWishlist } from '../redux/features/wishlistSlice';
import { addToCart } from '../redux/features/cartSlice';

const MyWishlist = ({ onClose }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.wishlist);
    const cartItem = useSelector((state) => state.cart.products);

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addToCart(product));
    }

    useEffect(() => {
        setShow(true);
        return () => setShow(false);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            onClose();
        }, 300);
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

                    {/* Render wishlist items */}
                    {products?.products.length > 0 ? (
                        products?.products.map((item) => {
                            const isInCart = cartItem?.some((product) => product.id === item?._id);

                            return (
                                <div key={item._id} className="space-y-4 mt-12">
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
                                        <div className="flex items-start gap-4 w-full">
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 p-2 rounded-md">
                                                <img 
                                                    src={item?.image} 
                                                    className="w-full h-full object-contain" 
                                                    alt={item?.name} 
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="flex flex-col flex-1">
                                                <h3 className="text-sm sm:text-base font-bold text-gray-800">{item?.name || "Smart Watch Timex"}</h3>
                                                <h4 className="text-sm sm:text-base font-bold text-gray-800">${item?.price || "60.00"}</h4>

                                                <div className="flex items-center justify-between mt-5">
                                                    <button
                                                        onClick={() => dispatch(removeToWishlist(item?._id))}
                                                        type="button"
                                                        className="font-semibold text-red-600 hover:text-red-700 text-xs flex items-center gap-1"
                                                        aria-label={`Remove ${item?.name} from wishlist`}>
                                                        <Trash2 />
                                                    </button>

                                                    <button
                                                        onClick={(e) => handleAddToCart(e, item)}
                                                        disabled={isInCart}
                                                        type="button"
                                                        className={`px-3 text-sm font-semibold py-2 rounded-md tracking-wide transition 
                                                            ${isInCart ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} 
                                                            text-white`}
                                                        aria-label={isInCart ? `Already in Cart` : `Add ${item?.name} to Cart`}>
                                                        {isInCart ? "Already in Cart" : "Add to Cart"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-gray-300" />
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col h-full items-center justify-center">
                            <img 
                                src={empty} 
                                alt="empty wishlist" 
                                className="max-w-full max-h-full p-20" 
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>

                {/* Total amount */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">
                            Subtotal <span className="ml-auto">${products.totalPrice}</span>
                        </li>
                    </ul>
                    {/* <button 
                        type="button" 
                        className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-md tracking-wide"
                        aria-label="Add all items to cart">
                        All Add To Cart
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default MyWishlist;
