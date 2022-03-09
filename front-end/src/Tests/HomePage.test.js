import React from "react";
import renderer from "react-test-renderer";
import HomePage from "../Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "../SessionVariables";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AccountProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </AccountProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
