import react, { useState } from "react";
import NavBar from "./Components/NavBar";
import axios from "axios";
import { ReactBurgerMenu } from "react-burger-menu";

const signUpValues = {
  userName: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
};

const SignUp = () => {
  const [userName, setUserName] = useState(""); //Todo make this code more dry
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");


  async function testPrint(event) {
    event.preventDefault();
    signUpValues.userName = userName;
    signUpValues.firstName = firstName;
    signUpValues.lastName = lastName;
    signUpValues.emailAddress = emailAddress;
    signUpValues.password = password;
    console.log(signUpValues);
    const res = await axios.post(
      "http://localhost:8080/user/registration",
      JSON.stringify(signUpValues),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data.data);
    console.log(res.data.headers["Content-Type"]);
  }
  return (
    <div className="">
      <NavBar />

      {/* Everything below NavBar */}
      <form className="flex bg-slate-600 h-screen">

        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5 ">

          {/*logo*/}
          <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
            Anti-eBay
          </h1>

          {/* "Create your account" */}
          <h2 className=" text-white text-4xl text-center pb-10 pt-4">
            Create your Account
          </h2>

          

          {/* Input Boxes */}
          <div className="flex flex-col items-center">

            {/* First line */}
            <div className="space-x-0 pb-6">

              {/* First Name */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                name="firstName"
                label="First Name"
                placeholder="  First Name"
              />

              {/* last Name */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                name="lastName"
                label="Last Name"
                placeholder="  Last Name"
              />
            </div>

            {/* Second line */}
            <div className="pb-6">

              {/* Email */}
              <input
              className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-96 h-8"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              name="emailAddress"
              label="email Address"
              placeholder="  Email Address"
            />
            </div>

            {/* Third line */}
            <div className="space-x-0 pb-6">

              {/* UserName */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                label="UserName"
                placeholder="  Username"
              />

              {/* Password */}
              <input
                className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-48 h-8"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                label="Password"
                placeholder="  Password"
              />
            </div>

            {/* Buyer/Seller buttons */}
            <p className="text-white pb-3">Select the type of profile you would like to create</p>
            <div className="flex flex-col bg-slate-800 w-96">

              {/* Buyer */}
              <button className="bg-slate-600 rounded-lg hover:bg-sky-700">
                <p className="text-white text-4xl text-center">Buyer</p>
                <p className="text-white text-center">Advertise to sellers that you're interested<br></br> in items, you set the price range.</p>
                
              </button>

              {/* OR */}
              <div className="flex flex-col content-center text-center">
                <h1 className="text-white text-2xl italic text-center">Or</h1>
              </div>
                

              {/* Seller */}
              <button className=" bg-slate-600 rounded-lg hover:bg-sky-700">
                <h1 className="text-white text-4xl text-center">Seller</h1>
                <p className="text-white text-center">Find persepctive buyers that could be<br></br> interested in your product.</p>
                
              </button>
            </div>

            {/*Already Have an Account?*/}
            <div className="flex flex-col w-96">
              <p className="py-6 text-white text-center">Already have an account?  <a className="text-white underline" href="SignIn.js">Click Here</a>
              </p>
            </div>
            
            {/*Submit button*/}
            <button 
              className="button1 bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700" 
              type="submit" 
              onClick={testPrint}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
