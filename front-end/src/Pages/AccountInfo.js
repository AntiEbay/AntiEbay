import react, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { accountTypeContext } from "../SessionVariables";
import axios from "axios";
const AccountInfo = () => {
    const [rating, setRating] = useState();
  const { state, update } = useContext(accountTypeContext);
  const accountDelete = async () => {
    const sendAccountDelete = await axios.post(
      "http://localhost:8080/account/delete",
      { emailAddress: state.accountEmail },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };
  const getSpecificUserRating = async () => {
    const getRating = await axios.post(
      "http://localhost:8080/user/review/retrieve",
      { empty: 0 },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setRating(getRating.data);
    console.log(getRating)
    console.log(rating);
  };
  getSpecificUserRating();

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
        <h2 className=" text-white text-4xl text-center pt-4">
          Account Info
        </h2>

        {/* "User Rating" */}
        <div className="flex my-3 h-screen flex-col items-center mt-20">
          <span className=" text-3xl text-white mr-2 text-center">
            User Rating:
          </span>
          <span className=" text-3xl text-white text-center">{rating}</span>
          <span className=" text-amber-300 text-3xl text-center">&#9733;</span>
        
          {/* "Delete account button" */}
          <button
            className=" w-36 bg-slate-600 text-white p-2 font-bold rounded-lg hover:bg-sky-700 mt-20"
            onClick={accountDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
