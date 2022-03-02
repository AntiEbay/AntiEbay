import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import axios from "axios";
import "swiper/css/bundle";
import ".//swiperArrow.css";
// import required modules
// Final component to display bids
const BidDisplay = (props) => {
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  const acceptBid = async () => {
    const bidInfo = {
      sellerEmail: props.sellerEmail,
      postId: props.postId,
    };
    const postAcceptBid = await axios.post(
      "http://localhost:8080/user/interactions/acceptbid",
      JSON.stringify(bidInfo),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  return (
    <div className="flex max-w-md bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="flex items-center justify-center w-1/2 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
      >
        {imageArray}
      </Swiper>
      <div className="w-1/2 p-4">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl">{props.bidAmount}</h1>
          <div>
            <span className=" block hover:invisible text-amber-300 text-3xl">
              &#9733;
            </span>
            <span className=" invisible hover:flex text-3xl text-white">
              Buyer Rating:{props.userRating}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex item-center mt-2"></div>
        <div className="flex flex-grow justify-end">
          <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3">
            Accept Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidDisplay;
