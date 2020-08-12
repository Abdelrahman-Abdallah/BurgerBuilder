import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
const SideDrawer = (props) => (
  <div className={classes.SideDrawer}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems></NavigationItems>
    </nav>
  </div>
);

export default SideDrawer;
