import React from "react";
import renderer from "react-test-renderer";
import NavBar from "../Components/NavBar";
import { AccountProvider } from "../SessionVariables";
import { BrowserRouter, Routes, Route } from "react-router-dom";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AccountProvider>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </AccountProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
