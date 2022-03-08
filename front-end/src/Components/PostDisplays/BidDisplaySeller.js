import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import axios from "axios";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { accountTypeContext } from "../../SessionVariables";
import { Link } from "react-router-dom";
// import required modules
// Final component to display bids
const BidDisplaySeller = (props) => {
    const { state, update } = useContext(accountTypeContext);
  let bid = undefined;
  //Used for a buyer to accept a bid, under the viewBids tab
  console.log(props);
  console.log(Object.keys(props.bidList).length);
  if (props.bidList !== undefined) {
    for (let i = 0; i < Object.keys(props.bidList).length; i++) {
      if (props.bidList[i].sellerEmail === state.accountEmail) {
        bid = props.bidList[i];
        break;
      }
    }
  }
  console.log(bid)
  const bidPageInfo = {
    postId: props.postId,
    title: props.title,
    description: props.description,
    price: props.price,
  };
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

  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="flex items-center justify-center w-1/2 bg-cover text-white swiper-button-next:text-white swiper-button-next:fill-white"
      >
        {imageArray}
      </Swiper>
      <div className="w-1/2 p-4">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl">${bid.bidAmount}</h1>
        </div>
      </div>
      <hr />
      <div className="flex item-center mt-2"></div>
      <div className="flex flex-grow justify-end">
        <Link to={"/Bidding"} state={{ biddingInfo: bidPageInfo }}>
          <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded w-16 mt-5 mr-2 px-3 py-1">
            Re-Bid
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BidDisplaySeller;
