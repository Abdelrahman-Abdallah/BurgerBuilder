import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea className={classes.InputElement} {...props.elementConfig} />
      );
      break;
    default:
      inputElement = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  inputtype: PropTypes.string,
};
export default Input;
