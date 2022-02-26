import react, { useState } from "react";

const GetImageData = (props) => {
  const [base64, setbase64] = useState();
  setbase64(Buffer.from(props.data, "binary").toString(base64));
  return <img src={`data:image/jpeg;charset=utf-8;base64,${base64}`} />;
};

export default GetImageData;
