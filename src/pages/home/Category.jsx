// import { useRef } from "react";
// import { MdArrowBack, MdArrowForward } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import CategoryCard from "./CategoryCard";

const Category = () => {
    // const [loading, setLoading] = useState(false);
    // const [products, setProducts] = useState([]);

    // Refs for custom navigation buttons
    // const prevRef = useRef(null);
    // const nextRef = useRef(null);

    // Fetch products from API
    // useEffect(() => {
    //     setLoading(true);
    //     const fetch = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:5000/all-product?limit=${12}`);
    //             setProducts(res.data.products);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //             setLoading(false);
    //         }
    //     };
    //     fetch();
    // }, []);

    return (
        <section className="lg:mt-16 p-5 lg:p-0">
            <div className="flex flex-col gap-5">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-7 rounded bg-[#49B2FF]" />
                    <h1 className="text-[#49B2FF]">Categories</h1>
                </div>
                <div className="flex items-center gap-16 justify-between">
                    <h1 className="text-2xl font-bold">Browse By Category</h1>
                    {/* Custom navigation buttons */}
                    {/* <div className="flex ml-auto items-center justify-center space-x-3 text-black">
                        <button
                            ref={prevRef}
                            className="rounded-full p-2 bg-gray-200"
                            aria-label="Previous"
                        >
                            <MdArrowBack />
                        </button>
                        <button
                            ref={nextRef}
                            className="rounded-full p-2 bg-gray-200"
                            aria-label="Next"
                        >
                            <MdArrowForward />
                        </button>
                    </div> */}
                </div>
            </div>
            {/* Product Section */}
            <div className="">
                {/* <Swiper
                        modules={[Navigation]}
                        className="mySwiper"
                        slidesPerView={5}
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
                        {categories.map((category) => (
                            <SwiperSlide key={category.id}>
                                <CategoryCard product={category}/>
                            </SwiperSlide>
                        ))}
                    </Swiper> */}
                <CategoryCard />
            </div>
        </section>
    );
};

export default Category;
