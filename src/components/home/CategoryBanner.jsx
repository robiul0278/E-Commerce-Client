
const CategoryBanner = () => {
    return (
        <div className="bg-gray-800 text-white my-5 flex md:flex-row items-center justify-between px-8 md:px-16 py-5">
            {/* Left Side - Text & Timer */}
            <div className="lg::w-1/2 w-full text-center md:text-left">
                <p className="text-green-400 text-lg font-semibold">Categories</p>
                <h1 className="text-3xl md:text-5xl  font-bold mt-2">
                    Enhance Your <br /> Music Experience
                </h1>
                {/* Timer */}
                <div className="flex justify-center md:justify-start gap-4 mt-6">
                    {["23 Hours", "05 Days", "59 Minutes", "35 Seconds"].map((item, index) => (
                        <div key={index} className="bg-white text-black px-2 lg:px-4 lg:py-2 p-1 rounded-lg text-center">
                            <p className="lg:text-2xl text-md font-bold">{item.split(" ")[0]}</p>
                            <p className="text-sm">{item.split(" ")[1]}</p>
                        </div>
                    ))}
                </div>
                {/* Button */}
                <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-1 lg:py-3 mt-6 rounded-lg">
                    Buy Now!
                </button>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 lg:flex hidden justify-center mt-8 md:mt-0">
                <div className="bg-gradient-to-r from-gray-800 to-gray-950 shadow-lg p-4 rounded-lg">
                    <img
                        src="/jbl.png"
                        alt="JBL Speaker"
                        className="w-full max-w-lg"
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryBanner;