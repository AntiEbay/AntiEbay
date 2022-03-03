import React, { useState, useContext } from "react";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const { state, update } = useContext(accountTypeContext);
  const postReview = async () => {
    const review = {
      rating: rating,
      comment: comment,
      //Email to send review about
      sellerEmail: state.accountEmail,
      postId: props.postId,
    };
    console.log(review);
    const postReviewRes = await axios.post(
      "http://localhost:8080/post/review/writing",
      JSON.stringify(review),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };
  if (props.trigger) {
    return (
      <div className=" fixed top-32 left-0 w-full h-full backdrop-blur">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold text-center">
                Your opinion matters!
              </h2>
            </div>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-lg text-gray-800">
                  How would you rate this post?
                </span>
                <div>
                  <div className="flex space-x-3"></div>
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={
                          index <= (hover || rating)
                            ? " text-amber-300 text-5xl"
                            : " text-gray-600 text-5xl"
                        }
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                      >
                        <span className="star">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                  rows="3"
                  className="p-4 text-gray-500 rounded-xl resize-none"
                  onChange={(e) => setComment(e.target.value)}
                >
                  Leave a message, if you want
                </textarea>
                <button
                  className="py-3 my-8 text-lg bg-gradient-to-r from-slate-400 to-slate-600 rounded-xl text-white hover:bg-slate-400"
                  onClick={postReview}
                >
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center">
              <button onClick={() => props.triggerOff(false)}>
                Maybe later
              </button>
            </div>
          </div>

          <div className="mt-8 text-gray-700"></div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StarRating;
