import "swiper/css";
import "swiper/css/navigation";
import Loading from "../../pages/Loading";
import ProductsCard from "../../pages/products/ProductsCard";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/api";

const OurProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery({undefined})

  return (
    <section className="p-5 lg:p-0">
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-7 rounded bg-[#49B2FF]" />
          <h1 className="text-[#49B2FF]">Our Products</h1>
        </div>
        <div className="flex items-center gap-2 lg:gap-16 justify-between space-x-1">
          <h1 className="lg:text-2xl font-bold">Explore Our Products</h1>
          {/* Custom navigation buttons */}
          <div className="flex ml-auto items-center justify-center lg:space-x-5 space-x-2 text-black">
            <Link
              to="/shop"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-[10px] lg:text-[12px] text-gray-500 transition duration-300 hover:text-[#49B2FF] hover:scale-95">
              <span className="font-semibold">All</span>
              <ChevronsRight className="lg:w-5 w-4" />
            </Link>

          </div>
        </div>
      </div>
      {/* Product Section */}
      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (

          <div className="grid gap-5 grid-cols-2 md:grid-cols-5 lg:grid-cols-5 md:p-2 lg:p-2">
            {products?.data?.result.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
