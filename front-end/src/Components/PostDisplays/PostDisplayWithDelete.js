import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Lazy, Navigation } from "swiper";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { accountTypeContext } from "../../SessionVariables";
import { useNavigate } from "react-router-dom";

const postInfo = {
  postId: 0,
};

// import required modules
const PostDisplayWithDelete = (props) => {
  const navigate = useNavigate();
  const { state, update } = useContext(accountTypeContext);
  const postDelete = async () => {
    postInfo.postId = props.postId;
    const postDelete = await axios
      .delete("http://localhost:8080/", JSON.stringify(postInfo), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(navigate("/ManagePosts"));
  };
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  console.log(imageArray);

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
            <Span
              onClick={postDelete}
              className=" text-red-600 text-lg hover:text-red-900"
            >
              X
            </Span>
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
            {state.accountType === seller ? (
              <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3">
                Fill this Order
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplayWithDelete;
