import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/products/NotFound";
import ProductsCard from "../../pages/products/ProductsCard";
import { Toaster } from "react-hot-toast";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      axios.get(`https://gadget-shop-server-bay.vercel.app/all-product?limit=${8}`)
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data.products);
          setLoading(false);
        })
    }
    fetch();
  }, []);
  return (

    <div className="font-[sans-serif]">
      <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
        <h2 className="md:text-2xl text-xl font-extrabold text-gray-800 mb-6 sm:mb-10">Featured Products</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            loading ? (
              <Loading />
            ) : products?.length === 0 ? (
              <NotFound />
            ) : (
              <>
                {products.map((product) => (
                  <ProductsCard key={product?._id} product={product} />
                ))}
              </>
            )
          }

        </div>
      </div>
      <Toaster />
    </div>

  )
}

export default FeaturedProducts;
