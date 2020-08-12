import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Auxiliary";
import BackDrop from "../../UI/Backdrop/Backdrop";
const toolbar = (props) => (
  <Aux>
    <BackDrop></BackDrop>
    <header className={classes.Toolbar}>
      <div>MENU</div>

      <div className={classes.Logo}>
        <Logo></Logo>
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  </Aux>
);

export default toolbar;
