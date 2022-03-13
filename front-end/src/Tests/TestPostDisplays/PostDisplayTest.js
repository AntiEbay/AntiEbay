import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { accountTypeContext } from "../../SessionVariables";
import BiddingPage from "../../Pages/BiddingPage";
/**
 *
 * @param  props Information about the post
 * @returns A JSX element that contains a card with all the Post information
 * If A seller account is logged in a button will appear that naviagtes them to the bidding page.
 */
// Post Display used in ManageBids and Search Results
const PostDisplayTest = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const bidPageInfo = {
    postId: props.postId,
    title: props.title,
    description: props.description,
    price: props.price,
  };

  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6 my-2">
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
                Condition: {props.condition}
              </h1>
            </div>
            {state.accountType === "seller" ? (
              <Link to={"/Bidding"} state={{ biddingInfo: bidPageInfo }}>
                <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3 py-1">
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

export default PostDisplayTest;
