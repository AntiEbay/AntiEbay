import React from "react";

const SellerPage = (props) => {
  return (
    <div>
      <span>{props.Name}</span>
      <p>{props.Description}</p>
      <input placeholder="Your Offer"></input>
    </div>
  );
};

export default SellerPage;
