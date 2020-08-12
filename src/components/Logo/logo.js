import React from "react";
import logoImg from "../../assets/images/28.1 burger-logo.png";
import "./logo.css";
const logo = (props) => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={logoImg} alt="this is the logo of the website" />
  </div>
);

export default logo;
