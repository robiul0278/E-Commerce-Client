
import Accordion from "../../components/home/Accordion"
import Banner from "../../components/home/Banner"
import FeaturedProducts from "../../components/home/FeaturedProducts"
import UserReview from "../../components/home/UserReview"

const HomePage = () => {
    return (
        <div >
            <Banner />
            <div className="container mx-auto">
                <div className="my-10 px-10">
                    <FeaturedProducts />
                </div>
                <div className="pb-10">
                    <UserReview />
                </div>
                <div className="mb-10">
                    <Accordion />
                </div>
            </div>
        </div>
    )
}

export default HomePage