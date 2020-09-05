import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import BackDrop from "../../UI/Backdrop/Backdrop";
const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} hide={props.closed}></BackDrop>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
