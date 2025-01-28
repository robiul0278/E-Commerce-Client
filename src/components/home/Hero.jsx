import { MdHeadphones, MdOutlineDevicesOther } from "react-icons/md";


const Hero = () => {
  return (
    <div className="flex flex-row gap-5 py-3">
      <div className="lg:basis-1/4 ">
      <div className="relative font-[sans-serif]">
        <h1
          type="button"
          id="dropdownToggle"
          className="flex px-6 py-3 rounded text-white text-sm font-semibold border-none outline-none bg-[#DB4444] cursor-pointer"
        >
          Browse Categories
        </h1>
        <ul
          id="dropdownMenu"
          className="absolute block shadow-sm bg-white py-2 min-w-full w-max rounded max-h-96 overflow-auto z-10"
        >
          <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
            <MdHeadphones />
            <span className="ml-2">Headphone & Earphone</span>
          </li>
          <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
            <MdHeadphones />
            <span className="ml-2">Mobile Accessories</span>
          </li>
          <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
            <MdOutlineDevicesOther />
            <span className="ml-2">Hot Gadgets</span>
          </li>
          <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
            <MdHeadphones />
            <span className="ml-2">Home Appliances</span>
          </li>
        </ul>
      </div>
      </div>

      {/* Carusel  */}
      <div className="lg:basis-3/4 ">
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full h-full">
            <img
              src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248669/kkamemycyanh3aa9cniw.jpg"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248649/lwfmgckyhnqcalqvbl4c.jpg"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248617/sjn5hdm4cpbi90kzngnb.jpg"
              className="w-full" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;