import react, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const [newSearch, setNewSearch] = useState(Boolean);
  const [searchQuery, setSearchQuery] = useState("test");
  const [category, setCategory] = useState("null");
  const [minPrice, setMinPrice] = useState(Number.MIN_VALUE);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  console.log(location);
  const startSearch = async (event) => {
    event.preventDefault();
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
      const getSearchRes = await axios.get(
        "http://localhost:8080/user/login",
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
    } catch (error) {
      console.log(error);
    }
  };
  if (!newSearch) {
    return (
      <div className=" bg-slate-600 h-screen">
        <NavBar />
        <div className="flex flex-col m-auto bg-slate-800 rounded-lg lg:w-2/5 lg:h-1/4 mt-4">
          <div className="my-6">
            <span className=" text-white ml-1 mr-2 text-lg">Search: </span>
            <input
              className=" focus:outline-none rounded-md pl-2 text-lg h-8 w-48 lg:w-96"
              defaultValue={location.search.substring(1)}
            ></input>
          </div>
          {/*Everything in here is for the Categories */}
          <div className="flex">
            <span className=" text-white ml-1 mr-2 text-lg">Category:</span>
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
          </div>
          <div className="flex justify-between">
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
            </div>
            <button
              className=" hover:bg-slate-400 cursor-pointer text-white font-bold py-2 px-2 rounded mr-3"
              onClick={startSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchResults;
