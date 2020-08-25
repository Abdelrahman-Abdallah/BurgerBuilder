import React from "react";
import "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const navigationItems = (props) => (
  <ul className="NavigationItems">
    <li className="NavigationItem">
      <NavLink to="/" exact>
        BurgerBuilder
      </NavLink>
      <NavLink to="/orders">Orders</NavLink>
    </li>
  </ul>
);

export default navigationItems;
