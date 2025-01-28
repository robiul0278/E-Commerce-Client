import { useState, useEffect, useRef } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import Loading from "../../pages/Loading";
import ProductsCard from "../../pages/products/ProductsCard";
import { ChevronsRight } from "lucide-react";

const OurProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(5);
  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);


  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const res = await axios.get(`https://gadget-shop-server-bay.vercel.app/all-product?limit=${12}`);
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetch();
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
    <section className="p-5 lg:p-0">
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-7 rounded bg-orange-600" />
          <h1 className="text-orange-600">Our Products</h1>
        </div>
        <div className="flex items-center gap-2 lg:gap-16 justify-between space-x-1">
          <h1 className="lg:text-2xl font-bold">Explore Our Products</h1>
          {/* Custom navigation buttons */}
          <div className="flex ml-auto items-center justify-center lg:space-x-5 space-x-2 text-black">
            <div className="flex items-center text-[10px] lg:text-[12px] text-gray-500">
              <button className="font-semibold">All</button>
              <ChevronsRight className="lg:w-5 w-4" />
            </div>
            <div className="flex items-center justify-center space-x-1">
              <button ref={prevRef} className="rounded-full p-2 bg-gray-200" aria-label="Previous">
                <MdArrowBack size={10}/>
              </button>
              <button ref={nextRef} className="rounded-full p-2 bg-gray-200" aria-label="Next">
                <MdArrowForward size={10}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section */}
      <div className="mt-5">
        {loading ? (
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
            {products.map((product) => (
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

export default OurProducts;
