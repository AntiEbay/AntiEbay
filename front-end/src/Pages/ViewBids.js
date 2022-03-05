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
    <div className="bg-slate-600 h-screen overflow-auto">
      <NavBar />

      <div className="text-slate-600 bg-slate-600 h-24"></div>
      <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5 ">
        {/*logo*/}
        <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
          Anti-eBay
        </h1>
        {/* "Account INfo" */}
        <h2 className=" text-white text-4xl text-center pt-4">View Bids</h2>
      </div>

      <div className="flex flex-col justify-center">{bids}</div>
    </div>
  );
};

export default ViewBids;
