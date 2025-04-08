import NavbarSearch from "../../components/NavbarSearch";
import Category from "./Category";
import CategoryBanner from "./CategoryBanner";
import FlashSale from "./FlashSale";
import Hero from "./Hero";
import OurProducts from "./OurProducts";
import PhoneTablets from "./PhoneTablets";
import Read from "./Read";


const HomePage = () => {
    return (
        <div className="max-w-7xl mx-auto">
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