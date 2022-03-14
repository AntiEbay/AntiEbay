import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/**
 *
 * @param  props that contains all information about the post.
 * @returns A JSX element that is a card the has the post information in a readable format
 * This component is used in ViewBids for a buyer to accept a bid
 */
// Final component to display bids
const BidDisplayTest = (props) => {
  const navigate = useNavigate();
  //Used for a buyer to accept a bid, under the viewBids tab
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

export default BidDisplayTest;
