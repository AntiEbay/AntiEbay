import React from "react";
/**
 *
 * @param  props Contains a variable of what text should be in the alert and a boolean variable to show the alert.
 * @returns A JSX element containing the alert.
 */
const SolidAlert = (props) => {
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
