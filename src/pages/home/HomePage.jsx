
import Category from "../../components/home/Category"
import CategoryBanner from "../../components/home/CategoryBanner"
import FlashSale from "../../components/home/FlashSale"
import Hero from "../../components/home/Hero"
import OurProducts from "../../components/home/OurProducts"
import PhoneTablets from "../../components/home/PhoneTablets"
import Read from "../../components/home/Read"
import NavbarSearch from "../../components/NavbarSearch"

const HomePage = () => {
    return (
        <div className="lg:w-[1170px] mx-auto">
            <div className="lg:hidden md:hidden flex px-2 pt-2">
                <NavbarSearch />
            </div>
            <Hero/>
            <Category />
            <FlashSale />
            <CategoryBanner />
            <PhoneTablets />
            <OurProducts />
            <Read/>
        </div>
    )
}

export default HomePage;