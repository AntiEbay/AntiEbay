import react, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";
import PostDisplay from "../Components/PostDisplay";
const SearchResults = () => {
  const location = useLocation();
  const [advSearchShow, setAdvSearchShow] = useState(true);
  const [searchQuery, setSearchQuery] = useState("test");
  const [category, setCategory] = useState("null");
  const [minPrice, setMinPrice] = useState(Number.MIN_VALUE);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  const [mapPosts, setMapPosts] = useState([]);
  const newArray = [];
  const [posts, setPosts] = useState(undefined);
  //Making a list of all the search Results
  const [imgString, setImgString] = useState("");
  <span className="text-white">Test Test Test</span>;

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
      Object.keys(mapPosts).map((key) => newArray.push(mapPosts[key]));
      console.log(newArray);
      // console.log(error);
      console.log(posts);
    }
  };
  if (advSearchShow) {
    return (
      <div className=" bg-slate-600 h-screen overflow-auto">
        <NavBar />
        <div className="flex flex-col m-auto bg-slate-800 rounded-lg lg:w-2/5 lg:h-60 mt-4">
          <div className="flex justify-between">
            <div className="my-6">
              <span className=" text-white ml-1 mr-2 text-lg">Search: </span>
              <input
                className=" focus:outline-none rounded-md pl-2 text-lg h-8 w-48 lg:w-96"
                defaultValue={location.search.substring(1)}
              ></input>
            </div>
            <span className=" text-2xl text-white my-6 mr-3 ">
              Advanced Search
            </span>
          </div>
          {/*Everything in here is for the Categories */}
          <div className="flex">
            <span className=" text-white ml-1 mr-2 text-lg hidden lg:block">
              Category:
            </span>
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
            <span className=" ml-1 text-sm text-white align-top opacity-60">
              {" "}
              -optional
            </span>
          </div>
          <div className=" flex my-5">
            <span className=" text-white ml-1 mr-2 text-lg hidden lg:inline">
              Min Price:
            </span>
            <input
              className="focus:outline-none rounded-md pl-2 text-lg h-8"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                setMinPrice(event.target.value);
              }}
              placeholder="Min Price"
            />
            <span className=" ml-1 text-sm text-white align-top opacity-60">
              {" "}
              -optional
            </span>
          </div>
          <div className="lg:flex lg:justify-between">
            <div>
              <span className=" text-white ml-1 mr-2 text-lg hidden lg:inline">
                Max Price:
              </span>
              <input
                className="focus:outline-none rounded-md pl-2 text-lg h-8"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                }}
                placeholder="Max Price"
              />
              <span className=" ml-1 text-sm text-white align-top opacity-60">
                {" "}
                -optional
              </span>
            </div>
            <div className="flex">
              <button
                className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ring-2 ring-white"
                onClick={() => {
                  setAdvSearchShow(!advSearchShow);
                }}
              >
                Hide advanced Search
              </button>
              <button
                className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ring-2 ring-white"
                onClick={startSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {posts !== undefined ? (
          <div className=" flex flex-col justify-center">{posts}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  } else {
    return (
      <div className=" bg-slate-600 h-screen">
        <NavBar />
        <div className="flex flex-col m-auto bg-slate-800 rounded-lg lg:w-1/6 lg:h-16 mt-4">
          <div className="flex justify-between mt-3">
            <button
              className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ml-3 ring-2 ring-white"
              onClick={() => {
                setAdvSearchShow(!advSearchShow);
              }}
            >
              Show advanced Search
            </button>
            <button
              className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3 ring-2 ring-white"
              onClick={startSearch}
            >
              Search
            </button>
          </div>
        </div>
        {posts !== undefined ? (
          <div className=" flex flex-col justify-center">{posts}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
};

export default SearchResults;
