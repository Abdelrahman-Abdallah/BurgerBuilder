import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
  return (
    <Aux>
      <div>
        <Toolbar></Toolbar>
        <SideDrawer></SideDrawer>
      </div>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
