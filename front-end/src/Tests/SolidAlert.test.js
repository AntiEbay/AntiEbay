import React from "react";
import renderer from "react-test-renderer";
import SolidAlert from "../Components/Alerts/SolidAlert";
import regeneratorRuntime from "regenerator-runtime";

const alertValues = {
  visible: true,
  text: "Test Text.",
};
it("renders correctly", async () => {
  const tree = renderer
    .create(<SolidAlert alertValues={alertValues} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
