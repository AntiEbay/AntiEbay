import react, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import AcceptBidPostDisplay from "../Components/PostDisplays/AcceptBidPostDisplay";
import { accountTypeContext } from "../SessionVariables";
import axios from "axios";
import PostCompleted from "../Components/PostDisplays/PostCompleted";
//Seller page to fill orders
const ActiveOrders = () => {
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
          "http://localhost:8080/user/interactions/getcompletedposts",
          {"empty" : 0},
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
            // console.log(key),
            (
              <PostCompleted
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
    <div className=" bg-slate-600 h-screen">
      <NavBar />
      <hr />
      <div className="flex justify-center w-full space-x-4 h-13 relative p-1 bg-slate-800">
        <div className="p-1.5 space-x-12">
          <Link to="/ManagePosts">
            <button className="text-white border-b border-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Active Posts
            </button>
          </Link>
          <Link to="/CompletedPosts">
            <button className="text-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Completed Posts
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">{posts}</div>
    </div>
  );
};

export default ActiveOrders;
