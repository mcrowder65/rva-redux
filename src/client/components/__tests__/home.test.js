import React from "react";
import { mount } from "enzyme";

import Comp from "../home";

test("Home to mount without errors", () => {
  const comp = mount(<Comp />);
  expect(comp).toBeTruthy();
});
