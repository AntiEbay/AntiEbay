import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { accountTypeContext } from "../../SessionVariables";
import BiddingPage from "../../Pages/BiddingPage";
// import required modules
// Post Display used in ManageBids and Search Results
const PostDisplay = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const bidPageInfo = {
    postId: props.postId,
    title: props.title,
    description: props.description,
    price: props.price,
  };
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  console.log(imageArray);

  return (
    <div className="flex max-w-md lg:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6 my-2">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="flex items-center justify-center w-1/3 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
      >
        {imageArray}
      </Swiper>
      <div className="w-2/3 p-4">
        <div className="flex w-full justify-between">
          <h1 className="text-white font-bold text-2xl">
            {props.title}
            <span className=" text-sm">x</span>
            {props.quantity}
          </h1>
          <div>
            <span className="text-lg text-white">{props.userRating}</span>
            <span className=" text-amber-300 text-3xl">&#9733;</span>
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
            {state.accountType === "seller" ? (
              <Link to={"/Bidding"} state={{ biddingInfo: bidPageInfo }}>
                <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3">
                  Place A Bid
                </button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
