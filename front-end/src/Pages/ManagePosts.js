import react, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import AcceptBidPostDisplay from "../Components/PostDisplays/AcceptBidPostDisplay";
import { accountTypeContext } from "../SessionVariables";
import axios from "axios";
const ManagePosts = () => {
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
          "http://localhost:8080/search",
          JSON.stringify(accountInfo),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(getAccountPosts);
        Object.keys(getAccountPosts.data.searchResults).map((key) =>
          newArray.push(getAccountPosts.data.searchResults[key])
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
              <AcceptBidPostDisplay
                imgStrings={key.post.imageList}
                bids={key.post.bidList}
                title={key.post.title}
                description={key.post.description}
                price={key.post.price}
                condition={key.post.productCondition}
                userRating={key.buyerRating}
                postId={key.post.id}
                buyerEmail={key.post.buyerEmail}
                quantity={key.post.quantity}
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

export default ManagePosts;
