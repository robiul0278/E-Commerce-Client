/* eslint-disable react/prop-types */
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const ProductsCard = ({ product }) => {
  const userData = useUserData();
  const navigate = useNavigate();

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
    <div className="border p-2 w-full rounded cursor-pointer hover:-translate-y-1 transition-all relative">
      <div className="mb-4 bg-gray-100 rounded p-4">
        <img src={product?.image} alt="Product 1"
          className="aspect-[33/35] w-full object-contain" />
      </div>

      <div>
        <div className="flex gap-2">
          <h5 className="text-base font-bold text-gray-800">{product?.title}</h5>
          <h6 className="text-base text-gray-800 font-bold ml-auto">${product?.price}</h6>
        </div>
        <p className="text-gray-500 text-[13px] mt-2">{product?.description?.slice(0, 70)}{product?.description?.length > 70 && '...'}.</p>
        <div className="flex items-center gap-2 mt-4">
          <div
            onClick={handleAddWishlist}
            className={`w-12 h-9 flex items-center justify-center rounded cursor-pointer ${userData?.role === 'buyer' || !userData?.isLoggedIn
              ? 'bg-red-100 hover:bg-blue-700 hover:text-white text-red-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={userData?.isLoggedIn && userData?.role !== 'buyer'}
            title="Wishlist"
          >
            <FaRegHeart />
          </div>
          <button
           onClick={handleAddToCart}
            type="button"
            className={`text-sm px-2 h-9 font-semibold w-full tracking-wide ml-auto outline-none border-none rounded ${userData?.role === 'buyer' || !userData?.isLoggedIn
              ? ' bg-purple-700 hover:bg-purple-800 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={userData?.isLoggedIn && userData?.role !== 'buyer'}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductsCard;