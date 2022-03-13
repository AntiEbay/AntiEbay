import React, { useContext } from "react";
import axios from "axios";
import { accountTypeContext } from "../../SessionVariables";
import { Link } from "react-router-dom";
/**
 *
 * @param props Props containing informaiotn about the post.
 * @returns A JSX element that displays information about the post in a card.
 * Will Allow a seller account to see a bid they made.
 * Conatinas a re-bid button which will allow the seller to navigate back to the bidding page to re-bid.
 */
// Final component to display bids
const BidDisplaySellerTest = (props) => {
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
  console.log(bid);
  const bidPageInfo = {
    postId: props.postId,
    title: props.title,
    description: props.description,
    price: props.price,
  };

  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6">
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

export default BidDisplaySellerTest;
