import React, { useContext } from "react";
import axios from "axios";
import { accountTypeContext } from "../../SessionVariables";
import { useNavigate } from "react-router-dom";
/**
 *
 * @param  props Contains information about the post
 * @returns A JSX element that displays information about the post in a card
 * This card will be dispayed when a seller wins their bid.
 * Contains a button that allows seller to complete the order acting as a transaction.
 */
const OrderToFillPostTest = (props) => {
  const { state, update } = useContext(accountTypeContext);
  const navigate = useNavigate();
  const postCompleteBid = async () => {
    const postValues = {
      postId: props.postId,
    };
    console.log(props);
    console.log(postValues);
    const completedBid = await axios.post(
      "http://localhost:8080/user/interaction/completepost",
      JSON.stringify(postValues),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    navigate("/ManageBids");
  };
  return (
    <div className="flex w-full md:w-96 bg-slate-800 hover:shadow-lg rounded-lg ring-2 ring-white py-6">
      <div className="w-2/3 p-4">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl">
            {props.title}
            <span className=" text-sm">x</span>
            {props.quantity}
          </h1>
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
            <button
              className=" bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded my-1 px-3"
              onClick={postCompleteBid}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderToFillPostTest;
