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

  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileDisplayArea5');


  fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var imageType = /image.*/;

      if (file.type.match(imageType)) {

          document.getElementById("fileDisplayArea5").body.style.backgroundImage = "url(./Components/img1.jpg)";
          /*
          var reader = new FileReader();

          reader.onload = function(e) {
              fileDisplayArea.innerHTML = "";

              var img = new Image();
              img.src = reader.result;

              fileDisplayArea.appendChild(img);
          }

          reader.readAsDataURL(file); */
      } else {
          fileDisplayArea.innerHTML = "File not supported!"
      }
  });

}

    

const signUpValues = {
  userName: "",
  title: "",
  lastName: "",
  //emailAddress: "",
  //password: "",
  //userType: "",
};



const BuyerPost = () => {
  //Variables to send to backend
  const [userName, setUserName] = useState(""); //Todo make this code more dry
  const [title, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [emailAddress, setEmailAddress] = useState("");
  //const [password, setPassword] = useState("");
  //const [userType, setUserType] = useState(Boolean);

    const[file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];

        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        }else{
            setFile(null);
            setError('Please selecte an image file (png or jpeg');
        }
    }

  

  //Post Request Fucntion
  async function postSignUpRequest(event) {
    event.preventDefault();
    signUpValues.userName = userName;
    signUpValues.firstName = title;
    signUpValues.lastName = lastName;
    //signUpValues.emailAddress = emailAddress;
    //signUpValues.password = password;
    //signUpValues.userType = userType ? "buyer" : "seller";
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
                //style={{backgroundImage: "url(" + background1 + ")" }}
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
                  //style={{backgroundImage: "url(" + background2 + ")" }}
                  id="fileDisplayArea2"
                  ></div>

              <div className="flex flex-col items-center bg-sky-600 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                  style={{backgroundImage: "url(" + background3 + ")" }}
                  id="fileDisplayArea3"
                  ></div>

              <div className="flex flex-col items-center bg-sky-400 h-1/4 bg-cover border-b-2 border-t-2 border-slate-600"
                  style={{backgroundImage: "url(" + background4 + ")" }}
                  id="fileDisplayArea4"
                  ></div>

              <div className="flex flex-col items-center bg-sky-600 h-1/4 bg-cover rounded-br-2xl border-t-2 border-slate-600" 
                  style={{backgroundImage: "url(" + background5 + ")" }}
                  id="fileDisplayArea5"
                  ></div>

            </div>
          </div>

          <p className="text-white text-lg text-center pr-96 ">Photos: 0/5 </p>

          {/* Input Boxes */}
          <div className="flex flex-col items-center pt-4 space-y-6">

            {/* title */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Title</label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-2"
                //value={title}
                onChange={(event) => setFirstName(event.target.value)}
                //name="title"
                //label="Title"
                placeholder=" "
              ></input>
            </div>
          
            {/* Prefered Quantity */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Prefered Quantity</label>

              <input
                className="focus:outline-none rounded-md text-lg w-full h-8 pl-2"
                type="number"
                //value={title}
                onChange={(event) => setUserName(event.target.value)}
                //name="title"
                //label="Title"
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
                //value={title}
                onChange={(event) => setLastName(event.target.value)}
                //name="title"
                //label="Title"
                placeholder=" "
              ></input>
            </div>

            {/* Category */}
            <div class="flex flex-col bg-slate-50 w-96 rounded-md border-2 border-gray-600" >

              <label className=" text-md text-slate-600">&nbsp;&nbsp;Category</label>

              <select className=" focus:outline-none rounded-md pl-2 text-lg h-8">
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

              <select className=" focus:outline-none rounded-md pl-2 text-lg h-8 box">
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
                //value={title}
                onChange={(event) => setFirstName(event.target.value)}
                //name="title"
                //label="Title"
                placeholder=" "
              ></textarea>
            </div>
              

            {/*Submit button*/}
            <button
              className="button1 bg-slate-600 text-white font-bold w-1/5 h-10 rounded-xl text-md focus:outline-none hover:bg-sky-700"
              type="submit"
              onClick={postSignUpRequest}
            >Next</button>

          </div> {/*End of 2nd set of input boxes*/}
        </div>  {/*End of 2nd black box*/}
      </form> 
    </div>


  );
};

export default BuyerPost;
