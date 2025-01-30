/* eslint-disable react/prop-types */
import useUserData from "../hooks/useUserData";
import axios from "axios";
import toast from "react-hot-toast";
import { Minus, Plus, Trash2, X } from 'lucide-react';
import useCart from "../hooks/useCart";
import Loading from "../pages/Loading";

const Cart = ({ onClose }) => {
    const userData = useUserData();
    const [cart, isLoading, refetch] = useCart();

    const handleRemoveToCart = async (productId) => {
        if (!userData?.email) {
            toast.error("Please log in to remove items from the cart");
            return;
        }
        try {
            const res = await axios.patch("https://gadget-shop-server-bay.vercel.app/remove-cart", {
                userEmail: userData?.email,
                productId: productId,
            });
            if (res.data.modifiedCount) {
                toast.success("Removed from cart successfully!");
                refetch()
            }
        } catch {
            toast.error("Failed to remove from cart");
        }
    };

    return (
        <div
            className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans"
            onClick={onClose}>
            <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen" onClick={(e) => e.stopPropagation()}>
                <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
                    <div className="flex items-center gap-4 text-gray-800">
                        <h3 className="text-2xl font-bold flex-1">Shopping cart</h3>
                        <button onClick={onClose} className="text-xl p-2 rounded-full hover:bg-gray-200">
                            <X />
                        </button>
                    </div>


                    {/* Render cart items */}
                    {cart.length > 0 && !isLoading ? (
                        cart.map((item, index) => (
                            <div key={index} className="space-y-4 mt-12">
                                <div className="grid grid-cols-3 items-start gap-4">
                                    <div className="col-span-2 flex items-start gap-4">
                                        <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={item?.image} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex flex-col">
                                            <h3 className="text-base max-sm:text-sm font-bold text-gray-800">Smart Watch Timex</h3>
                                            <p className="text-xs font-semibold text-gray-500 mt-0.5">Size: SM</p>

                                            <button onClick={handleRemoveToCart} type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0">
                                                <Trash2 />
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>

                                    <div className="ml-auto">
                                        <h4 className="text-base max-sm:text-sm font-bold text-gray-800">$60.00</h4>
                                        <button type="button"
                                            className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                            <Minus />
                                            <span className="mx-3 font-bold">1</span>
                                            <Plus />
                                        </button>
                                    </div>
                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}
                </div>

                {/* total amount   */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Subtotal <span className="ml-auto">$125.00</span></li>
                    </ul>
                    <button type="button" className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide">Make Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
