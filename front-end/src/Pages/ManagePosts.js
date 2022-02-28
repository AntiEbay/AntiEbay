import react from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
const ManagePosts = () => {
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
    </div>
  );
};

export default ManagePosts;
