
const NewArrival = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between mt-10 lg:gap-5 gap-2 bg-white p-5 lg:p-0">
      {/* PlayStation 5 - Big Banner */}
      <div className="relative md:col-span-2 rounded-md overflow-hidden shadow-lg bg-black px-10 w-full">
        <img
          src="/ps5.png"
          alt="PlayStation 5"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-xl md:text-3xl font-bold">PlayStation 5</h2>
          <p className="text-sm md:text-base">Black and White version of the PS5 coming out on sale.</p>
          <a href="#" className="mt-2 inline-block text-white font-semibold underline">
            Shop Now
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:gap-5 gap-2 w-full">
        {/* Women's Collections */}
        <div className="relative col-span-2 bg-black rounded-md overflow-hidden">
          <img
            src="/women.png"
            alt="Women's Collections"
            className="w-full  object-cover opacity-70"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl md:text-2xl font-bold">Women’s Collections</h3>
            <p className="text-sm md:text-base">Featured woman collections that give you another vibe.</p>
            <a href="#" className="mt-2 inline-block text-white font-semibold underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Speakers */}
        <div className="relative bg-black rounded-md overflow-hidden shadow-md p-5">
          <img
            src="/speaker.png"
            alt="Speakers"
            className="w-full  object-cover opacity-70"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl md:text-2xl font-bold">Speakers</h3>
            <p className="text-sm md:text-base">Amazon wireless speakers</p>
            <a href="#" className="mt-2 inline-block text-white font-semibold underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Perfume */}
        <div className="relative  bg-black rounded-md overflow-hidden shadow-md p-5">
          <img
            src="/perfume.png"
            alt="Perfume"
            className="w-full object-cover opacity-70"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl md:text-2xl font-bold">Perfume</h3>
            <p className="text-sm md:text-base">GUCCI INTENSE OUD EDP</p>
            <a href="#" className="mt-2 inline-block text-white font-semibold underline">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;