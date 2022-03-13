import React from "react";
import "../Elements/hamburgerMenuStyles.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBarButtons = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    window.location.reload(false);
  };

  if (props.accountType === "buyer") {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <Link to="/BuyerPost">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Create Post
              </button>
            </Link>
            <Link to="/ManagePosts">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                View Posts
              </button>
            </Link>
            <Link to="AccountInfo">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Account
              </button>
            </Link>
            <button
              className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded"
              onClick={logout}
            >
              Log Out
            </button>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <Link to="/BuyerPost">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Create Post
            </button>
          </Link>
          <Link to="/ManagePosts">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              View Post
            </button>
          </Link>
          <Link to="/AccountInfo">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Link>
          <button
            className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  } else if (props.accountType === "seller") {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <Link to="/ManageBids">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Active Bids
              </button>
            </Link>
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Fill Orders
            </button>
            <Link to="AccountInfo">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Account
              </button>
            </Link>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <Link to="/ManageBids">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Active Bids
            </button>
          </Link>
          <Link to="/AccountInfo">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Link>
          <button
            className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <Link to="/SignIn">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Log In
              </button>
            </Link>
            <Link to="/SignUp">
              <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Sign Up
              </button>
            </Link>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <Link to="/SignIn">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Log In
            </button>
          </Link>
          <Link to="/SignUp">
            <button className="hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default NavBarButtons;
