import React, { useState } from "react";
import renderer from "react-test-renderer";
import RatingPopupSeller from "../Components/RatingPopupSeller";
import { AccountProvider } from "../SessionVariables";
import regeneratorRuntime from "regenerator-runtime";
it("renders correctly", async () => {
  const setStateMock = jest.fn();
  const useStateMock = (useState) => [useState, setStateMock];
  jest.spyOn(React, "useState").mockImplementation(useStateMock);
  const tree = renderer
    .create(
      <AccountProvider>
        <RatingPopupSeller
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
