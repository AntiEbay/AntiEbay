import React from "react";
import Logo from "./Elements/Logo";
/**
 * Contains logo, SearchBar and three Right alligned buttons In that order. 
 * todo - Make searchBar look better
 *  
 */
const NavBar = () => {
    return (
        <div className="flex justify-between space-x-4 h-12 relative p-1 bg-slate-800">
            <div className="flex p-1.5">
                <Logo/> 
                <div className=" ml-4">      
                    <input className="w-80 h-7 rounded-l-full shadow-lg outline-none
                    font-thin text-xl px-4" placeholder="Search"/>                  
                    <button className="h-7 w-28 text-white rounded-r-full text-xl
                    font-thin space-x-0 hover:bg-slate-400">Search</button>
                </div>
            </div>
            <div>
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
                FAQ
            </button>
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Log In
            </button>
            <button class="hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Sign Up
            </button>
            </div>
        </div>
    );
};

export default NavBar;