import react, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
const signInValues = {
  emailAddress: "",
  password: "",
};

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { state, update } = useContext(accountTypeContext);

  const signInPostRequest = async (event) => {
    event.preventDefault();
    // console.log(emailAddress);
    signInValues.emailAddress = emailAddress;
    signInValues.password = password;
    const logInResults = await axios.post(
      "http://localhost:8080/user/login",
      JSON.stringify(signInValues),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    update({ accountType: "1" });
  };

  return (
    <div>
      <NavBar />
      <form className="flex bg-slate-600 h-screen">
        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5">
          {/*logo*/}
          <div className="flex flex-col items-center">
            <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
              Anti-eBay
            </h1>
            <h2 className=" text-white text-4xl text-center pt-4">Sign In</h2>
            <input
              className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-96 h-8 my-5 pl-2"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              label="email address"
              placeholder="Email Address"
            />
            <input
              className="border-2 border-gray-600 rounded-md text-sm focus:outline-none w-96 h-8 mb-5 pl-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              label="password"
              placeholder="Password"
            />
            <button
              className="button1 bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700"
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
