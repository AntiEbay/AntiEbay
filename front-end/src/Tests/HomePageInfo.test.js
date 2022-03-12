import React from "react";
import renderer from "react-test-renderer";
import HomePageInfo from "../Components/HomePageComponents/HomePageInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "../SessionVariables";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AccountProvider>
        <BrowserRouter>
          <HomePageInfo />
        </BrowserRouter>
      </AccountProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
