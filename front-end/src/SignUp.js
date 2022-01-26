import react, { useState } from "react";
import NavBar from "./Components/NavBar";
import axios from "axios";

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
    <form>
      <NavBar />
      <div className="flex flex-col">
        <input
          className="border-2 border-gray-600"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          label="UserName"
          placeholder="Username"
        />
        <input
          className="border-2 border-gray-600"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />
        <input
          className="border-2 border-gray-600"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
        />
        <input
          className="border-2 border-gray-600"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          name="emailAddress"
          label="email Address"
          placeholder="email Address"
        />
        <input
          className="border-2 border-gray-600"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          label="Password"
          placeholder="Password"
        />
        <button type="submit" onClick={testPrint}>
          submit
        </button>
      </div>
    </form>
  );
};

export default SignUp;
