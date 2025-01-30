/* eslint-disable react/prop-types */
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";


const ProductsCard = ({ product }) => {
  const userData = useUserData();
  const navigate = useNavigate();
  const [refetch] = useCart();

  const token = localStorage.getItem("access-token");

  const handleAddToCart = async () => {
    if (!userData?.email) {
      toast.error('Please log in to add to cart');
      navigate("/login");
      return;
    }

    if (userData?.role !== 'buyer') {
      toast.error('Only buyers can purchase products.');
      return;
    }

    await axios.patch('https://gadget-shop-server-bay.vercel.app/add-cart',
      {
        userEmail: userData?.email,
        productId: product._id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        if (res.data.modifiedCount) {
          toast.success('Added to cart successfully!');
          refetch()
        }
      })
      .catch(error => {
        toast.error('Failed add to cart');
        console.error(error);
      });
  };
  const handleAddWishlist = async () => {
    if (!userData?.email) {
      toast.error('Please log in!');
      navigate("/login");
      return;
    }

    if (userData?.role !== 'buyer') {
      toast.error('Only buyers can purchase products.');
      return;
    }

    await axios.patch('https://gadget-shop-server-bay.vercel.app/add-wishlist',
      {
        userEmail: userData?.email,
        productId: product._id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => {
        if (res.data.modifiedCount) {
          toast.success('Added to wishlist successfully!');
        }
      })
      .catch(error => {
        toast.error('Failed to add to wishlist');
        console.error(error);
      });
  };

  return (
    <div className="max-w-xs bg-white overflow-hidden relative group">
      {/* Discount Badge */}
      <div className="absolute bg-red-500 text-white text-xs font-bold rounded px-3 py-1 left-2 top-2 z-10">
        35%
      </div>

      {/* Heart Icon */}
      <button onClick={handleAddWishlist} type="button" className="absolute bg-gray-200 rounded-full text-black font-bold px-2 py-2 right-2 top-2 z-10">
        <FaRegHeart />
      </button>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product?.image || "https://via.placeholder.com/150"}
          loading="lazy"
          alt="AK-900 Wired Keyboard"
          className="w-full object-cover bg-gray-100 p-5"
        />
        {/* Add to Cart Button */}
        <button
        onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-sm font-bold py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Card Content */}
      <Link to={product?._id ? `/view/${product._id}` : "#"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="p-4 ">
        {/* Product Title */}
        <h2 className="text-gray-800 font-semibold text-sm hover:underline">AK-900 Wired Keyboard</h2>
        {/* Price Section */}
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-red-500 font-semibold text-md">$960</span>
          <span className="text-gray-500 line-through">$1160</span>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center text-yellow-400">
          {Array(4).fill("⭐").join("")}
          <span className="text-gray-500 ml-2">(75)</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductsCard;