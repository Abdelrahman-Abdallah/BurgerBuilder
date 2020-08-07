import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <Aux>
      <div>toolbar , SideDrawer,BackDrop</div>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
