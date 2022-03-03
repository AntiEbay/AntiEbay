import react, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css/bundle";
import ".//swiperArrow.css";
import { accountTypeContext } from "../../SessionVariables";
// import required modules
// Post Display used in ManageBids and Search Results
const PostDisplayWithDelete = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const imageArray = Object.keys(props.imgStrings).map((key) => (
    <SwiperSlide className=" flex justify-center items-center w-full h-full object-contain">
      <img src={`data:image/jpeg;base64,${props.imgStrings[key].contents}`} />
    </SwiperSlide>
  ));
  const bidDelete = async (e) => {
    e.preventDefault();
    const bidInfo = {
      postId: props.postId,
    };
    const sendpostDelete = await axios
      .post("http://localhost:8080/bid/delete", JSON.stringify(bidInfo), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(navigate("/ManageBids"));
  };
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
            <span className=" block hover:invisible text-amber-300 text-3xl">
              &#9733;
            </span>
            <Span
              className=" text-red-600 text-lg hover:text-red-900"
              onClick={postDelete(e)}
            >
              X
            </Span>
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
            {state.accountType === seller ? (
              <Link
                to={{
                  pathname: "/Bidding",
                  state: {
                    postId: props.postId,
                    title: props.title,
                    description: props.description,
                    price: props.price,
                  },
                }}
              >
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

export default PostDisplayWithDelete;
