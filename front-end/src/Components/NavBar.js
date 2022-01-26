import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Elements/Logo";
import "./Elements/hamburgerMenuStyles.css";
import { slide as Menu } from "react-burger-menu";

const NavBar = () => {
  return (
    <div className="flex justify-between w-full space-x-4 h-12 relative p-1 bg-slate-800">
      <div className="flex p-1.5">
        <Link to="/">
          <Logo />
        </Link>
        <div class="relative mx-auto text-gray-600 ml-2">
          <input
            class="border-2 border-gray-300 bg-white h-8 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" class="absolute -right-2 bottom-0.5 mt-5 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex">
        <div id="sideBar" className="flex lg:hidden">
          <Menu right outerContainerId="sideBar">
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              FAQ
            </button>
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Log In
            </button>
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Sign Up
            </button>
          </Menu>
        </div>
        <div className=" mx-5 hidden lg:flex">
          <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
            FAQ
          </button>
          <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
            Log In
          </button>
          <Link to="/SignUp">
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
