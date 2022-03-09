import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import axios from "axios";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { useNavigate } from "react-router-dom";
// import required modules
// Final component to display bids
const BidDisplay = (props) => {
  const navigate = useNavigate();
  //Used for a buyer to accept a bid, under the viewBids tab
  const imageArray = Object.keys(props.imgStrings).map(
    (key) => (
      console.log(props.imgStrings[key].contents),
      (
        <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
          <img
            src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`}
          />
        </SwiperSlide>
      )
    )
  );
  const acceptBid = async () => {
    const bidInfo = {
      //   sellerEmail: props.sellerEmail,
      //   postId: props.postId,
      bidId: props.bidId,
    };
    const postAcceptBid = await axios
      .post(
        "http://localhost:8080/user/interactions/acceptbid",
        JSON.stringify(bidInfo),
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(navigate("/"));
  };

  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6 mt-2">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="flex items-center justify-center w-1/2 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
      >
        {imageArray}
      </Swiper>
      <div className="w-1/2 p-4">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl">${props.bidAmount}</h1>
          <div className="flex">
            <span className=" text-3xl text-white">{props.userRating}</span>
            <span className=" text-amber-300 text-3xl">&#9733;</span>
          </div>
        </div>
        <hr />
        <div className="flex item-center mt-2"></div>
        <div className="flex flex-grow justify-end">
          <button
            className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3 py-1"
            onClick={acceptBid}
          >
            {" "}
            Accept Bid{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidDisplay;
