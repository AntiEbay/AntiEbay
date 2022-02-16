import React from "react";

const SolidAlert = (props) => {
  console.log(props);
  if (props.alertValues.visible === true) {
    return (
      <div
        className="flex justify-center bg-blue-500 text-white text-lg font-bold px-4 py-3"
        role="alert"
      >
        <p>{props.alertValues.text}</p>
      </div>
    );
  } else {
    return (
      <div
        className="hidden items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <p>{props.alertValues.text}</p>
      </div>
    );
  }
};

export default SolidAlert;
