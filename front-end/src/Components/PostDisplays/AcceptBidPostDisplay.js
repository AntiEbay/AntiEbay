import react, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { accountTypeContext } from "../../SessionVariables";
import BidDisplay from "./BidDisplay";
// import required modules
// This is the post com that is used in ManagePosts.js
// The button leads to ViewBids.js and the com BidDisplay
const AcceptBidPostDisplay = (props) => {
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  console.log(imageArray);
  const postDelete = async (e) => {
    e.preventDefault();
    const postInfo = {
      postId: props.postId,
    };
    const sendpostDelete = await axios
      .post("http://localhost:8080/post/delete", JSON.stringify(postInfo), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(navigate("/ManagePosts"));
  };
  return (
    <div className="flex max-w-md bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="flex items-center justify-center w-1/3 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
      >
        {imageArray}
      </Swiper>
      <div className="w-2/3 p-4">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl">
            {props.title}
            <span className=" text-sm">x</span>
            {props.quantity}
          </h1>
          <div>
            <div>
              <Span
                className=" text-red-600 text-lg hover:text-red-900"
                onClick={postDelete(e)}
              >
                X
              </Span>
            </div>
            <span className=" invisible hover:flex text-3xl text-white">
              Buyer Rating:{props.userRating}
            </span>
          </div>
        </div>
        <hr />
        <p className="mt-2 text-white text-sm">{props.description}</p>
        <div className="flex item-center mt-2"></div>
        <div className="flex item-center justify-between mt-3">
          <div className="flex flex-grow justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">${props.price}</h1>
              <h1 className="text-white text-sm">
                Condition: {props.Condition}
              </h1>
            </div>
            <Link
              to={{
                pathname: "/ViewBids",
                state: (bids = props.bids),
              }}
            >
              <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3">
                See Active Bids
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptBidPostDisplay;
