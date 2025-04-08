import { Cable, Calculator, Camera, Fan, Headphones, Smartphone, Speaker, Watch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = () => {
  const navigate = useNavigate();

  const handleSubCategory = (category) => {
    navigate(`/shop?subCategory=${category}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ul className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 md:gap-5  lg:gap-5 gap-2 py-4">
      <li 
      onClick={() => handleSubCategory("smartphones")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300  w-full max-w-[150px] ">
        <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Smart Phone</p>
      </li>
      <li 
        onClick={() => handleSubCategory("watch")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Watch className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold ">Watches</p>
      </li>
      <li 
        onClick={() => handleSubCategory("headphone")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Headphones className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Headphones</p>
      </li>
      <li 
        onClick={() => handleSubCategory("camera")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Camera className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Cameras</p>
      </li>
      <li 
        onClick={() => handleSubCategory("speaker")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Speaker className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Speaker</p>
      </li>
      <li 
        onClick={() => handleSubCategory("fan")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Fan className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Fan</p>
      </li>
      <li 
        onClick={() => handleSubCategory("calculator")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Calculator  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Calculator</p>
      </li>
      <li 
        onClick={() => handleSubCategory("powerBank")}
      className="flex flex-col items-center cursor-pointer justify-center shadow shadow-slate-300 rounded-box p-2 md:p-5 lg:p-5 hover:bg-blue-50 transition duration-300 w-full max-w-[150px]">
        <Cable  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 md:text-sm lg:text-sm text-[12px] text-center font-semibold">Power Bank</p>
      </li>
    </ul>
  );
};

export default CategoryCard;
