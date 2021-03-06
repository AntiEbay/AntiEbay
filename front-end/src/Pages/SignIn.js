import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
import SolidAlert from "../Components/Alerts/SolidAlert";
import { useNavigate } from "react-router-dom";
const signInValues = {
  emailAddress: "",
  password: "",
};

/**
 *
 * @returns Renders an html page of the Sign In page.
 */
const SignIn = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [alertValues, setAlertValues] = useState({
    visible: false,
    text: "",
  });
  //Use context for global account type and islogged in variable.
  const { state, update } = useContext(accountTypeContext);
  //Sign in requets
  const signInPostRequest = async (event) => {
    try {
      event.preventDefault();
      signInValues.emailAddress = emailAddress;
      signInValues.password = password;
      const signInResults = await axios
        .post(
          "http://localhost:8080/user/login",
          JSON.stringify(signInValues),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(navigate("/"));
      console.log(signInResults);
      update({
        accountType: signInResults.data.userType,
        isLoggedIn: signInResults.data.isLoggedIn,
        accountEmail: signInValues.emailAddress,
      });
      console.log(state);
      if (signInResults.data.isLoggedIn === true) {
        setAlertValues({
          visible: true,
          text: "Success! You are now logged in.",
        });
      } else {
        setAlertValues({
          visible: true,
          text: "Log in request failed",
        });
      }
    } catch (error) {
      setAlertValues({
        visible: true,
        text: "Log in request failed.",
      });
    }
  };

  return (
    <div className="flex flex-col bg-slate-600 h-screen">
      <NavBar />
      <SolidAlert alertValues={alertValues} />
      <form className="flex h-screen">
        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5">
          {/*logo*/}
          <div className="flex flex-col items-center">
            <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
              Anti-eBay
            </h1>
            <h2 className=" text-white text-4xl text-center pt-4">Sign In</h2>
            <input
              className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-60 lg:w-96 h-8 my-5 pl-2"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              label="email address"
              placeholder="Email Address"
            />
            <input
              className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-60 lg:w-96 h-8 mb-5 pl-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              label="password"
              placeholder="Password"
              type="password"
            />
            <button
              className="button1 bg-slate-600 text-white font-bold w-2/5 lg:w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700"
              type="submit"
              onClick={signInPostRequest}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
