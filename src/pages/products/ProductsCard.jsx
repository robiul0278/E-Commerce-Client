/* eslint-disable react/prop-types */
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import toast from "react-hot-toast";



const ProductsCard = ({ product }) => {
  const userData = useUserData();

  const token = localStorage.getItem("access-token");

  const handleAddToCart = async () => {
    if (!userData?.email) {
      toast.error('Please log in to add to cart');
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
      toast.error('Please log in to add to wishlist');
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
    <div className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
      <div className="mb-4 bg-gray-100 rounded p-2">
        <img src={product?.image} alt="Product 1"
          className="aspect-[33/35] w-full object-contain" />
      </div>

      <div>
        <div className="flex gap-2">
          <h5 className="text-base font-bold text-gray-800">{product?.title}</h5>
          <h6 className="text-base text-gray-800 font-bold ml-auto">${product?.price}</h6>
        </div>
        <p className="text-gray-500 text-[13px] mt-2">{product?.description?.slice(0, 85)}{product?.description?.length > 85 && '...'}.</p>
        <div className="flex items-center gap-2 mt-4">
          <div
            onClick={userData?.role === 'buyer' ? handleAddWishlist : undefined}
            className={`w-12 h-9 flex items-center justify-center rounded cursor-pointer ${userData?.role !== 'buyer'
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-pink-100 hover:bg-pink-200'
              }`}
            title="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              className={`${userData?.role !== 'buyer' ? 'fill-gray-400' : 'fill-pink-600'
                } inline-block`}
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
          <button
            onClick={userData?.role === 'buyer' ? handleAddToCart : undefined}
            type="button"
            disabled={userData?.role !== 'buyer'}
            className={`text-sm px-2 h-9 font-semibold w-full tracking-wide ml-auto outline-none border-none rounded ${userData?.role !== 'buyer'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductsCard;