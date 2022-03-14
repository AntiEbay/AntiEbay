import React, { useContext, useState } from "react";
import { accountTypeContext } from "../../SessionVariables";
import RatingPopupSeller from "../../Components/RatingPopupSeller";
/**
 *
 * @param  props Required information about the post.
 * @returns A JSX component that displays all the post info in a card.
 * Used to act as a form of transaction history. Once a buyer sees this card they can also rate a seller.
 */
//Used in the Completed Post page.
const PostCompletedTest = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const [review, setReview] = useState(false);
  const [reviewScreen, setReviewScreen] = useState(false);
  let mainBid = undefined;
  for (const index in props.bids) {
    const bid = props.bids[index];
    if (bid.accepted) {
      mainBid = bid;
    }
  }

  console.log(mainBid);
  if (!reviewScreen) {
    return (
      <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6 my-2">
        <div className="w-2/3 p-4">
          <div className="flex justify-between w-full">
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
              {!review ? (
                <button
                  className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3"
                  onClick={() => setReviewScreen(true)}
                >
                  Rate The Seller
                </button>
              ) : (
                <button
                  className=" bg-slate-400 cursor-not-allowed text-white font-bold py-2 px-2 rounded mr-3"
                  disabled={true}
                >
                  Review Sent!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex justify-center items-center w-full h-full">
          <RatingPopupSeller
            trigger={reviewScreen}
            triggerOff={setReviewScreen}
            review={setReview}
            sellerEmail={mainBid.sellerEmail}
          />
        </div>
      </div>
    );
  }
};

export default PostCompletedTest;
