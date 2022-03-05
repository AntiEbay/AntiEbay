import react, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import PostDisplay from "../Components/PostDisplays/PostDisplay";
import { accountTypeContext } from "../SessionVariables";
import axios from "axios";

const ManageBids = () => {
  //Page for a buyer to view all their personal posts
  //Uses AcceptBidPostDisplay
  const { state, update } = useContext(accountTypeContext);
  const [posts, setPosts] = useState(undefined);
  const accountEmailFromState = state.accountEmail;
  const accountTypeFromState = state.accountType;
  const newArray = [];
  useEffect(() => {
    const retrieveAccountposts = async () => {
      try {
        const accountInfo = {
          accountEmail: accountEmailFromState,
          accountType: accountTypeFromState,
        };
        const getAccountPosts = await axios.post(
          "http://localhost:8080/user/interactions/allpostswithuserbids",
          { empty: 0 },
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(getAccountPosts);
        Object.keys(getAccountPosts.data).map((key) =>
          newArray.push(getAccountPosts.data[key])
        );
      } catch (error) {
        console.log("error");
      }
      console.log(newArray);
      setPosts(
        newArray.map(
          (key) => (
            console.log(key),
            (
              <PostDisplay
                imgStrings={key.imageList}
                bids={key.bidList}
                title={key.title}
                description={key.description}
                price={key.price}
                condition={key.productCondition}
                userRating={key.buyerRating}
                postId={key.id}
                buyerEmail={key.buyerEmail}
                quantity={key.quantity}
              />
            )
          )
        )
      );
    };
    retrieveAccountposts();
    console.log(posts);
  }, [accountEmailFromState]);
  return (
    <div className="bg-slate-600 h-screen overflow-auto">
      <NavBar />


      <div className="text-slate-600 bg-slate-600 h-24"></div>
      <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5 ">
        {/*logo*/}
        <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
          Anti-eBay
        </h1>
        {/* Links */}
        <div className="flex justify-center w-full space-x-4 h-13 relative p-1 bg-slate-800">
          <Link to="/ManageBids">
              <button className="text-white border-b border-white text-xl hover:bg-sky-700 rounded-t-lg p-1">
                Manage Bids
              </button>
            </Link>
          <Link to="/ActiveOrders">
            <button className="text-white text-xl hover:bg-sky-700 rounded-lg p-1">
              Orders To Fill
            </button>
          </Link>
        </div>

        <div className="flex flex-col w-full items-center">{posts}</div>
      </div>
 
    </div>
    /*<div className=" bg-slate-600 h-screen">
      <NavBar />
      <hr />
      <div className="flex justify-center w-full space-x-4 h-13 relative p-1 bg-slate-800">
        <div className="p-1.5 space-x-12">
          <Link to="/ManageBids">
            <button className="text-white border-b border-white text-xl hover:bg-sky-700 rounded-t-lg p-1">
              Manage Bids
            </button>
          </Link>
          <Link to="/ActiveOrders">
            <button className="text-white text-xl hover:bg-sky-700 rounded-lg p-1">
              Orders To Fill
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">{posts}</div>
    </div>*/
  );
};

export default ManageBids;
