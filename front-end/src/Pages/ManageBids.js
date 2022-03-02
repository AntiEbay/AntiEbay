import react from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import PostDisplay from "../Components/PostDisplays/PostDisplay";
const ManageBids = async () => {
  //Page for a seller to view all their personal bids
  //Uses normal post display
  try {
    const getSearchRes = await axios.post(
      "http://localhost:8080/getpostsuserhadbidon",
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(getSearchRes);
    Object.keys(getSearchRes.data.searchResults).map((key) =>
      newArray.push(getSearchRes.data.searchResults[key])
    );
    console.log(newArray);
    setPosts(
      newArray.map(
        (key) => (
          console.log(key),
          (
            <PostDisplay
              imgStrings={key.post.imageList}
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
  } catch (error) {
    console.log("error");
  }

  return (
    <div className=" bg-slate-600 h-screen">
      <NavBar />
      <hr />
      <div className="flex justify-center w-full space-x-4 h-13 relative p-1 bg-slate-800">
        <div className="p-1.5 space-x-12">
          <Link to="/ManageBids">
            <button className="text-white border-b border-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Active Bids
            </button>
          </Link>
          <Link to="/ActiveOrders">
            <button className="text-white text-xl hover:bg-slate-400 hover:rounded-lg p-1">
              Active Ordres
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageBids;
