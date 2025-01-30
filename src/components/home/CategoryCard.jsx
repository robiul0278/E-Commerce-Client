import { Cable, Calculator, Camera, Fan, Headphones, Smartphone, Speaker, Watch } from 'lucide-react';

const CategoryCard = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-5 py-4">
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Smart Phone</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Watch className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Watches</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Headphones className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Headphones</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Camera className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Cameras</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Speaker className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Speaker</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Fan className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Fan</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Calculator  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Calculator</p>
      </div>
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md py-8 hover:bg-red-500 transition hover:text-white w-full max-w-[150px]">
        <Cable  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className="mt-2 text-sm font-semibold">Power Bank</p>
      </div>
    </div>
  );
};

export default CategoryCard;
