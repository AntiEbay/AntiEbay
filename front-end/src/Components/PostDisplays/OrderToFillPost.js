import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import axios from "axios";
import { accountTypeContext } from "../../SessionVariables";
// import required modules
const OrderToFillPost = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  console.log(imageArray);
  const postCompleteBid = async () => {
    const postValues = {
      postId: props.postId,
    };
    console.log(props);
    console.log(postValues);
    const completedBid = await axios.post(
      "http://localhost:8080/user/interaction/completepost",
      JSON.stringify(postValues),
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
            <button
              className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3"
              onClick={postCompleteBid}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderToFillPost;
