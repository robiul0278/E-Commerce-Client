/* eslint-disable react/prop-types */
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, X } from 'lucide-react';
import useAuth from "../hooks/useAuth";
import useWishlist from "../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import useCart from "../hooks/useCart";



const MyWishlist = ({ onClose }) => {
    const { user } = useAuth();
    const [userData] = useUserData();
    const [wishlist, isLoading, refetchWishlist] = useWishlist();
    const [, , refetchCart] = useCart();
    const token = localStorage.getItem("access-token");
    const navigate = useNavigate()

    const totalPrice = wishlist.reduce((total, item) => total + item.price, 0);


    const handleRemoveToCart = async (Id) => {
        if (!user?.email) {
            toast.error("Please log in to remove items from the cart");
            return;
        }
        try {
            const res = await axios.patch("https://gadget-shop-server-bay.vercel.app/remove-wishlist", {
                userEmail: user?.email,
                productId: Id,
            });
            if (res.data.modifiedCount) {
                refetchWishlist();
                toast.success("Remove form wishlist!");
            }
        } catch {
            toast.error("Failed to remove from cart");
        }
    };

    // handle Add to cart 
    const handleAddToCart = async (id) => {
        if (!user?.email) {
          toast.error('Please log in to add to cart');
          navigate("/login");
          return;
        }
        if (userData?.role !== 'buyer') {
          toast.error('Only buyers can purchase products.');
          return;
        }
    
        try {
          const res = await axios.patch('https://gadget-shop-server-bay.vercel.app/add-cart',
            {
              userEmail: userData?.email,
              productId: id,
            },
            { headers: { authorization: `Bearer ${token}` } }
          );
    
          if (res.data.success) {
            // add to cart and remove item 
            const res = await axios.patch("https://gadget-shop-server-bay.vercel.app/remove-wishlist", {
                userEmail: user?.email,
                productId: id,
            });
            if (res.data.modifiedCount) {
                refetchWishlist();
            }
            toast.success("Added!");
            refetchCart()
          }
        } catch (error) {
          if (error.response?.status === 409) {
            // toast.error(error.response.data.message);
            // add to cart and remove item 
            const res = await axios.patch("https://gadget-shop-server-bay.vercel.app/remove-wishlist", {
                userEmail: user?.email,
                productId: id,
            });
            if (res.data.modifiedCount) {
                toast.success("Added!");
                refetchWishlist();
            }
            refetchCart();
          } else {
            toast.error('Failed to add to cart');
            console.log(error);
          }
        }
      };

    return (
        <div
            className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans"
            onClick={onClose}>
            <div className="w-full max-w-sm bg-white shadow-lg relative ml-auto h-screen" onClick={(e) => e.stopPropagation()}>
                <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
                    <div className="flex items-center gap-4 text-gray-800">
                        <h3 className="text-2xl font-bold flex-1">My Wishlist</h3>
                        <button onClick={onClose} className="text-xl p-2 rounded-full hover:bg-gray-200">
                            <X />
                        </button>
                    </div>


                    {/* Render cart items */}
                    {wishlist.length > 0 && !isLoading ? (
                        wishlist.map((item, index) => (
                            <div key={index} className="space-y-4 mt-12">
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4">
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 p-2 rounded-md">
                                            <img src={item?.image} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <h3 className="text-sm sm:text-base font-bold text-gray-800">{item?.name || "Smart Watch Timex"}</h3>
                                            <h4 className="text-sm sm:text-base font-bold text-gray-800">${item?.price || "60.00"}</h4>

                                            <div className="flex items-center justify-between mt-5">
                                                <button
                                                    onClick={() => handleRemoveToCart(item?._id)}
                                                    type="button"
                                                    className=" font-semibold  text-red-600 hover:text-red-700 text-xs flex items-center gap-1">
                                                    <Trash2 />
                                                </button>
                                                <button onClick={()=> handleAddToCart(item?._id)} type="button"
                                                    className="px-3 text-sm font-semibold  py-2 bg-red-600 hover:bg-red-700 text-white rounded-md tracking-wide">
                                                     Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <hr className="border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <div className="flex h-1/2 text-center items-center justify-center">
                            <h1>Please add to Wishlist!</h1>
                        </div>
                    )}
                </div>

                {/* total amount   */}
                <div className="p-4 absolute bottom-0 w-full border-t bg-white">
                    <ul className="text-gray-800 divide-y">
                        <li className="flex flex-wrap gap-4 text-lg font-bold">Subtotal <span className="ml-auto">${totalPrice}</span></li>
                    </ul>
                    <button type="button" className="mt-6 text-sm font-semibold px-4 py-2.5 w-full bg-red-600 hover:bg-red-700 text-white rounded-md tracking-wide">All Add To Card</button>
                </div>
            </div>
        </div>
    );
};

export default MyWishlist;
