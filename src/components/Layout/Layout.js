import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  state = {
    showSideDrawer: true,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  render() {
    return (
      <Aux>
        <div>
          <Toolbar></Toolbar>
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerCloseHandler}
          ></SideDrawer>
        </div>
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
