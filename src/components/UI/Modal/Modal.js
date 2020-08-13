import React from "react";
import classes from "./Modal.module.css";
class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show ? true : false;
  }
  componentDidUpdate() {
    console.log(["MoDAL shoud component Update"]);
  }
  render() {
    return (
      <div
        className={classes.Modal}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default Modal;
