/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { addToWishlist } from "../../redux/features/wishlistSlice";


const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist);

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
    toast.success('Added to Cart!');
  }

  const handleAddWishlist = (e, product) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToWishlist(product));
  };

  return (
    <div className="max-w-xs bg-white relative h-full flex flex-col min-h-[300px] md:min-h-[330px] lg:max-h-[365px] lg:min-h-[330px] md:max-h-[365px] shadow shadow-slate-300 rounded-box">
    {/* Heart Icon */}
    <button
      onClick={(e) => handleAddWishlist(e, product)}
      type="button"
      className={`absolute rounded-full font-bold px-2 py-2 right-2 top-2 z-10 
        ${products?.products.some((item) => item._id === product._id) ? "text-white cursor-not-allowed bg-[#49B2FF]" : "bg-gray-200 hover:bg-[#49B2FF] transition duration-300 hover:text-white"}`}
      disabled={products?.products.some((item) => item._id === product._id)}
    >
      <FaRegHeart />
    </button>
  
    {/* Product Image */}
    <div className="w-full rounded-box bg-stone-100">
      <img
        src={product?.image || "https://via.placeholder.com/150"}
        loading="lazy"
        alt="image"
        className="w-full h-full object-cover"
      />
    </div>
  
    {/* Card Footer */}
    <div className="flex flex-col gap-2 p-4  flex-grow">
      <Link to={product?._id ? `/view/${product._id}` : "#"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        {/* Product Title */}
        <h2 className="text-gray-800 font-semibold text-[13px] hover:underline transition duration-300">{product?.name}</h2>
        {/* Price Section */}
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-[#49B2FF] font-semibold text-[14px]">{product?.price}৳</span>
        </div>
      </Link>
      <div className="flex items-center justify-between md:text-xs lg:text-xs mt-auto">
        {/* <button className="rounded border border-[#49B2FF] bg-[#49B2FF] p-1 md:p-1.5 lg:p-1.5 px-3 md:px-4 lg:px-4 font-semibold text-white text-[10px] md:text-xs lg:text-xs duration-300 hover:scale-95 hover:bg-sky-600">
          Buy Now
        </button> */}
        <button onClick={(e) => handleAddToCart(e, product)} className="w-full rounded border border-[#49B2FF] p-1 md:p-1.5 lg:p-1.5 px-2 md:px-3 lg:px-3 font-semibold text-[#49B2FF] duration-300 hover:bg-[#49B2FF] text-[10px] md:text-xs lg:text-xs hover:text-white hover:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  
  )
}
export default ProductsCard;