import React from "react";
import propTypes from "prop-types";
import classes from "./Button.module.css";
const Button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.click}
  >
    {props.children}
  </button>
);
export default Button;
Button.propTypes = {
  btnType: propTypes.string.isRequired,
  click: propTypes.func,
};
