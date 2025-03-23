import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            dynamicHeight
            stopOnHover
            swipeable
            className="mt-4 px-1"
        >
            <div>
                <img
                    src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248669/kkamemycyanh3aa9cniw.jpg"
                    alt="Banner 1"
                />
                {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 1</p> */}
            </div>
            <div>
                <img
                    src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248649/lwfmgckyhnqcalqvbl4c.jpg"
                    alt="Banner 2"
                />
                {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 2</p> */}
            </div>
            <div>
                <img
                    src="https://res.cloudinary.com/dj905w8qy/image/upload/v1730248617/sjn5hdm4cpbi90kzngnb.jpg"
                    alt="Banner 3"
                />
                {/* <p className="legend text-lg font-semibold bg-opacity-75 bg-black text-white p-2 rounded">Banner 3</p> */}
            </div>
        </Carousel>
    );
};

export default Banner;