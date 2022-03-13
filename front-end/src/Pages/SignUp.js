import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import SolidAlert from "../Components/Alerts/SolidAlert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const signUpValues = {
  userName: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  userType: "",
};

/**
 *
 * @returns  Renders an html page of the sign-up page.
 */
const SignUp = () => {
  //Variables to send to backend
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); //Todo make this code more dry
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(Boolean);
  const [alertValues, setAlertValues] = useState({
    visible: false,
    text: "",
  });

  //Post Request Fucntion
  async function postSignUpRequest(event) {
    try {
      event.preventDefault();
      signUpValues.userName = userName;
      signUpValues.firstName = firstName;
      signUpValues.lastName = lastName;
      signUpValues.emailAddress = emailAddress;
      signUpValues.password = password;
      signUpValues.userType = userType ? "buyer" : "seller";
      const res = await axios
        .post(
          "http://localhost:8080/user/registration",
          JSON.stringify(signUpValues),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        )
        .then(navigate("/SignIn"));
      //Will update the solid alert to show
      //If status === 200 then the sign up request was sucessfuly processed.
      //Else there was an error.
      if (res.status !== 200) {
        setAlertValues({
          visible: true,
          text: "Your sign up request was unsuccessful. Please try again.",
        });
      }
    } catch (error) {
      setAlertValues({
        visible: true,
        text: "Your sign up request was unsuccessful. Please try again.",
      });
    }
  }

  return (
    <div className="">
      <NavBar />
      <SolidAlert alertValues={alertValues} />
      <div className="text-slate-600 bg-slate-600 md:h-16"></div>
      {/* Everything below NavBar */}
      <form className=" bg-slate-600 h-fit md:h-screen">
        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 md:rounded-lg lg:w-3/4 lg:h-fit">
          <hr className=" md:hidden" />
          {/*logo*/}
          <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
            Anti-eBay
          </h1>

          {/* "Create your account" */}
          <h2 className=" text-white text-4xl text-center pb-10 pt-4">
            Create your Account
          </h2>

          {/* Input Boxes */}
          <div className="flex flex-col md:items-center">
            {/* First line */}
            <div className="space-x-0 pb-6">
              {/* First Name */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8 pl-2"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                name="firstName"
                label="First Name"
                placeholder="First Name"
              />

              {/* last Name */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8 pl-2"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
              />
            </div>

            {/* Second line */}
            <div className="pb-6">
              {/* Email */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none lg:w-96 md:w-96 sm:w-96 h-8 pl-2"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
                name="emailAddress"
                label="email Address"
                placeholder="Email Address"
              />
            </div>

            {/* Third line */}
            <div className="space-x-0 pb-6">
              {/* UserName */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8 pl-2"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                label="UserName"
                placeholder="Username"
              />

              {/* Password */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8 pl-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                label="Password"
                placeholder="Password"
              />
            </div>

            <p className="text-white pb-3 text-center">
              Select the type of profile you would like to create
            </p>

            {/*Usertype = true means buyer, false means seller */}
            {/* Radio Buttons*/}
            <ul className="flex flex-col w-full md:w-96">
              {/* Buyer Selection */}
              <li className="relative">
                <input
                  className="sr-only peer"
                  id="buyer"
                  type="radio"
                  name="accountType"
                  value={userType}
                  onChange={() => setUserType(true)}
                />
                <label
                  for="buyer"
                  className="hover:bg-sky-500 flex flex-col bg-slate-600 rounded-lg cursor-pointer focus:outline-none
                            text-white text-4xl text-center border-transparent
                            peer-checked:bg-sky-700"
                >
                  Buyer
                  <label
                    className="text-white text-center text-lg pt-1 cursor-pointer focus:outline-none peer-checked:bg-sky-700"
                    for="buyer"
                  >
                    Advertise to sellers that you're interested<br></br> in
                    items, you set the price range.
                  </label>
                </label>

                {/* OR */}
                <div className="flex flex-col content-center text-center">
                  <h1 className="text-white text-2xl italic text-center">Or</h1>
                </div>

                {/* Seller Selection */}
                <li className="relative">
                  <input
                    className="sr-only peer"
                    id="seller"
                    type="radio"
                    name="accountType"
                    value={userType}
                    onChange={() => setUserType(false)}
                  />
                  <label
                    for="seller"
                    className="hover:bg-sky-500 flex flex-col bg-slate-600 rounded-lg cursor-pointer focus:outline-none 
                          text-white text-4xl text-center border-transparent
                          peer-checked:bg-sky-700"
                  >
                    Seller
                    <label
                      className="text-white text-center text-lg pt-1 cursor-pointer focus:outline-none peer-checked:bg-sky-700"
                      for="seller"
                    >
                      Find persepctive buyers that could be<br></br> interested
                      in your product.
                    </label>
                  </label>
                </li>
              </li>
            </ul>

            {/*Already Have an Account?*/}
            <div className="flex flex-col w-96">
              <p className="py-6 text-white text-center">
                Already have an account?{" "}
                <a className="text-white underline" href="SignIn">
                  Click Here
                </a>
              </p>
            </div>

            {/*Submit button*/}
            <button
              className=" bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700 mb-4 self-center"
              type="submit"
              onClick={postSignUpRequest}
            >
              Sign Up
            </button>
            <div></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
