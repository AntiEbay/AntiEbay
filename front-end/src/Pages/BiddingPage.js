import react, { useState } from "react";
import NavBar from "../Components/NavBar";

const BiddingPage = (props) => {
  const [sellerOffer, setSelleroffer] = useState(Number);
  console.log("test");
  console.log(props.description);
  return (
    <div className="flex flex-col items-center bg-slate-600 h-screen">
      <NavBar />
      <div className=" grid grid-cols-2 bg-slate-800 lg:w-3/4 lg:h-2/3 mt-20">
        <div className=" flex items-start justify-center">
          <div className="flex h-1/2 w-1/2 bg-slate-400 items-center justify-center mt-20 rounded-md">
            No Image Avaiable
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
          <div className="flex flex-col bg-slate-600 rounded-md mr-3 mt-1">
            {props.description !== undefined ? (
              <span className="text-white text-center  bg-slate-600 mr-3 text-lg rounded-md">
                {props.description}
              </span>
            ) : (
              <span className=" text-white text-center bg-slate-600 mr-3 text-lg rounded-md">
                Item description is undefined.
              </span>
            )}
            <div className=" bg-slate-600 mr-3 text-center rounded-md my-2">
              <span className="mr-2 text-white">Current Best offer:</span>
              {props.offer !== undefined ? (
                <span className="text-white text-centermr-3 text-lg rounded-md">
                  {props.description}
                </span>
              ) : (
                <span className=" text-white text-center mr-3 text-lg rounded-md">
                  There is no offer on this item yet!
                </span>
              )}
            </div>
            <hr />
            <div className="flex justify-center bg-slate-600 rounded-md mr-3 my-2">
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
          <div className="flex justify-center my-2">
            <button className=" text-white text-lg hover:bg-slate-400 rounded-md p-2">
              Place your bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
