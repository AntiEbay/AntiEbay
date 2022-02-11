import { useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
//import UploadForm from "./Components/UploadForm";

import background1 from "../Components/Images/img1.jpg";
import background2 from "../Components/Images/img2.jpg";
import background3 from "../Components/Images/img3.jpg";
import background4 from "../Components/Images/img4.jpg";
import background5 from "../Components/Images/img5.jpg";
import "../Components/UploadForm/UploadForm.css";

window.onload = function() {

  let fileInput = document.getElementById('fileInput');
  var string = "fileDisplayArea";
  var fileDisplayArea;

  // Click event
  fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var imageType = /image.*/;

      // Check if Valid
      if (file.type.match(imageType)) {

        // Look for empty space
        var i;
        for(i = 5; i > 0; i--){

          // check value, false = no image, true = image
          var check = document.getElementById(string + i).getAttribute('value');

          // If false, set as image block, set value to true
          if(check == "false"){
            fileDisplayArea = document.getElementById(string + i);
            fileDisplayArea.setAttribute('value','true');
            break;
          }
        }

        var reader = new FileReader();

        reader.onload = function(e) {
            fileDisplayArea.innerHTML = "";

            //fileDisplayArea.style.backgroundImage = "none";

            // Collect Image
            var img = new Image();
            img.src = reader.result;

            // Place image on div
            fileDisplayArea.appendChild(img);

            // Set size
            if (i != 1){
              img.style.height = "500px"
            }
            else{
              img.style.height = "368px";
              img.style.width = "500px";
              img.style.position = "relative";
              img.style.top = "-160px";
            }
            
            // Add rounded borders
            if(i == 5){
              img.style.borderBottomRightRadius = "1rem";
            }
            else if (i == 2){
              img.style.borderTopRightRadius = "1rem";
            }
            else if(i==1){
              img.style.borderTopLeftRadius = "1rem";
              img.style.borderBottomLeftRadius = "1rem";
            }

            document.getElementById("count").innerHTML = 6 - i;
        }

        reader.readAsDataURL(file); 
      } else {
          console.log("File not supported!");
      }
  });

}

const signUpValues = {
  title: "",
  quantity: "",
  price: "",
  category: "",
  condition: "",
  description: "",
};

const BuyerPost = () => {
  //Variables to send to backend
  const [title, setTitle] = useState(""); //Todo make this code more dry
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

    const[file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if(selected && types.includes(selected.type)) {
            console.log("success");

            setFile(selected);
            setError('');
        }else{
            console.log("failure");
            //setFile(null);
            //setError('Please selecte an image file (png or jpeg');
        }
    }

  

  //Post Request Fucntion
  async function buyerPostRequest(event) {
    event.preventDefault();
    signUpValues.title = title;
    signUpValues.quantity = quantity;
    signUpValues.price = price;
    signUpValues.category = category;
    signUpValues.condition = condition;
    signUpValues.description = description;
    console.log(signUpValues);
    const res = await axios.post(
      "http://localhost:8080/user/registration",
      JSON.stringify(signUpValues),
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data.data);
    console.log(res.data.headers["Content-Type"]);
  }

  

  return (
    
    <div id="container" className="bg-slate-600" style={{
      width: '100%', 
      overflow: 'visible',
      height: '1500px',
      display: 'table'}}>
      <NavBar />

      {/*Empty space*/}
      <div className="text-slate-600 h-24">
      </div>
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
            <div className="bg-slate-50 w-4/5 bg-cover rounded-l-3xl border-r-4 border-slate-600 text-center text-xl font-bold text-slate-600 pt-40"
              id="fileDisplayArea1"
              value="false"
            >
              <form>
                  <label className=" bg-slate-400  rounded-sm text-center hover:bg-sky-600">
                      <input className="w-1" type="file" id="fileInput"onchange={changeHandler} />
                      <span className=" text-black">Add Photos Here</span>
                  </label>
                  
                  <div className="output">
                      {error && <div className="error">{error}</div>}
                      { file && <div>{file.name } </div>}
                  </div>
              </form>
            </div>
            
            {/* Smaller images */}
            <div className="m-auto bg-slate-600 w-1/5 h-full">

              <div className="flex flex-col items-center bg-sky-400 h-1/4 bg-cover rounded-tr-2xl border-b-2 border-slate-600"
                  id="fileDisplayArea2"
                  value="false"
                  ></div>

              <div className="flex flex-col items-center bg-sky-600 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                  id="fileDisplayArea3"
                  value="false"
                  ></div>

              <div className="flex flex-col items-center bg-sky-400 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                  id="fileDisplayArea4"
                  value="false"
                  ></div>

              <div className="flex flex-col items-center bg-sky-600 h-1/4 bg-cover rounded-br-2xl border-t-2 border-slate-600" 
                  id="fileDisplayArea5"
                  value="false"
                  ></div>

            </div>
          </div>

          <div className="flex flex-row place-content-center">
            <p className="text-white text-lg text-center">Photos:&nbsp;</p>
              <p id="count" className="text-white text-lg text-center"> 0 </p>
            <p className="text-white text-lg text-center">/5 </p>
          </div>

          {/* Input Boxes */}
          <div className="flex flex-col items-center pt-4 space-y-6">

            {/* title */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Title</label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-2"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                name="title"
                label="Title"
                placeholder=" "
              ></input>
            </div>
          
            {/* Prefered Quantity */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Prefered Quantity</label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-2"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                name="quantity"
                label="Quantity"
                placeholder=" "
              ></input>
            </div>
          </div> {/*end of Input boxes*/ }
        </div> {/*end of dark grey box*/ }
          

        {/*2nd dark grey box*/ }
        <div className="m-auto bg-slate-800 rounded-b-lg w-3/4 h-3/5">
          {/* 2nd set of Input Boxes */}
          <div className="flex flex-col items-center pt-6 space-y-6">

            {/* Price */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Price</label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-2"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                name="price"
                label="Price"
                placeholder=" "
              ></input>
            </div>

            {/* Category */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Category</label>

              <select className=" focus:outline-none rounded-md pl-2 text-lg h-8"
                      onchange={(event) => setCategory(event.target.value)}
                      name="category"
                      label="Category"
              >
                <option value="null" selcted="selected"></option>
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
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600 " >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Condition</label>

              <select className=" focus:outline-none rounded-md pl-2 text-lg h-8 box"
                      onchange={(event) => setCondition(event.target.value)}
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
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Description</label>

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
            >Next</button>

          </div> {/*End of 2nd set of input boxes*/}
        </div>  {/*End of 2nd black box*/}
      </form> 
    </div>


  );
};

export default BuyerPost;
