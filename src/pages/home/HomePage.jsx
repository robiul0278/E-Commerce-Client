
import Banner from "../../components/home/Banner"
import BestSelling from "../../components/home/BestSelling"
import Category from "../../components/home/Category"
import CategoryBanner from "../../components/home/CategoryBanner"
import FlashSale from "../../components/home/FlashSale"
import NewArrival from "../../components/home/NewArrival"
import OurProducts from "../../components/home/OurProducts"
import UserReview from "../../components/home/UserReview"

const HomePage = () => {
    return (
        <div className="lg:w-[1170px] mx-auto">
            <Banner/>
            <Category/>
            <FlashSale/>
            <CategoryBanner/>
            <BestSelling/>
            <OurProducts/>
            <NewArrival/>
            <UserReview />
        </div>
    )
}

export default HomePage;