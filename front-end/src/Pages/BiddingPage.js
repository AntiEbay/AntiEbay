import react, { useState, useContext } from "react";
import NavBar from "../Components/NavBar";
import RatingPopup from "../Components/RatingPopup";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
import { useLocation } from "react-router-dom";
import SolidAlert from "../Components/Alerts/SolidAlert";

var imageClassList = [];

class ImageObj {
  fileName = "";
  contents = "";
  // maybe add type field
  constructor(fileName, contents) {
    this.fileName = fileName;
    this.contents = contents;
  }
}

const BiddingPage = () => {
  const location = useLocation();
  console.log(location);
  const { state, update } = useContext(accountTypeContext);
  const [sellerOffer, setSelleroffer] = useState(Number);
  const [review, setReview] = useState(false);
  const [reviewScreen, setReviewScreen] = useState(false);
  const [alertValues, setAlertValues] = useState({
    visible: false,
    text: "",
  });

  console.log(location.state.biddingInfo);

  const sendBid = async () => {
    const bidInfo = {
      sellerEmail: state.accountEmail,
      buyerPostId: location.state.biddingInfo.postId,
      bidAmount: sellerOffer,
      bidImage: imageClassList,
    };
    console.log(bidInfo);
    const sendBidInfo = await axios.post(
      "http://localhost:8080/user/interactions/makebid",
      JSON.stringify(bidInfo),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setAlertValues({
      visible: true,
      text: "Bid Has Been Placed.",
    });
    setTimeout(function () {
      setAlertValues({ visible: false });
    }, 7000);
  };

  const gather = () => {
    let fileInput = document.getElementById("fileInput");

    // Click event
    fileInput.addEventListener(
      "change",
      function start() {
        var file = fileInput.files[0];
        var imageType = /image.*/;

        // Check if Valid
        if (file.type.match(imageType)) {
          var reader = new FileReader();
          reader.onload = function () {
            // Collect Image
            var img = new Image();
            img.src = reader.result;

            // Place image as background image
            document.getElementById("fileDisplayArea").style.backgroundImage =
              "url(" + img.src + ")";
            imageClassList.push(
              new ImageObj("test.png", img.src.split(",")[1])
            );
          }; // End of Reader
          reader.readAsDataURL(file);
        } else {
          console.log("File not supported!");
          alert("File Type not supported.");
        }
        fileInput.value = "";
      },
      false
    );
  };

  return (
    <div className="bg-slate-600 h-screen overflow-auto">
      <NavBar />
      <SolidAlert alertValues={alertValues} />
      <RatingPopup
        trigger={reviewScreen}
        triggerOff={setReviewScreen}
        review={setReview}
        postId={location.state.biddingInfo.postId}
      />

      <div className="text-slate-600 bg-slate-600 h-24"></div>
      <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5 ">
        {/*logo*/}
        <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
          Anti-eBay
        </h1>
        {/* "Bid on Post" */}
        <h2 className=" text-white text-4xl text-center pt-4">Bidding</h2>

        {/*Bid Page info*/}
        <div className="grid grid-cols-2 w-full lg:h-2/3 ">
          {/* photo uploader */}
          <div id="x" className=" flex items-start justify-center">
            <div
              id="fileDisplayArea"
              className="flex justify-center h-3/5 w-3/5 bg-slate-400 items-center mt-20 rounded-lg bg-cover"
            >
              <label className=" bg-slate-400  rounded-sm text-center hover:bg-sky-600 cursor-pointer">
                <input
                  className="w-1 "
                  type="file"
                  id="fileInput"
                  onClick={gather}
                />
                <span className=" text-black">Add Photo Here</span>
              </label>
            </div>
          </div>{" "}
          {/* end of photo uploader */}
          {/* Bid info */}
          <div className="flex flex-col w-4/5 ml-5">
            {location.state.biddingInfo.title !== undefined ? (
              <span className=" text-white text-center mt-20 text-3xl rounded-md my-2">
                {location.state.biddingInfo.title}
              </span>
            ) : (
              <span className=" text-white text-center mt-20 text-3xl rounded-md my-2">
                Item Name Undefined
              </span>
            )}
            {/*<hr />*/}
            <div className="flex flex-col rounded-lg py-3">
              {location.state.biddingInfo.description !== undefined ? (
                <span className="text-white text-center text-lg rounded-t-md bg-slate-700 py-3 border-t-4 border-l-4 border-r-4">
                  {location.state.biddingInfo.description}
                </span>
              ) : (
                <span className="text-white text-center text-lg rounded-t-md bg-slate-700 py-3 border-t-4 border-l-4 border-r-4">
                  Item Description Undefined
                </span>
              )}
              <div className=" bg-slate-700 text-center text-lg py-3 border-4">
                <span className="mr-2 text-white">Buyer's Asking Price: </span>
                {location.state.biddingInfo.price !== undefined ? (
                  <span className="text-white text-center mr-3 text-lg rounded-md">
                    ${location.state.biddingInfo.price}
                  </span>
                ) : (
                  <span className="text-white text-center mr-3 text-lg rounded-md">
                    No Price
                  </span>
                )}
              </div>
              <div className="flex justify-center rounded-b-md py-3 bg-slate-700 border-b-4 border-l-4 border-r-4">
                <span className="text-white text-center text-lg rounded-md hidden lg:block">
                  Your Offer: $
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

            {/* Buttons */}
            <div className="space-x-0 pb-6 mt-6 lg:text-center md:text-left sm:text-left md:space-y-3 sm:space-y-3">
              {!review ? (
                <button
                  className="bg-slate-600 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 w-44"
                  onClick={() => setReviewScreen(true)}
                >
                  Rate This Post
                </button>
              ) : (
                <button
                  disabled={true}
                  className="bg-slate-400 cursor-not-allowed text-white font-bold py-2 px-2 rounded mr-3 w-44"
                >
                  Review Sent!
                </button>
              )}
              <button
                className="bg-slate-600 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 w-44"
                onClick={sendBid}
              >
                Place Your Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
