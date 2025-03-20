import { useState, useEffect, useRef } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Loading from "../../pages/Loading";
import ProductsCard from "../../pages/products/ProductsCard";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";
import Countdown from "../dashboard/Countdown";
import { useGetFlashProductsQuery } from "../../redux/api/api";

const FlashSale = () => {
  const [slidesPerView, setSlidesPerView] = useState(5);
  const { data, isLoading } = useGetFlashProductsQuery();

  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Update slidesPerView based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(5); // Large screens
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3); // Tablets
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2); // Mobile devices
      } else {
        setSlidesPerView(2); // Very small screens (optional)
      }
    };

    handleResize(); // Call it initially to set the right value

    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup the listener on unmount
  }, []);

  return (
    <section className="p-5 lg:p-0 lg:my-16">
      <div className="flex flex-row justify-between lg:gap-5 md:gap-5">

        <div className="flex items-center justify-center md:gap-4 lg:gap-5 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-7 rounded bg-[#49B2FF]" />
            <h1 className="text-[#49B2FF]">Today`&apos;`s</h1>
          </div>
          <Countdown />
        </div>



      </div>
      <div className="flex justify-between">
        <h1 className="lg:text-2xl text-[16px] font-bold">Flash Sales</h1>
        {/* Custom navigation buttons */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center lg:space-x-5 space-x-2 text-black ">
            <Link
              to="/shop"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center text-[10px] lg:text-[12px] text-gray-500 transition duration-300 hover:text-[#49B2FF] hover:scale-95">
              <span className="font-semibold">All</span>
              <ChevronsRight className="lg:w-5 w-4" />
            </Link>
            <div className="flex items-center justify-center space-x-1">
              <button ref={prevRef} className="rounded-full p-1 md:p-2 lg:p-2 bg-gray-200 transition duration-300 hover:bg-[#49B2FF] hover:text-white hover:scale-95 " aria-label="Previous">
                <MdArrowBack size={14} />
              </button>
              <button ref={nextRef} className="rounded-full p-1 md:p-2 lg:p-2 bg-gray-200 transition duration-300 hover:bg-[#49B2FF] hover:text-white hover:scale-95" aria-label="Next">
                <MdArrowForward size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section */}
      <div className="mt-5 ">
        {isLoading ? (
          <Loading />
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            slidesPerView={slidesPerView}
            spaceBetween={5}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {data?.data?.products?.map((product) => (
              <SwiperSlide key={product.id} className="p-0.5 md:p-2 lg:p-2">
                <ProductsCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

        )}
      </div>
    </section>
  );
};

export default FlashSale;
