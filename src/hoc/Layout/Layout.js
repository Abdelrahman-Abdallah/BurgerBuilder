import React from "react";
import Aux from "../Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  };
  render() {
    return (
      <Aux>
        <div>
          <Toolbar sidedrawer={this.sideDrawerCloseHandler}></Toolbar>
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
