import react, { useState } from "react";
import NavBar from "../Components/NavBar";
import RatingPopup from "../Components/RatingPopup";
import axios from "axios";
const BiddingPage = (props) => {
  const eventHandler = (data) => console.log(data);
  const [sellerOffer, setSelleroffer] = useState(Number);
  const [review, setReview] = useState(false);
  const [reviewScreen, setReviewScreen] = useState(false);

  const sendBid = () => {};
  return (
    <div className="flex flex-col items-center bg-slate-600 h-screen">
      <NavBar />
      <RatingPopup
        trigger={reviewScreen}
        triggerOff={setReviewScreen}
        review={setReview}
      />
      <div className=" grid lg:grid-cols-2 bg-slate-800 lg:w-3/4 lg:h-2/3 mt-20">
        <div className=" flex items-start justify-center">
          <div className="flex h-1/2 w-1/2 bg-slate-400 items-center justify-center mt-20 rounded-lg">
            No Image Available
          </div>
        </div>
        <div className=" flex flex-col">
          {props.itemName !== undefined ? (
            <span className=" text-white text-center mt-20 mr-3 text-3xl rounded-md my-2">
              {props.itemName}
            </span>
          ) : (
            <span className=" text-white text-center mt-20 mr-3 text-3xl rounded-md my-2">
              Item name is undefined
            </span>
          )}
          <hr />
          <div className="flex flex-col bg-slate-600 rounded-lg mr-3 mt-1">
            {props.description !== undefined ? (
              <span className="text-white text-center  bg-slate-600 mr-3 text-lg rounded-md my-3">
                {props.description}
              </span>
            ) : (
              <span className=" text-white text-center bg-slate-600 mr-3 text-lg rounded-md my-3">
                Item description is undefined.
              </span>
            )}
            <hr />
            <div className=" bg-slate-600 mr-3 text-center rounded-md text-lg my-3">
              <span className="mr-2 text-white">Current Bid:</span>
              {props.offer !== undefined ? (
                <span className="text-white text-centermr-3 text-lg rounded-md">
                  {props.description}
                </span>
              ) : (
                <span className=" text-white text-center mr-3 text-lg rounded-md">
                  No Current Bids
                </span>
              )}
            </div>
            <hr />
            <div className="flex justify-center rounded-md mr-3 my-3">
              <span className="text-white text-center text-lg rounded-md hidden lg:block">
                Place your bid here: $
              </span>
              <input
                className="focus:outline-none rounded-md pl-2 text-lg h-8 w-48 flex bg-slate-200"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setSelleroffer(event.target.value);
                }}
                placeholder="Your Bid"
              />
            </div>
          </div>
          <div className="flex justify-between my-5">
            {!review ? (
              <button
                className=" text-white text-lg hover:bg-slate-400 rounded-md p-2 ring-2 ring-white ml-3"
                onClick={() => setReviewScreen(true)}
              >
                Rate This Post
              </button>
            ) : (
              <button
                disabled={true}
                className=" text-white text-lg bg-slate-400 rounded-md p-2 ring-1 ring-green-300 ml-3"
              >
                Review Sent!
              </button>
            )}
            <button className=" text-white text-lg hover:bg-slate-400 rounded-md p-2 ring-2 ring-white mr-3">
              Place your bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
