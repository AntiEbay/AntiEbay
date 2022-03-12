import React, { useState } from "react";
import renderer from "react-test-renderer";
import RatingPopup from "../Components/RatingPopup";
import { AccountProvider } from "../SessionVariables";
import regeneratorRuntime from "regenerator-runtime";
it("renders correctly", async () => {
  const setStateMock = jest.fn();
  const useStateMock = (useState) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);
  const tree = renderer
    .create(
      <AccountProvider>
        <RatingPopup
          trigger={false}
          triggerOff={setStateMock}
          review={setStateMock}
          postId={1}
        />
      </AccountProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
