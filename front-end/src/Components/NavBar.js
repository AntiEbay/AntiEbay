import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Elements/Logo";
import { accountTypeContext } from "../SessionVariables";
import NavBarButtons from "./NavBarComponents/NavBarButtons";
const NavBar = () => {
  const { state, update } = useContext(accountTypeContext);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex justify-between w-full space-x-4 h-12 relative p-1 bg-slate-800">
      <div className="flex p-1.5">
        <Link to="/">
          <Logo />
        </Link>
        <div className="relative mx-auto text-gray-600 ml-2">
          <input
            className="border-2 border-gray-300 bg-white h-8 px-5 pr-16 rounded-lg w-48 lg:w-96 text-sm focus:outline-none"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            label="searchQuery"
            name="searchQuery"
            placeholder="Search"
            type="search"
          />
          <Link
            to={{
              pathname: "/SearchResults",
              search: searchQuery,
            }}
          >
            <button
              type="submit"
              className="absolute -right-2 bottom-0.5 mt-5 mr-4"
            >
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
          </Link>
        </div>
      </div>
      <NavBarButtons accountType={state.accountType} />
    </div>
  );
};

export default NavBar;
