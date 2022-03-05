import { useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import SolidAlert from "../Components/Alerts/SolidAlert";
import "../Components/UploadForm/UploadForm.css";

var imageClassList = [];

const buyerPostValues = {
  buyerEmail: "",
  postPath: "",
  title: "",
  quantity: 100,
  price: 100,
  category: "",
  productCondition: "",
  description: "",
  imageList: [],
};

class ImageObj {
  fileName = "";
  contents = "";
  // maybe add type field
  constructor(fileName, contents) {
    this.fileName = fileName;
    this.contents = contents;
  }
}

const BuyerPost = () => {
  //Variables to send to backend
  const [title, setTitle] = useState(""); //Todo make this code more dry
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [productCondition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [alertValues, setAlertValues] = useState({
    visible: false,
    text: "",
  });

  //Post Request Function
  async function buyerPostRequest(event) {
    event.preventDefault();
    buyerPostValues.title = title;
    buyerPostValues.quantity = parseInt(quantity);
    buyerPostValues.price = parseInt(price);
    buyerPostValues.category = category;
    buyerPostValues.productCondition = productCondition;
    buyerPostValues.description = description;
    buyerPostValues.imageList = imageClassList;
    console.log(buyerPostValues);
    const res = await axios.post(
      "http://localhost:8080/user/post/writing",
      JSON.stringify(buyerPostValues),
      {
        headers: {
          // Overwrite Axioss automatically set Content-Type
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(res.data.data);
    console.log(res.data.headers["Content-Type"]);
    setAlertValues({
      visible: true,
      text: "Post Successfully Created",
    });
  }

  const gather = () => {
    let fileInput = document.getElementById("fileInput");
    var string = "fileDisplayArea";
    var fileDisplayArea;

    console.log("call");

    // Click event
    fileInput.addEventListener(
      "change",
      function start() {
        var file = fileInput.files[0];
        var imageType = /image.*/;

        // Check if Valid
        if (file.type.match(imageType)) {
          // Look for empty space
          var i;
          for (i = 1; i < 5; i++) {
            // check value, false = no image, true = image
            var check = document
              .getElementById(string + i)
              .getAttribute("value");

            // If false, set as image block, set value to true
            if (check === "false") {
              fileDisplayArea = document.getElementById(string + i);
              fileDisplayArea.setAttribute("value", "true");
              break;
            }

            // Max Images reached
            if (i === 4) {
              setAlertValues({
                visible: true,
                text: "Maximum Images Reached. 4/4",
              });
              setTimeout(function () {
                setAlertValues({ visible: false });
              }, 7000);

              return;
            }
          }

          var reader = new FileReader();
          reader.onload = function () {
            // Collect Image
            var img = new Image();
            img.src = reader.result;

            // Place image as background image
            fileDisplayArea.style.backgroundImage = "url(" + img.src + ")";
            imageClassList.push(
              new ImageObj("test.png", img.src.split(",")[1])
            );
            document.getElementById(string + i).style.cursor = "zoom-in";

            // Image click event
            document
              .getElementById(string + i)
              .addEventListener("click", function () {
                // Set clicked image as
                document.getElementById(
                  "fileDisplayArea5"
                ).style.backgroundImage = document.getElementById(
                  string + i
                ).style.backgroundImage;

                // Iterate through images.
                for (var j = 1; j < 5; j++) {
                  // Collect Image
                  var check = document.getElementById(string + j).style
                    .backgroundImage;

                  // Only alter image blocks
                  if (check !== "") {
                    // Remove filter on all images.
                    document.getElementById(string + j).style.filter = "";

                    // Turn selected image, dark
                    if (j === i) {
                      document.getElementById(string + j).style.filter =
                        "brightness(.4)";
                    }
                  }
                } //End of loop
              });

            // Update Photo Tally
            var count = 0;
            for (var j = 1; j < 5; j++) {
              // check value, false = no image, true = image
              var check = document
                .getElementById(string + j)
                .getAttribute("value");

              // If true, iterate count
              if (check === "true") {
                count++;
              }
            }
            document.getElementById("count").innerHTML = count;

            // Add X button
            fileDisplayArea.innerHTML =
              fileDisplayArea.innerHTML +
              "<div id='x" +
              i +
              "' className=''>X</div>";
            document.getElementById("x" + i).style.position = "absolute";

            // X button Attributes
            document.getElementById("x" + i).style.backgroundColor =
              "rgb(248 113 113 / var(--tw-bg-opacity))"; // Intial Color
            document.getElementById("x" + i).style.fontWeight = "700"; // Bold
            document.getElementById("x" + i).style.paddingLeft = ".25rem"; // Padding
            document.getElementById("x" + i).style.paddingRight = ".25rem"; // Padding
            document.getElementById("x" + i).style.borderRadius = ".375rem"; // border rounding
            document.getElementById("x" + i).style.borderWidth = "2px"; // border thickness
            document.getElementById("x" + i).style.fontSize = ".75rem"; // text size
            document.getElementById("x" + i).style.lineHeight = "1rem"; // line height
            document.getElementById("x" + i).style.borderColor =
              "rgb(71 85 105 / var(--tw-border-opacity))"; //border color
            document.getElementById("x" + i).style.width = "1.25rem"; // Width of box
            document.getElementById("x" + i).style.marginTop = "5px"; // Top margin
            document.getElementById("x" + i).style.cursor = "pointer"; // cursor (hand)
            document.getElementById("x" + i).style.marginLeft = "80px"; // Left Margin
            // Hover
            document
              .getElementById("x" + i)
              .addEventListener("mouseover", function () {
                document.getElementById("x" + i).style.backgroundColor =
                  "rgb(185 28 28 / var(--tw-bg-opacity))";
              });
            document
              .getElementById("x" + i)
              .addEventListener("mouseout", function () {
                document.getElementById("x" + i).style.backgroundColor =
                  "rgb(248 113 113 / var(--tw-bg-opacity))";
              });

            // X click function
            document
              .getElementById("x" + i)
              .addEventListener("click", function () {
                document.getElementById(string + i).style.backgroundImage =
                  "none";
                document.getElementById("x" + i).remove();
                document.getElementById("count").innerHTML =
                  parseInt(document.getElementById("count").innerHTML) - 1;
                document
                  .getElementById(string + i)
                  .setAttribute("value", "false");
                document.getElementById(string + i).style.cursor = "default";
              });
          }; // End of Reader
          reader.readAsDataURL(file);
        } else {
          console.log("File not supported!");
          alert("File Type not supported.");
          setAlertValues({
            visible: true,
            text: "Maximum Images Reached. 4/4",
          });
          setTimeout(function () {
            setAlertValues({ visible: false });
          }, 7000);
        }
        fileInput.value = "";
      },
      false
    );
  };

  return (
    <div
      id="container"
      className="bg-slate-600"
      style={{
        width: "100%",
        overflow: "visible",
        height: "1500px",
        display: "table",
      }}
    >
      <NavBar />
      <SolidAlert alertValues={alertValues} />

      {/*Empty space*/}
      <div className="text-slate-600 h-24"></div>
      {/* Everything below NavBar */}
      <form className="h-screen">
        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 rounded-t-lg lg:w-3/4 h-fit">
          {/*logo*/}
          <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
            Anti-eBay
          </h1>
          {/* "Create new listing" */}
          <h2 className="text-center pb-10 pt-4">
            <span className="text-white text-4xl text-center mb-2">
              Create new Listing
            </span>
            <hr className="mt-2" />
          </h2>
          {/*Image grid*/}
          <div className="m-auto flex grid-cols-2 bg-slate-600 w-4/5 lg:w-2/5 h-96 rounded-3xl border-slate-600 border-8">
            {/* Large image */}
            <div
              className="relative flex flex-col bg-slate-400 w-4/5 bg-cover rounded-l-3xl border-r-4 border-slate-600 items-center text-xl text-slate-600"
              id="fileDisplayArea5"
              value="false"
            >
              <div id="addHide" className="mt-40">
                <label className=" bg-slate-400  rounded-sm text-center hover:bg-sky-600 cursor-pointer">
                  <input
                    className="w-1 "
                    type="file"
                    id="fileInput"
                    onClick={gather}
                  />
                  <span className=" text-black">Add Photos Here</span>
                </label>
              </div>
            </div>

            {/* Smaller images */}
            <div className="m-auto bg-slate-600 w-1/5 h-full">
              <div
                className="relative flex flex-col bg-sky-400 h-1/4 bg-cover rounded-tr-2xl border-b-2 border-slate-600 items-center"
                id="fileDisplayArea4"
                value="false"
              ></div>

              <div
                className="relative flex flex-col items-center bg-sky-600 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                id="fileDisplayArea3"
                value="false"
              ></div>

              <div
                className="relative flex flex-col items-center bg-sky-400 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                id="fileDisplayArea2"
                value="false"
              ></div>

              <div
                className="relative flex flex-col items-center bg-sky-600 h-1/4 bg-cover rounded-br-2xl border-t-2 border-slate-600"
                id="fileDisplayArea1"
                value="false"
              ></div>
            </div>
          </div>
          <div className="flex flex-row place-content-center">
            <p className="text-white text-lg text-center">Photos:&nbsp;</p>
            <p id="count" className="text-white text-lg text-center">
              {" "}
              0{" "}
            </p>
            <p className="text-white text-lg text-center">/4 </p>
          </div>
          {/* Input Boxes */}
          <div className="flex flex-col items-center pt-4 space-y-6">
            {/* title */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Title
              </label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                name="title"
                label="Title"
                placeholder=" "
              ></input>
            </div>

            {/* Prefered Quantity */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Prefered Quantity
              </label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                name="quantity"
                label="Quantity"
                placeholder=" "
              ></input>
            </div>
          </div>{" "}
          {/*end of Input boxes*/}
          {/* 2nd set of Input Boxes */}
          <div className="flex flex-col items-center pt-6 space-y-6">
            {/* Price */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Price
              </label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-3"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                name="price"
                label="Price"
                placeholder=" "
              ></input>
            </div>

            {/* Category */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Category
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

            {/* Condition */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600 ">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Condition
              </label>

              <select
                className=" focus:outline-none rounded-md pl-3 text-lg h-8 box"
                onChange={(event) => setCondition(event.target.value)}
                name="condition"
                label="Condition"
              >
                <option value="null" selcted="selected"></option>
                <option value="ant">New</option>
                <option value="art">Used - Like New</option>
                <option value="aut">Used - Good</option>
                <option value="bab">Used - Fair</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col bg-slate-200 w-full md:w-96 rounded-md border-2 border-gray-600">
              <label className=" text-md text-slate-600">
                &nbsp;&nbsp;Description
              </label>

              <textarea
                className="focus:outline-none rounded-md text-lg w-full h-28 pl-2 resize-none"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                name="description"
                label="Description"
                placeholder=" "
              ></textarea>
            </div>

            {/*Submit button*/}
            <button
              className="button1 bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700 mb-2"
              type="submit"
              onClick={buyerPostRequest}
            >
              Next
            </button>
            {/*This empty div is needed for the h-fit for the main box*/}
            <div></div>
          </div>{" "}
          {/*End of 2nd set of input boxes*/}
        </div>{" "}
        {/*End of 2nd black box*/}
      </form>
    </div>
  ); // end of return
}; // end of BuyerPost

export default BuyerPost;
