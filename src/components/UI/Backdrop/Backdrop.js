import React from "react";
import "./Backdrop.css";
const BackDrop = (props) =>
  props.show ? (
    <div className="backdrop" onClick={props.hide}>
      {props.children}
    </div>
  ) : null;

export default BackDrop;
