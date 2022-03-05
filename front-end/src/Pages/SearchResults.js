import react, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";
import PostDisplay from "../Components/PostDisplays/PostDisplay";
const SearchResults = () => {
  const location = useLocation();
  const [advSearchShow, setAdvSearchShow] = useState(true);
  const [searchQuery, setSearchQuery] = useState(location.search.substring(1));
  const [category, setCategory] = useState("null");
  const [minPrice, setMinPrice] = useState(Number.MIN_VALUE);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  const newArray = [];
  const [posts, setPosts] = useState(undefined);
  //Making a list of all the search Results
  const [imgString, setImgString] = useState("");

  const startSearch = async (event) => {
    event.preventDefault();
    const options = {};
    const search = {};
    if (
      category === "null" &&
      minPrice === Number.MIN_VALUE &&
      maxPrice === Number.MAX_VALUE
    ) {
      //If check if no adv search parameters are added
      const options = {};
      const search = {
        query: "",
        options,
      };
      search.query = searchQuery;
    } else {
      //Else if there are adv search parameters
      const options = {
        category: "",
        maxPrice: 0,
        minPrice: 0,
      };
      const search = {
        query: "",
        options,
      };
      search.options.category = category;
      search.option.minPrice = minPrice;
      search.options.minPrice = maxPrice;
    }
    search.query = searchQuery;
    try {
      const getSearchRes = await axios.post(
        "http://localhost:8080/search",
        JSON.stringify(search),
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
      // console.log(error);
      console.log(posts);
    }
  };
  useEffect(() => {
    console.log();
    startSearch(event);
  }, [searchQuery]);
  if (advSearchShow) {
    return (
      <div className=" bg-slate-600 h-screen overflow-auto">
        <NavBar />
        <div className="text-slate-600 bg-slate-600 h-24"></div>
        <div className="m-auto bg-slate-800 rounded-lg w-3/4 h-4/5">
          {/*logo*/}
          <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
            Anti-eBay
          </h1>
          {/* "Create your account" */}
          <h2 className=" text-white text-4xl text-center pb-10 pt-4">
            Search For Post
          </h2>
          {/* Input Boxes */}
          <div className="flex flex-col items-center pt-4 space-y-6">
            {/* Search */}
            <div className="flex flex-col bg-slate-200 w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Item Name
              </label>
              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                defaultValue={location.search.substring(1)}
              ></input>
            </div>

            {/* Category */}
            <div className="flex flex-col bg-slate-200 w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Category (Optional)
              </label>
              <select
                className=" focus:outline-none rounded-md pl-2 text-lg h-8"
                onChange={(event) => setCategory(event.target.value)}
                name="category"
                label="Category"
              >
                <option value="null" selected="selected"></option>
                <option value="ant">Antiques & Collectibles</option>
                <option value="art">Arts & Crafts</option>
                <option value="aut">Auto Parts & Accessories</option>
                <option value="bab">Baby Products</option>
                <option value="bag">Bags & Luggage</option>
                <option value="boo">Books, Movies & Music</option>
                <option value="cell">Cell Phones & Accessories</option>
                <option value="clo">Clothing, Shoes & Accessories</option>
                <option value="ele">Electronics</option>
                <option value="fur">Furniture</option>
                <option value="hea">Health & Beauty</option>
                <option value="hom">Home & Kitchen</option>
                <option value="jwr">Jewelry</option>
                <option value="mis">Miscellaneous</option>
                <option value="mus">Musical Instruments</option>
                <option value="off">Office Supplies</option>
                <option value="pat">Patio & Garden</option>
                <option value="pet">Pet Supplies</option>
                <option value="spo">Sporting Goods</option>
                <option value="too">Tools & Home Improvement</option>
                <option value="toy">Toys & Games</option>
                <option value="vid">Video Games & Consoles</option>
              </select>
            </div>

            {/* Min Price */}
            <div className="flex flex-col bg-slate-200 w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Min Price (Optional)
              </label>
              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                }}
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col bg-slate-200 w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Max Price (Optional)
              </label>
              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
              />
            </div>

            {/*buttons*/}
            <div className="space-x-0 pb-6">
              <button
                className="bg-slate-600 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 w-44"
                onClick={() => {
                  setAdvSearchShow(!advSearchShow);
                }}
              >
                Hide Search Options
              </button>
              <button
                className=" bg-slate-600 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 w-44"
                onClick={startSearch}
              >
                Search
              </button>
            </div>
          </div>{" "}
          {/* End of Input boxes */}
        </div>

        {posts !== undefined ? (
          <div className=" flex flex-col items-center">{posts}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-slate-600 h-screen items-center">
        <NavBar />
        <div className="text-slate-600 bg-slate-600 h-12"></div>
        <div className=" bg-slate-800 rounded-lg lg:w-54 lg:h-16 text-center">
          <button
            className=" bg-slate-600 hover:bg-sky-700 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ml-3 mt-3"
            onClick={() => {
              setAdvSearchShow(!advSearchShow);
            }}
          >
            Show Search Options
          </button>
          {/*<button
              className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ring-2 ring-white"
              onClick={startSearch}
            >
              Search
            </button>*/}
        </div>
        {posts !== undefined ? (
          <div className=" flex flex-col items-center">{posts}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
};

export default SearchResults;
