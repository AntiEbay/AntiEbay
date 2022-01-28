import react, { useState } from "react";
import NavBar from "./Components/NavBar";
import axios from "axios";

const signInValues = {
  userName: "",
  password: "",
};

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function test(event) {
    const res = await axios.post(
      "http://localhost:8080/user/registration",
      JSON.stringify(signInValues),
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
    <div>
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            label="password"
            placeholder="Password"
          />
          <button className="bg-slate-600 " type="submit" onClick={test}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
