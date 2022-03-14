import React, { useState } from "react";
import renderer from "react-test-renderer";
import BidDisplayTest from "./TestPostDisplays/BidDisplayTest";
import regeneratorRuntime from "regenerator-runtime";
import { BrowserRouter } from "react-router-dom";
//Swiper and JEST are incompatible. To do some form of testing on our Post displays we just made a new post display and just removed Swiper.

it("renders correctly", async () => {
  const setStateMock = jest.fn();
  const useStateMock = (useState) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);
  const tree = renderer
    .create(
      <BrowserRouter>
        <BidDisplayTest
          bidAmount={1}
          title={"Title"}
          userRating={2}
          postId={1}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
