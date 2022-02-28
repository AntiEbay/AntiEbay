import react from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
const ActiveOrders = () => {
  return (
    <div className=" bg-slate-600 h-screen">
      <NavBar />
      <hr />
      <div className="flex justify-center w-full space-x-4 h-13 relative p-1 bg-slate-800">
        <div className="p-1.5 space-x-12">
          <Link to="/ManageBids">
            <button className="text-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Active Bids
            </button>
          </Link>
          <Link to="/ActiveOrders">
            <button className="text-white border-b border-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Active Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrders;
