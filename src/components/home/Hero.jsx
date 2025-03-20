import { MdOutlinePhoneIphone } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AiOutlineAppstoreAdd, AiOutlineLaptop } from "react-icons/ai";
import { FiPower, FiSpeaker } from "react-icons/fi";
import { CgSmartphoneShake } from "react-icons/cg";
import { IoFitnessOutline } from "react-icons/io5";
import { BsEasel } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();

  const handleCategory = (category) => {
    navigate(`/shop?category=${category}`);
  };
  return (
    <div className="flex flex-row gap-2 py-3 px-2">
  <div className="lg:basis-1/4 md:basis-1/4 hidden md:flex lg:flex w-full">
  <div className="relative font-[sans-serif] shadow shadow-slate-300 rounded-md w-full">
    <h1
      type="button"
      id="dropdownToggle"
      className="flex px-6 gap-1 py-3 items-center rounded text-white w-full text-sm  border-none outline-none bg-[#49B2FF] cursor-pointer font-semibold"
    >
      <AiOutlineAppstoreAdd size={20}/>
      Browse Categories
    </h1>
    <ul
      id="dropdownMenu"
      className="absolute block bg-white py-2 w-full rounded max-h-96 overflow-auto z-10"
    >
      <li 
      onClick={() => handleCategory("phones-tablets")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <MdOutlinePhoneIphone size={18}/>
        <span className="ml-1">Phones & Tablets</span>
      </li>
      <li 
      onClick={() => handleCategory("laptop-desktop")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <AiOutlineLaptop  size={18}/>
        <span className="ml-1">Laptop & Desktop</span>
      </li>
      <li 
      onClick={() => handleCategory("speaker-headphone")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <FiSpeaker size={18}/>
        <span className="ml-1">Speaker & Headphone</span>
      </li>
      <li 
      onClick={() => handleCategory("power-accessories")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <FiPower size={18}/>
        <span className="ml-1">Power & Accessories</span>
      </li>
      <li 
      onClick={() => handleCategory("fitness-wearable")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <IoFitnessOutline size={18}/>
        <span className="ml-1">Fitness & Wearable</span>
      </li>
      <li 
      onClick={() => handleCategory("smart-electronics")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <CgSmartphoneShake size={19}/>
        <span className="ml-1">Smart Electronics</span>
      </li>
      <li 
      onClick={() => handleCategory("peripherals")}
      className="flex items-center py-3 px-6 hover:bg-blue-50 text-slate-700 text-sm cursor-pointer">
        <BsEasel size={16}/>
        <span className="ml-1">Peripherals</span>
      </li>
    </ul>
  </div>
</div>


      {/* Carusel  */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        dynamicHeight
        stopOnHover
        swipeable
        className="lg:basis-3/4 md:basis-3/4"
      >

        <div>
          <img
            src="https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2Fi-phone-16-series-5788.png&w=1080&q=75"
            alt="Banner 2"
          />
          {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 2</p> */}
        </div>
        <div>
          <img
            src="https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FMac-mini-M4-Chip-Slider-4626.jpg&w=1080&q=75"
            alt="Banner 1"
          />
          {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 1</p> */}
        </div>
        <div>
          <img
            src="https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2Fsamsung-slider-8904.jpg&w=1080&q=75"
            alt="Banner 3"
          />
          {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 3</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;