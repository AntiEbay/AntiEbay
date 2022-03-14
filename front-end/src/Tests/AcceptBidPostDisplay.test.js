import React, { useState } from "react";
import renderer from "react-test-renderer";
import AcceptBidPostDisplay from "./TestPostDisplays/AcceptBidPostDisplayTest";
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
        <AcceptBidPostDisplay
          bids={[1, 2, 3, 4]}
          title={"Title"}
          description={"Description"}
          price={100}
          condition={"New"}
          userRating={5}
          postId={1}
          buyerEmail={"email@email.com"}
          quantity={2}
          forceRender={setStateMock}
          renderVar={useStateMock}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
