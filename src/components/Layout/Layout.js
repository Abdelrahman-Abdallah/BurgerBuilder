import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
const Layout = (props) => {
  return (
    <Aux>
      <div>
        <Toolbar></Toolbar>
      </div>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
