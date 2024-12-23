import { useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";
import axios from "axios";
import { FiPlus, FiMinus } from "react-icons/fi";
import Loading from "../Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
    const userData = useUserData();
    const [cartData, setCartData] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [loading, setLoading] = useState(false);
    const [latestData, setLatestData] = useState(true);
    const token = localStorage.getItem("access-token");

    const shippingCost = 2.0;
    const tax = 4.0;

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://gadget-shop-server-bay.vercel.app/cart/${userData?._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setCartData(res.data);
                const initialQuantities = {};
                res.data.forEach((item) => {
                    initialQuantities[item._id] = 1; // Default quantity
                });
                setProductQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };
        if (userData?._id && token) {
            fetchCart();
        }
    }, [userData, token, latestData]);

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
                setLatestData(!latestData);
            }
        } catch (error) {
            toast.error("Failed to remove from cart");
            console.error(error);
        }
    };

    const handleIncrement = (productId) => {
        setProductQuantities((prev) => ({
            ...prev,
            [productId]: prev[productId] + 1,
        }));
    };

    const handleDecrement = (productId) => {
        setProductQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(prev[productId] - 1, 1), // Ensure quantity is at least 1
        }));
    };

    const calculateTotal = () => {
        const productsTotal = cartData.reduce((total, product) => {
            return total + product.price * (productQuantities[product._id] || 1);
        }, 0);
        return productsTotal + shippingCost + tax;
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto h-screen bg-white py-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                            <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                            <hr className="border-gray-300 mt-4 mb-8" />
                            <div className="space-y-4">
                                {cartData?.length > 0 ? (
                                    cartData.map((cart) => (
                                        <div key={cart._id} className="grid grid-cols-3 items-center gap-4">
                                            <div className="col-span-2 flex items-center gap-4">
                                                <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                                    <img
                                                        src={cart?.image}
                                                        className="w-full h-full object-contain"
                                                        alt={cart?.title}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-800">
                                                        {cart?.title}
                                                    </h3>
                                                    <h6
                                                        onClick={() => handleRemoveToCart(cart?._id)}
                                                        className="text-xs text-red-500 cursor-pointer mt-0.5"
                                                    >
                                                        Remove
                                                    </h6>
                                                    <div className="flex mt-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDecrement(cart._id)}
                                                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                                                        >
                                                            <FiMinus />
                                                        </button>
                                                        <span className="mx-2.5">
                                                            {productQuantities[cart._id] || 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleIncrement(cart._id)}
                                                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                                                        >
                                                            <FiPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-auto">
                                                <h4 className="text-base font-bold text-gray-800">
                                                    ${(cart.price * (productQuantities[cart._id] || 1)).toFixed(2)}
                                                </h4>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1>No Products</h1>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                            <ul className="text-gray-800 mt-8 space-y-4">
                                <li className="flex flex-wrap gap-4 text-base">
                                    Shipping <span className="ml-auto font-bold">${shippingCost.toFixed(2)}</span>
                                </li>
                                <li className="flex flex-wrap gap-4 text-base">
                                    Tax <span className="ml-auto font-bold">${tax.toFixed(2)}</span>
                                </li>
                                <li className="flex flex-wrap gap-4 text-base font-bold">
                                    Total <span className="ml-auto">${calculateTotal().toFixed(2)}</span>
                                </li>
                            </ul>

                            <div className="mt-8 space-y-2">
                                <Link to="/checkout">
                                    <button
                                        type="button"

                                        className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                    >
                                        Checkout
                                    </button>
                                </Link>
                                <Link to="/">
                                    <button
                                        type="button"
                                        className="text-sm mt-2 px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                                    >
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
