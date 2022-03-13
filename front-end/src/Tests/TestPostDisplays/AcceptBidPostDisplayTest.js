import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
/**
 *
 * @param  props that contains all information about the post.
 * @returns A JSX element that is a card the has the post information in a readable format
 * This is the post com that is used in ManagePosts.js
 * The button leads to ViewBids.js and the com BidDisplay
 * This component is used in ManagePosts.js
 */

const AcceptBidPostDisplayTest = (props) => {
  const postDelete = async () => {
    const postInfo = {
      postId: parseInt(props.postId),
    };
    console.log(postInfo);
    const sendpostDelete = await axios
      .post("http://localhost:8080/post/delete", JSON.stringify(postInfo), {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(props.forceRender(!props.renderVar));
    //   .then(navigate("/ManagePosts"));
  };
  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6 my-2">
      <div className="w-2/3 p-4">
        <div className="flex justify-between w-full">
          <h1 className="text-white font-bold text-2xl">
            {props.title}
            <span className=" text-sm">x</span>
            {props.quantity}
          </h1>
          <div>
            <span
              className=" text-red-600 cursor-pointer text-lg hover:text-red-900 hover:bg-red-50"
              onClick={postDelete}
            >
              X
            </span>
          </div>
        </div>
        <hr />
        <p className="mt-2 text-white text-sm">{props.description}</p>
        <div className="flex item-center mt-2"></div>
        <div className="flex item-center justify-between mt-3">
          <div className="flex flex-grow justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">${props.price}</h1>
              <h1 className="text-white text-sm">
                Condition: {props.condition}
              </h1>
            </div>
            <Link to={"/ViewBids"} state={{ bids: props.bids }}>
              {" "}
              <button className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 lg:px-3 lg:py-2">
                See Active Bids
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptBidPostDisplayTest;
