import { useState, useContext } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { accountTypeContext } from "../SessionVariables";
import "../Components/UploadForm/UploadForm.css";

var imageClassList = [];

window.onload = function () {
  let fileInput = document.getElementById("fileInput");
  var string = "fileDisplayArea";
  var fileDisplayArea;

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
          var check = document.getElementById(string + i).getAttribute("value");

          // If false, set as image block, set value to true
          if (check === "false") {
            fileDisplayArea = document.getElementById(string + i);
            fileDisplayArea.setAttribute("value", "true");
            break;
          }

          if (i === 4) {
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
          imageClassList.push(new ImageObj("test.png", img.src.split(",")[1]));
          document.getElementById(string + i).style.cursor = "zoom-in";

          document
            .getElementById(string + i)
            .addEventListener("click", function () {
              document.getElementById(
                "fileDisplayArea5"
              ).style.backgroundImage = document.getElementById(
                string + i
              ).style.backgroundImage;

              // for(var j = 1; j < 5; j++){
              //   if(document.getElementById(string + j).style.backgroundImage !== "none"){
              //     if(document.getElementById(string + j).style.filter === "brightness(.4)"){
              //       console.log("call");
              //       document.getElementById(string + j).style.filter = "none";
              //     }
              //   }
              // }

              document.getElementById(string + i).style.filter =
                "brightness(.4)";
              document.getElementById("x" + i).style.filter = "none";
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
          console.log("count: " + count);

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
          if (i !== 5) {
            document.getElementById("x" + i).style.marginLeft = "80px"; // For x on small images
          } else {
            document.getElementById("x" + i).style.marginLeft = "400px"; // for x on large image
          }

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

              // IGNORE
              //   if((document.getElementById("fileDisplayArea1").getAttribute("value") == "false" ||
              //      document.getElementById("fileDisplayArea2").getAttribute("value") == "false" ||
              //      document.getElementById("fileDisplayArea3").getAttribute("value") == "false" ||
              //      document.getElementById("fileDisplayArea4").getAttribute("value") == "false") &&
              //      document.getElementById("fileDisplayArea5").getAttribute("value") == "true")
              //      {
              //       for(var j = 1; j < 5; j++){
              //         console.log("call");

              //         // check value, false = no image, true = image
              //         var check = document.getElementById(string + j).getAttribute("value");

              //         // If false, set as image block, set value to true
              //         if(check == "false"){
              //           document.getElementById(string + j).style.backgroundImage = document.getElementById("fileDisplayArea5").style.backgroundImage;
              //           document.getElementById(string + j).innerHTML += "<div id='x"+ j +"' className=''>X</div>";

              //           // X button Attributes
              //           document.getElementById("x"+j).style.backgroundColor = "rgb(248 113 113 / var(--tw-bg-opacity))";// Intial Color
              //           document.getElementById("x"+j).style.fontWeight = "700"; // Bold
              //           document.getElementById("x"+j).style.paddingLeft = ".25rem"; // Padding
              //           document.getElementById("x"+j).style.paddingRight = ".25rem"; // Padding
              //           document.getElementById("x"+j).style.borderRadius = ".375rem"; // border rounding
              //           document.getElementById("x"+j).style.borderWidth = "2px";  // border thickness
              //           document.getElementById("x"+j).style.fontSize = ".75rem";  // text size
              //           document.getElementById("x"+j).style.lineHeight = "1rem";   // line height
              //           document.getElementById("x"+j).style.borderColor = "rgb(71 85 105 / var(--tw-border-opacity))"; //border color
              //           document.getElementById("x"+j).style.width = "1.25rem"; // Width of box
              //           document.getElementById("x"+j).style.marginTop = "5px"; // Top margin
              //           // Hover
              //           document.getElementById("x"+j).addEventListener("mouseover", function() { document.getElementById("x"+j).style.backgroundColor = "rgb(185 28 28 / var(--tw-bg-opacity))";});
              //           document.getElementById("x"+j).addEventListener("mouseout", function() {document.getElementById("x"+j).style.backgroundColor = "rgb(248 113 113 / var(--tw-bg-opacity))";});
              //           if(j != 5){
              //             document.getElementById("x"+j).style.marginLeft = "80px"; // For x on small images
              //           }else{
              //             document.getElementById("x"+j).style.marginLeft = "400px"; // for x on large image
              //           }

              //           // X click function
              //           document.getElementById("x"+j).addEventListener("click", function() {
              //             document.getElementById(string+j).style.backgroundImage = "none";
              //             document.getElementById("x"+j).remove();
              //             document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) - 1;
              //             document.getElementById(string+j).setAttribute("value", "false");
              //           });

              //           document.getElementById("fileDisplayArea5").style.backgroundImage = "none";
              //           document.getElementById("x5").remove();

              //           // Update bool values
              //           document.getElementById(string + j).setAttribute("value", "true");
              //           document.getElementById("fileDisplayArea5").setAttribute("value", "false");
              //           break;
              //         }
              //       }// end of inner loop

              //      }// end of inner if
            });
        };
        reader.readAsDataURL(file);
      } else {
        console.log("File not supported!");
        alert("File Type not supported.");
      }
      fileInput.value = "";
    },
    false
  );
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
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [productCondition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const { state, update } = useContext(accountTypeContext);
  //Post Request Fucntion
  async function buyerPostRequest(event) {
    const buyerPostValues = {
      buyerEmail: state.accountEmail,
      postPath: "",
      title: "",
      quantity: 100,
      price: 100,
      category: "",
      productCondition: "",
      description: "",
      imageList: [],
    };
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
  }

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

      {/*Empty space*/}
      <div className="text-slate-600 h-24"></div>
      {/* Everything below NavBar */}
      <form className="h-screen">
        {/* Box Around actual form */}
        <div className="m-auto bg-slate-800 rounded-t-lg w-3/4 h-fit">
          {/*logo*/}
          <h1 className="tracking-tighter text-white font-bold italic text-4xl text-center pt-8">
            Anti-eBay
          </h1>
          {/* "Create new listing" */}
          <h2 className=" text-white text-4xl text-center pb-10 pt-4">
            Create new Listing
          </h2>
          {/*Image grid*/}
          <div className="m-auto flex grid-cols-2 bg-slate-600 w-2/5 h-96 rounded-3xl border-slate-600 border-8">
            {/* Large image */}
            <div
              className="relative flex flex-col bg-slate-50 w-4/5 bg-cover rounded-l-3xl border-r-4 border-slate-600 items-center text-xl font-bold text-slate-600"
              id="fileDisplayArea5"
              value="false"
            >
              <div id="addHide" className="mt-40">
                <label className=" bg-slate-400  rounded-sm text-center hover:bg-sky-600 cursor-pointer">
                  <input className="w-1 " type="file" id="fileInput" />
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
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600">
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
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600">
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
        </div>{" "}
        {/*end of dark grey box*/}
        {/*2nd dark grey box*/}
        <div className="m-auto bg-slate-800 rounded-b-lg w-3/4 h-3/5">
          {/* 2nd set of Input Boxes */}
          <div className="flex flex-col items-center pt-6 space-y-6">
            {/* Price */}
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600">
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
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600">
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
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600 ">
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
                <option value="new">New</option>
                <option value="good">Used - Like New</option>
                <option value="fair">Used - Good</option>
                <option value="used">Used - Fair</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600">
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
              className="button1 bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700"
              type="submit"
              onClick={buyerPostRequest}
            >
              Next
            </button>
          </div>{" "}
          {/*End of 2nd set of input boxes*/}
        </div>{" "}
        {/*End of 2nd black box*/}
      </form>
    </div>
  );
};

export default BuyerPost;
