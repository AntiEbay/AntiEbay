import react from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import BidDisplay from "../Components/PostDisplays/BidDisplay";
const ViewBids = () => {
  //Location grabs info from react router dom
  // This page is called from AcceptBidPostDisplay.js
  const location = useLocation();
  console.log(location);
  const bids = Object.keys(location.state.bids).map((key) => (
    <BidDisplay
      bidAmount={location.state.bids[key].bidAmount}
      userRating={location.state.bids[key].averageSellerReview}
      imgStrings={location.state.bids[key].bidImage}
      email={location.state.bids[key].sellerEmail}
      bidId={location.state.bids[key].bidId}
    ></BidDisplay>
  ));
  return (
    <div className="bg-slate-600 h-screen">
      <NavBar />
      <div className="flex flex-col justify-center">{bids}</div>
    </div>
  );
};

export default ViewBids;
