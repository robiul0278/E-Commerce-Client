import { useState, useEffect, useRef } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Loading from "../../pages/Loading";
import ProductsCard from "../../pages/products/ProductsCard";
import { ChevronsRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/features/productSlice";
import useProduct from "../../hooks/useProduct";

const FlashSale = () => {
  const [counter, setCounter] = useState(59);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [products, isLoading,] = useProduct();
  const data = products?.products;

  const dispatch = useDispatch();
  const product = useSelector(state => state.product.products);

  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setProduct(data));
    }
  }, [data, dispatch]);

  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Update counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 59));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


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
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-7 rounded bg-orange-600" />
          <h1 className="text-orange-600">Today&#39;s</h1>
        </div>
        <div className="flex flex-col space-y-3">
          <h1 className="lg:text-2xl font-bold">Flash Sales</h1>

          <div className="flex justify-between">
            <div className="text-sm lg:text-xl font-bold grid grid-flow-col lg:gap-3 gap-1 text-center auto-cols-max">
              <div className="flex flex-col lg:text-xl text-[8px]">
                <span className="countdown text-[10px] lg:text-3xl">
                  <span style={{ "--value": 15 }}></span>
                </span>
                day
              </div>
              <span className="text-orange-600">:</span>
              <div className="flex flex-col lg:text-xl text-[8px]">
                <span className="countdown text-[10px] lg:text-3xl">
                  <span style={{ "--value": 10 }}></span>
                </span>
                hour
              </div>
              <span className="text-orange-600">:</span>
              <div className="flex flex-col lg:text-xl text-[8px]">
                <span className="countdown text-[10px] lg:text-3xl">
                  <span style={{ "--value": 24 }}></span>
                </span>
                min
              </div>
              <span className="text-orange-600">:</span>
              <div className="flex flex-col lg:text-xl text-[8px]">
                <span className="countdown text-[10px] lg:text-3xl">
                  <span style={{ "--value": counter }}></span>
                </span>
                sec
              </div>
            </div>
            {/* Custom navigation buttons */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center lg:space-x-5 space-x-2 text-black ">
                <div className="flex items-center text-[10px] lg:text-[12px] text-gray-500">
                  <button className="font-semibold">All</button>
                  <ChevronsRight className="lg:w-5 w-4" />
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <button ref={prevRef} className="rounded-full p-2 bg-gray-200" aria-label="Previous">
                    <MdArrowBack size={14} />
                  </button>
                  <button ref={nextRef} className="rounded-full p-2 bg-gray-200" aria-label="Next">
                    <MdArrowForward size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section */}
      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={slidesPerView}
            spaceBetween={20}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {product.map((product) => (
              <SwiperSlide key={product.id}>
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
