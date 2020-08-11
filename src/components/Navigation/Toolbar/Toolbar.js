import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>

    <Logo></Logo>

    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
