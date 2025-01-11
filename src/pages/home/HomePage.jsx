
import Accordion from "../../components/home/Accordion"
import Banner from "../../components/home/Banner"
import FeaturedProducts from "../../components/home/FeaturedProducts"
import UserReview from "../../components/home/UserReview"
import Statistics from "../Statistics"

const HomePage = () => {
    return (
        <div >
            <Banner />
            <FeaturedProducts />
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
    )
}

export default HomePage