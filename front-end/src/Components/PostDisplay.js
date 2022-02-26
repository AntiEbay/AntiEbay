import react from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import GetImageData from "./Images/GetImageData";
// import required modules
const PostDisplay = (props) => {
  console.log(props);
  // const images = props.imageArray.map((item) => (
  //   <SwiperSlide>
  //     <GetImageData image={item.contents} />
  //   </SwiperSlide>
  // ));
  return (
    <div className="py-6">
      <div className="flex max-w-md bg-slate-600 hover:shadow-lg rounded-lg overflow-hidden ring-2 ring-offset-emerald-800">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="flex items-center justify-center w-1/3 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
        >
          {/* // {images} */}
        </Swiper>
        <div className="w-2/3 p-4">
          <div className="flex justify-between">
            <h1 className="text-white font-bold text-2xl">
              {props.title}TITLE
            </h1>
            <div>
              <span className=" block hover:invisible text-amber-300">
                &#9733;
              </span>
              <span className=" invisible hover:block">{props.userRating}</span>
            </div>
          </div>
          <hr />
          <p className="mt-2 text-white text-sm">
            {props.description}THIS IS A NORMAL DESCRIPTION THIS IS A NORMAL
            DESCRIPTIONTHIS IS A NORMAL DESCRIPTIONTHIS IS A NORMAL DESCRIPTION
          </p>
          <div className="flex item-center mt-2"></div>
          <div className="flex item-center justify-between mt-3">
            <div className="flex flex-grow justify-between">
              <div>
                <h1 className="text-white font-bold text-xl">
                  ${props.price}MONEY
                </h1>
                <h1 className="text-white text-sm">
                  Condition: {props.Condition} USED
                </h1>
              </div>
              <button className=" bg-gray-800 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3">
                Fill this Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
