import React, { useContext } from "react";
import TypeWriter from "typewriter-effect";
import { accountTypeContext } from "../../SessionVariables";
import { Link } from "react-router-dom";
const HomePageInfo = () => {
  const { state, update } = useContext(accountTypeContext);
  if (state.accountType == "buyer") {
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
            onInit={(typewriter) => typewriter.typeString("Anti-eBay").start()}
          />
        </div>
        <div className=" flex text-3xl">
          <Link to={"./BuyerPost"}>
            <button
              className="hover:bg-slate-400 cursor-pointer text-white text-3xl
                                        font-bold py-2 px-2 rounded bg-slate-800 mt-10"
            >
              Create A Post
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (state.accountType == "seller") {
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
            onInit={(typewriter) => typewriter.typeString("Anti-eBay").start()}
          />
        </div>
        <div className=" flex text-3xl">
          <button
            className="hover:bg-slate-400 cursor-pointer text-white text-3xl
                                      font-bold py-2 px-2 rounded bg-slate-800 mt-10"
          >
            View Bids
          </button>
        </div>
      </div>
    );
  } else {
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
            onInit={(typewriter) => typewriter.typeString("Anti-eBay").start()}
          />
        </div>
        <div className=" flex text-3xl">
          <Link to={"./SignUp"}>
            <button
              className="hover:bg-slate-400 cursor-pointer text-white text-3xl
                                      font-bold py-2 px-2 rounded bg-slate-800 mt-10"
            >
              Sign up for free
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default HomePageInfo;
