import React from "react";
import TypeWriter from 'typewriter-effect';
const HomePageInfo = () => {
    return (
            <div className=" flex flex-col items-center text-white text-6xl">  
                <div className=" hidden lg:flex">
                    <TypeWriter 
                        onInit={(typewriter) =>
                        typewriter
                        .typeString("A new way to sell your products.")
                        .deleteChars(19)
                        .typeString("buy the products you want.")
                        .deleteAll()
                        .typeString("Anti-eBay")
                        .start()
                        }
                    />
                </div>
                <div className="flex lg:hidden">
                <TypeWriter 
                        onInit={(typewriter) =>
                        typewriter
                        
                        .typeString("Anti-eBay")
                        .start()
                        }
                    />
                </div>
                <div className=" flex text-3xl">
                    <button className="hover:bg-slate-400 cursor-pointer text-white text-3xl
                                        font-bold py-2 px-2 rounded bg-slate-800 mt-10">
                        Sign up for free
                    </button>
                </div>
            </div>
    );
}

export default HomePageInfo;