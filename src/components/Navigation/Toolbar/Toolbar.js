import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div onClick={props.sidedrawer} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div className={classes.Logo}>
      <Logo></Logo>
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
