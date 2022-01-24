import React from "react";
import NavBar from "./Components/NavBar";
import HomePageInfo from "./Components/HomePageInfo";
const HomePage = () => {
    return (
        <div className="flex flex-col  bg-slate-600 h-screen">
            <div className="">
                <NavBar />
            </div>
            <div className=" relative top-1/4">  
                <HomePageInfo />
            </div>
        </div>
    );
}

export default HomePage;