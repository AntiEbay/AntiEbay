import React, { useState } from "react";
import renderer from "react-test-renderer";
import PostCompletedTest from "./TestPostDisplays/PostCompletedTest";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "../SessionVariables";
//Swiper and JEST are incompatible. To do some form of testing on our Post displays we just made a new post display and just removed Swiper.

it("renders correctly", async () => {
  const setStateMock = jest.fn();
  const useStateMock = (useState) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);
  const tree = renderer
    .create(
      <AccountProvider>
        <BrowserRouter>
          <PostCompletedTest
            bids={{ accepted: true, sellerEmail: "email@email.com" }}
            title={"Title"}
            quantity={2}
            condition={"new"}
          />
        </BrowserRouter>
      </AccountProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
