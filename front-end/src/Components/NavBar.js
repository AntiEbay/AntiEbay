import React from "react";
const NavBar = () => {
    return (
        <div className="flex flex-row-reverse space-x-4 space-x-reverse h-12 bg-slate-500 relative p-1">
            <button class="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Log In
            </button>
            <button class="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                Sign Up
            </button>
            <button class="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-2 rounded">
                FAQ
            </button>
        </div>
    );
};

export default NavBar;