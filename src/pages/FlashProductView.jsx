import { useParams } from "react-router-dom";
import CategoryBanner from "./home/CategoryBanner";
import { useGetFlashProductsQuery, useSingleFlashProductQuery } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import Cart from "../components/Cart";
import { useState } from "react";

const FlashProductView = () => {
    const { id } = useParams();
    const { data: product } = useSingleFlashProductQuery(id);
    const { data: flashData } = useGetFlashProductsQuery('');
    const dispatch = useDispatch();
    const discount = flashData?.data.flashData.discount;
 const [isCartOpen, setCartOpen] = useState(false);

    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(addToCart(product))
        toast.success('Added to Cart!');
      }

        // open Cart
        const setIsCartOpen = () => {
          setCartOpen(!isCartOpen);
        };
      
        const handleBuyProduct = (e, product) => {
          e.stopPropagation()
          e.preventDefault()
          dispatch(addToCart(product))
          setIsCartOpen(true)
        }
    return (
        <section>
            <div className="font-[sans-serif] max-w-7xl bg-gray-100 mx-auto my-16">
                <div className="lg:max-w-6xl max-w-xl mx-auto ">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="w-full p-5">
                            <div className="flex flex-col gap-4">
                                <div className="bg-white shadow p-2">
                                    <img src={product?.data.image} alt="Product"
                                        className="w-full object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-5">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{product?.data.name}</h3>
                                <div className="flex items-center flex-wrap gap-2 mt-4">
                                    <p className="text-gray-500 text-base"><strike>{product?.data.originalPrice}</strike>৳</p>
                                    <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">{product?.data.price}৳</h4>
                                    <div className="flex py-1 px-2 bg-gray-400 font-semibold !ml-4">
                                        <span className="text-white text-sm">save {discount}%</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-6 border-gray-300" />
                            <div>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <button type="button"
                                    onClick={(e) => handleAddToCart(e, product?.data)}
                                        className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">Add
                                        to cart</button>
                                    <button type="button"
                                    onClick={(e) => handleBuyProduct(e, product?.data)}
                                        className="px-4 py-3 w-[45%] border  bg-gray-400  text-white text-sm font-semibold">Buy
                                        it now</button>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-300" />
                        </div>
                    </div>
                </div>
                <div className="mt-2 py-4 px-8">
                    <h1 className="bg-gray-400 text-white font-bold p-2">Description</h1>
                    <p className="text-gray-500 mt-1 text-sm">{product?.data.description}</p>
                </div>
            </div>
            <div className="mt-10 lg:w-[1170px] mx-auto">
                <CategoryBanner />
            </div>
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </section>
    )
}

export default FlashProductView;