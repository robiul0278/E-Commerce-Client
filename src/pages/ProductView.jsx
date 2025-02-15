import { useParams } from "react-router-dom";
import CategoryBanner from "../components/home/CategoryBanner";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!id) return;
    axios.get(`https://gadget-shop-server-bay.vercel.app/all-product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
  }, [id]);


  return (
    <section>
      <div className="font-[sans-serif] lg:w-[1170px] bg-gray-100 mx-auto my-16">
        <div className="lg:max-w-6xl max-w-xl mx-auto ">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
            <div className="w-full p-5">
              <div className="flex flex-col gap-4">
                <div className="bg-white shadow p-2">
                  <img src={product?.image} alt="Product"
                    className="w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="w-full p-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{product?.name}</h3>


                <div className="flex items-center flex-wrap gap-2 mt-4">
                  <p className="text-gray-500 text-base"><strike>$16</strike></p>
                  <h4 className="text-purple-800 text-2xl sm:text-3xl font-bold">${product?.price}</h4>
                  <div className="flex py-1 px-2 bg-gray-400 font-semibold !ml-4">
                    <span className="text-white text-sm">save 10%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-base mt-4 text-gray-500 font-semibold">Product Code: 100G</h4>
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div>
                <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2.5 w-max">
                  <button type="button" className="border-none outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                      <path
                        d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z"
                        data-original="#000000" />
                    </svg>
                  </button>
                  <span className="text-gray-800 text-sm font-semibold px-3">1</span>
                  <button type="button" className="border-none outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
                      <path
                        d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z"
                        data-original="#000000" />
                      <path
                        d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z"
                        data-original="#000000" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  <button type="button"
                    className="px-4 py-3 w-[45%] border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">Add
                    to cart</button>
                  <button type="button"
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
          <p className="text-gray-500 mt-1 text-sm">{product?.description}</p>
        </div>
      </div>
      <div className="mt-10 lg:w-[1170px] mx-auto">
        <CategoryBanner />
      </div>
    </section>
  )
}

export default ProductView;