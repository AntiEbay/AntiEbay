import react, { useContext, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { accountTypeContext } from "../SessionVariables";
import axios from "axios";
const AccountInfo = () => {
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
  let rating = 0;
  const getSpecificUserRating = async () => {
    const getRating = await axios.post(
      "http://localhost:8080/user/",
      { empty: 0 },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    rating = getRating.data.userRating;
  };
  getSpecificUserRating();

  return (
    <div>
      <NavBar />
      <div className=" bg-slate-600 h-screen flex flex-col items-center">
        <div className="flex my-3">
          <span className=" text-3xl text-white mr-2 text-center">
            User Rating:
          </span>
          <span className=" text-3xl text-white text-center">{rating}</span>
          <span className=" text-amber-300 text-3xl text-center">&#9733;</span>
        </div>
        <button
          className=" w-96 bg-slate-800 text-white p-2 hover:bg-slate-400"
          onClick={accountDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
