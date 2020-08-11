import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/logo";
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>

    <Logo></Logo>

    <div>List....</div>
  </header>
);

export default toolbar;
