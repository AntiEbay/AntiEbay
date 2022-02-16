import React from "react";
import "../Elements/hamburgerMenuStyles.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

const NavBarButtons = (props) => {
  console.log(props.accountType);
  if (props.accountType === "buyer") {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <Link to="/BuyerPost">
              <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Create Post
              </button>
            </Link>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              View Posts
            </button>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <Link to="/BuyerPost">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Create Post
            </button>
          </Link>
          <Link to="/SignIn">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              View Post
            </button>
          </Link>
          <Link to="/SignUp">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (props.accountType === "seller") {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Active Bids
            </button>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Orders
            </button>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
            Active Bids
          </button>
          <Link to="/SignIn">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Orders
            </button>
          </Link>
          <Link to="/SignUp">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Account
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              FAQ
            </button>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Log In
            </button>
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Sign Up
            </button>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
            FAQ
          </button>
          <Link to="/SignIn">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Log In
            </button>
          </Link>
          <Link to="/SignUp">
            <button className="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default NavBarButtons;
