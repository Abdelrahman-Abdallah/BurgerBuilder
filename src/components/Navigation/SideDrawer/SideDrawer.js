import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
const SideDrawer = (props) => (
  <div>
    <Logo />
    <nav>
      <NavigationItems></NavigationItems>
    </nav>
  </div>
);

export default SideDrawer;
