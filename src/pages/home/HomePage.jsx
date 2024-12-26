
import { Link } from "react-router-dom"
import Accordion from "../../components/home/Accordion"
import Banner from "../../components/home/Banner"
import FeaturedProducts from "../../components/home/FeaturedProducts"
import UserReview from "../../components/home/UserReview"
import Statistics from "../Statistics"

const HomePage = () => {
    return (
        <div >
            <Banner />
            <div className="container mx-auto">
                <div className="">
                    <FeaturedProducts />
                    <div className="flex justify-center mt-4">
                        <Link to="/products">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-purple-700 to-purple-300"
                            >
                                More Products
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="pb-10">
                    <UserReview />
                </div>
                <div className="mb-10">
                    <Accordion />
                </div>
                <div className="mb-10">
                    <Statistics />
                </div>
            </div>
        </div>
    )
}

export default HomePage