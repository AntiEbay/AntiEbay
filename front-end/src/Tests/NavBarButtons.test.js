import React from "react";
import renderer from "react-test-renderer";
import NavBarButtons from "../Components/NavBarComponents/NavBarButtons";
import { BrowserRouter } from "react-router-dom";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <NavBarButtons accountType={"buyer"} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
