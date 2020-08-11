import React from "react";
import "./NavigationItem.css";
const navigationItems = (props) => (
  <ul className="NavigationItems">
    <li className="NavigationItem">
      <a href="/" className={"active"}>
        BurgerBuilder
      </a>
      <a href="/">Checkout</a>
    </li>
  </ul>
);

export default navigationItems;
