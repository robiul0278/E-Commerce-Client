import { Link } from "react-router-dom";

const CategoryBanner = () => {
    return (
        <div className="bg-[#4b9ed9] text-white my-5 flex md:flex-row items-center justify-between px-8 md:px-16 py-10">
            {/* Left Side - Text & Timer */}
            <div className="lg::w-1/2 w-full text-center md:text-left">
                <p className="text-white text-lg font-semibold">Categories</p>
                <h1 className="text-3xl md:text-5xl  font-bold my-5">
                    Enhance Your <br /> Music Experience
                </h1>
                {/* Timer */}
                {/* Button */}
                <Link to="shop" type="button" className="hover:bg-[#16649c] text-white bg-[#3286c2]  font-semibold px-6 py-1 lg:py-3  rounded-lg">
                    Buy Now!
                </Link>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 lg:flex hidden justify-center mt-8 md:mt-0">
                <div className="bg-gradient-to-r from-[#4b9ed9] to-[#16649c]  rounded-lg w-full">
                    <img
                        src="https://cdn.mos.cms.futurecdn.net/UndsgrZpyRwgi67RfjVwPe.jpg"
                        alt="JBL Speaker"
                        className="w-full rounded"
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryBanner;