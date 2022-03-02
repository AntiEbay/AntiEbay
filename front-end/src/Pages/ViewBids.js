import react from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
const ViewBids = () => {
  const location = useLocation();
  const bids = Object.keys(location.state.bids).map((key) => (
    <BidDisplay
      bidAmmount={location.state.bids[key].bidAmmount}
      userRating={location.state.bids[key].userRating}
      imgStrings={location.state.bids[key].imgStrings}
      email={location.state.bids[key].sellerEmail}
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
