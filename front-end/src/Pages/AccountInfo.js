import react from "react";
import NavBar from "../Components/NavBar";
const AccountInfo = () => {
  const accountDelete = async () => {
    const sendAccountDelete = await axios.post(
      "http://localhost:8080/post/delete",
      { empty: 0 },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };
  return (
    <div>
      <NavBar />
      <div className=" bg-slate-600 h-full">
        <button className=" w-96 bg-slate-800" onClick={accountDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
