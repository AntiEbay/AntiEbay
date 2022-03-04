import react, { useState, useContext } from "react";
import NavBar from "../Components/NavBar";
import RatingPopup from "../Components/RatingPopup";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
import { useLocation } from "react-router-dom";

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

  const sendBid = async () => {
    const bidInfo = {
      sellerEmail: state.accountEmail,
      buyerPostId: location.state.biddingInfo.postId,
      bidAmount: sellerOffer,
    };
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
            document.getElementById("fileDisplayArea").style.backgroundImage = "url(" + img.src + ")";
            imageClassList.push(new ImageObj("test.png", img.src.split(",")[1]));
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
    <div className="flex flex-col items-center bg-slate-600 h-screen">
      <NavBar />
      <RatingPopup
        trigger={reviewScreen}
        triggerOff={setReviewScreen}
        review={setReview}
      />
      <div className=" grid lg:grid-cols-2 bg-slate-800 lg:w-3/4 lg:h-2/3 mt-20">
        <div id="x"className=" flex items-start justify-center">
          <div id="fileDisplayArea"
               className="flex items-start justify-center flex h-1/2 w-1/2 bg-slate-400 items-center justify-center mt-20 rounded-lg bg-cover">
            <label className=" bg-slate-400  rounded-sm text-center hover:bg-sky-600 cursor-pointer">
                <input className="w-1 " type="file" id="fileInput" onClick={gather}/>
                <span className=" text-black">Add Photos Here</span>
            </label>
          </div>
        </div>
        <div className=" flex flex-col">
          {/*{location.state.biddingInfo.title !== undefined ? (
            <span className=" text-white text-center mt-20 mr-3 text-3xl rounded-md my-2">
              {location.state.biddingInfo.title}
            </span>
          ) : (*/}
            <span className=" text-white text-center mt-20 mr-3 text-3xl rounded-md my-2">
              Item name is undefined
            </span>
          {/*})}*/}
          <hr />
          <div className="flex flex-col bg-slate-600 rounded-lg mr-3 mt-1">
            {/*{location.state.biddingInfo.description !== undefined ? (
              <span className="text-white text-center  bg-slate-600 mr-3 text-lg rounded-md my-3">
                {location.state.biddingInfo.description}
              </span>
            ) : (*/}
              <span className=" text-white text-center bg-slate-600 mr-3 text-lg rounded-md my-3">
                Item description is undefined.
              </span>
            {/*})}*/}
            <hr />
            <div className=" bg-slate-600 mr-3 text-center rounded-md text-lg my-3">
              <span className="mr-2 text-white">buyer asking price: </span>
              {/*{location.state.biddingInfo.price !== undefined ? (
                <span className="text-white text-centermr-3 text-lg rounded-md">
                  ${location.state.biddingInfo.price}
                </span>
              ) : (*/}
                <span className=" text-white text-center mr-3 text-lg rounded-md">
                  No Price
                </span>
              {/*})}*/}
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
            <button
              className=" text-white text-lg hover:bg-slate-400 rounded-md p-2 ring-2 ring-white mr-3"
              onClick={sendBid}
            >
              Place your bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;